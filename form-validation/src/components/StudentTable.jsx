import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeStudent, setEditing } from "../redux/studentSlice";

export default function StudentTable() {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.list);
  const search = useSelector((state) => state.students.search);

  // lọc danh sách search
  const filtered = students.filter(
    (sv) =>
      // tìm kiếm theo id
      sv.id.includes(search) ||
      sv.name.toLowerCase().includes(search.toLowerCase()) ||
      sv.phone.includes(search) ||
      sv.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto mt-6">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-2 px-4 text-left">Mã SV</th>
            <th className="py-2 px-4 text-left">Họ tên</th>
            <th className="py-2 px-4 text-left">SĐT</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-500">
                Không có sinh viên nào
              </td>
            </tr>
          ) : (
            filtered.map((sv) => (
              <tr key={sv.id} className="hover:bg-gray-100 border-b">
                <td className="py-2 px-4">{sv.id}</td>
                <td className="py-2 px-4">{sv.name}</td>
                <td className="py-2 px-4">{sv.phone}</td>
                <td className="py-2 px-4">{sv.email}</td>
                <td className="py-2 px-4 flex gap-2">
                  <button
                    onClick={() => dispatch(setEditing(sv))}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => dispatch(removeStudent(sv.id))}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
