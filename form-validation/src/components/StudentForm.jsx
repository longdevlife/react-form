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
      style={{ background: "#333", padding: 16, borderRadius: 6 }}
    >
      <h3 style={{ color: "#fff" }}>Thông tin sinh viên</h3>
      <div style={{ display: "flex", gap: 16, marginBottom: 8 }}>
        <div style={{ flex: 1 }}>
          <label>Mã SV</label>
          <input
            name="id"
            value={form.id}
            onChange={handleChange}
            className="form-input"
          />
          {errors.id && <div style={{ color: "red" }}>{errors.id}</div>}
        </div>
        <div style={{ flex: 1 }}>
          <label>Họ tên</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="form-input"
          />
          {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
        </div>
      </div>
      <div style={{ display: "flex", gap: 16, marginBottom: 8 }}>
        <div style={{ flex: 1 }}>
          <label>SĐT</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="form-input"
          />
          {errors.phone && <div style={{ color: "red" }}>{errors.phone}</div>}
        </div>
        <div style={{ flex: 1 }}>
          <label>Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="form-input"
          />
          {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
        </div>
      </div>
      <button
        type="submit"
        style={{
          background: "#4ade80",
          color: "#222",
          padding: "8px 16px",
          border: 0,
          borderRadius: 4,
        }}
      >
        {editing ? "Cập nhật" : "Thêm sinh viên"}
      </button>
      {editing && (
        <button
          type="button"
          onClick={() => dispatch(setEditing(null))}
          style={{ marginLeft: 8 }}
        >
          Huỷ
        </button>
      )}
    </form>
  );
}
