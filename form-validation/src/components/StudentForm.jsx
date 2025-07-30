import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStudent, updateStudent, setEditing } from "../redux/studentSlice";

const initialForm = { id: "", name: "", phone: "", email: "" };

export default function StudentForm() {
  const dispatch = useDispatch();
  const editing = useSelector((state) => state.students.editing);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editing) setForm(editing);
    else setForm(initialForm);
  }, [editing]);

  const validate = () => {
    const newErrors = {};
    if (!form.id) newErrors.id = "Mã SV không được bỏ trống";
    if (!form.name) newErrors.name = "Họ tên không được bỏ trống";
    if (!form.phone) newErrors.phone = "SĐT không được bỏ trống";
    if (!form.email) newErrors.email = "Email không được bỏ trống";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (editing) dispatch(updateStudent(form));
    else dispatch(addStudent(form));
    setForm(initialForm);
    setErrors({});
    dispatch(setEditing(null));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 rounded-lg shadow-md max-w-6xl mx-auto mt-4"
    >
      <h3 className="text-white text-xl font-bold mb-4">Thông tin sinh viên</h3>
      <div className="flex gap-4 mb-2">
        <div className="flex-1">
          <label className="block text-white font-medium mb-1">Mã SV</label>
          <input
            name="id"
            value={form.id}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-green-400 ${
              errors.id ? "border-red-500 bg-red-50" : "border-gray-300"
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
            value={form.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-green-400 ${
              errors.name ? "border-red-500 bg-red-50" : "border-gray-300"
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
            value={form.phone}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-green-400 ${
              errors.phone ? "border-red-500 bg-red-50" : "border-gray-300"
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
            value={form.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-green-400 ${
              errors.email ? "border-red-500 bg-red-50" : "border-gray-300"
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
