import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStudent, updateStudent, setEditing } from "../redux/studentSlice";

const initialForm = { id: "", name: "", phone: "", email: "" };

export default function StudentForm() {
  const dispatch = useDispatch();
  const editing = useSelector((state) => state.students.editing);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const students = useSelector((state) => state.students.list);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("students");
    if (saved) {
      try {
        const arr = JSON.parse(saved);
        if (Array.isArray(arr) && arr.length > 0) {
          arr.forEach((sv) => dispatch(addStudent(sv)));
        }
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    if (editing) setForm(editing);
    else setForm(initialForm);
  }, [editing]);

  const validate = () => {
    const newErrors = {};
    if (!form.id) newErrors.id = "Mã SV không được bỏ trống";
    else if (students.some(sv => sv.id === form.id) && (!editing || editing.id !== form.id)) {
      newErrors.id = "Mã SV đã tồn tại";
    }
    // Tên phải là chữ
    if (!form.name) newErrors.name = "Họ tên không được bỏ trống";
    else if (!/^[\p{L} ]+$/u.test(form.name))
      newErrors.name = "Họ tên chỉ được chứa chữ cái";
    // SĐT phải là số
    if (!form.phone) newErrors.phone = "SĐT không được bỏ trống";
    else if (!/^\d+$/.test(form.phone))
      newErrors.phone = "SĐT chỉ được chứa số";
    // Email phải đúng định dạng
    if (!form.email) newErrors.email = "Email không được bỏ trống";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      newErrors.email = "Email không hợp lệ";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (editing) {
      dispatch(updateStudent(form));
      setMessage("Cập nhật sinh viên thành công!");
    } else {
      dispatch(addStudent(form));
      setMessage("Thêm sinh viên thành công!");
    }
    setForm(initialForm);
    setErrors({});
    dispatch(setEditing(null));
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 text-white p-6 rounded-lg shadow-md max-w-6xl mx-auto mt-4"
    >
      {message && (
        <div className="mb-4 p-2 rounded bg-green-100 text-green-800 text-center font-semibold animate-pulse">{message}</div>
      )}
      <h3 className="text-white text-xl font-bold mb-4">Thông tin sinh viên</h3>
      <div className="flex gap-4 mb-2">
        <div className="flex-1">
          <label className="block text-white font-medium mb-1">Mã SV</label>
          <input
            name="id"
            autoComplete="off"
            value={form.id}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-green-400 ${
              errors.id
                ? "border-red-500 bg-red-50 text-red-900"
                : "border-gray-300 bg-gray-800 text-white"
            }`}
          />
          {errors.id && (
            <div className="text-red-500 text-sm mt-1">{errors.id}</div>
          )}
        </div>
        <div className="flex-1">
          <label className="block text-white font-medium mb-1">Họ tên</label>
          <input
            name="name"
            autoComplete="off"
            value={form.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-green-400 ${
              errors.name
                ? "border-red-500 bg-red-50 text-red-900"
                : "border-gray-300 bg-gray-800 text-white"
            }`}
          />
          {errors.name && (
            <div className="text-red-500 text-sm mt-1">{errors.name}</div>
          )}
        </div>
      </div>
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="block text-white font-medium mb-1">SĐT</label>
          <input
            name="phone"
            autoComplete="off"
            value={form.phone}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-green-400 ${
              errors.phone
                ? "border-red-500 bg-red-50 text-red-900"
                : "border-gray-300 bg-gray-800 text-white"
            }`}
          />
          {errors.phone && (
            <div className="text-red-500 text-sm mt-1">{errors.phone}</div>
          )}
        </div>
        <div className="flex-1">
          <label className="block text-white font-medium mb-1">Email</label>
          <input
            name="email"
            autoComplete="off"
            value={form.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-green-400 ${
              errors.email
                ? "border-red-500 bg-red-50 text-red-900"
                : "border-gray-300 bg-gray-800 text-white"
            }`}
          />
          {errors.email && (
            <div className="text-red-500 text-sm mt-1">{errors.email}</div>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="bg-green-400 hover:bg-green-500 text-gray-900 font-semibold px-6 py-2 rounded shadow transition-colors"
      >
        {editing ? "Cập nhật" : "Thêm sinh viên"}
      </button>
      {editing && (
        <button
          type="button"
          onClick={() => dispatch(setEditing(null))}
          className="ml-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Huỷ
        </button>
      )}
    </form>
  );
  // ...
}
