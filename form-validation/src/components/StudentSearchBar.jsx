import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../redux/studentSlice";

export const StudentSearchBar = () => {
  const search = useSelector((state) => state.students.search);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setSearch(e.target.value));
  };

  return (
    <div className="max-w-6xl mx-auto mt-4 mb-2">
      <input
        type="text"
        placeholder="Tìm kiếm sinh viên"
        value={search}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 bg-white text-gray-800"
      />
    </div>
  );
};
