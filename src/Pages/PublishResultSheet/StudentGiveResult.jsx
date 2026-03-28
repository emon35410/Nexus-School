

import { useQuery } from '@tanstack/react-query';
import React from 'react';
import {
  FaUserEdit,
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
} from 'react-icons/fa';
import { PiStudentBold } from 'react-icons/pi';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { Link, useSearchParams } from 'react-router';

const StudentGiveResult = () => {
  const axiosSecure = useAxiosSecure();

  // ✅ URL state
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedClass = searchParams.get('class') || '';
  const selectedExam = searchParams.get('exam') || '';
  const currentPage = Number(searchParams.get('page')) || 1;

  const limit = 5;

  const { data, isLoading } = useQuery({
    queryKey: ['studentGiveResult', currentPage, selectedClass, selectedExam],
    queryFn: async () => {
      const skip = (currentPage - 1) * limit;
      const res = await axiosSecure.get(
        `/students?limit=${limit}&skip=${skip}&class_name=${selectedClass || ''}`,
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const { data: alreadyGiveResult = [] } = useQuery({
    queryKey: ['alreadyGiveResult', selectedClass, selectedExam],
    enabled: !!selectedClass && !!selectedExam,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/result/getResult?class_name=${selectedClass}&examOption=${selectedExam}`,
      );
      return res.data;
    },
  });

  const studentResult = alreadyGiveResult.map(student => student.studentEmail);

  const students = data?.result || [];

  const studentsNoResult = students.filter(
    student => !studentResult.includes(student.email),
  );

  const totalStudents = data?.allStudent || 0;
  const totalPages = Math.ceil(totalStudents / limit);

  return (
    <div className="p-4 md:p-8 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Header & Filter Section */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="flex-1">
              <h2 className="text-3xl font-extrabold text-blue-900 flex items-center gap-3">
                <PiStudentBold className="text-blue-600" /> Student Database
              </h2>
              <p className="text-slate-500 mt-1">
                Select class and exam type to manage grades.
              </p>
            </div>

            {/* Dropdowns Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full lg:w-auto">
              {/* Class Selection */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold ml-1 text-blue-600 uppercase tracking-wider">
                  Class Name
                </label>
                <select
                  value={selectedClass}
                  onChange={e =>
                    setSearchParams({
                      class: e.target.value,
                      exam: selectedExam,
                      page: 1,
                    })
                  }
                  className="w-full md:w-48 bg-blue-50/50 border border-blue-100 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer font-semibold text-blue-900"
                >
                  <option value="">All Classes</option>
                  <option value="6">Class 6</option>
                  <option value="7">Class 7</option>
                  <option value="8">Class 8</option>
                  <option value="9">Class 9</option>
                  <option value="10">Class 10</option>
                </select>
              </div>

              {/* Exam Selection */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold ml-1 text-blue-600 uppercase tracking-wider">
                  Exam Type
                </label>
                <select
                  value={selectedExam}
                  onChange={e =>
                    setSearchParams({
                      class: selectedClass,
                      exam: e.target.value,
                      page: 1,
                    })
                  }
                  className="w-full md:w-48 bg-blue-50/50 border border-blue-100 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer font-semibold text-blue-900"
                >
                  <option value="">Select Exam</option>
                  <option value="test-1">Test 1</option>
                  <option value="test-2">Test 2</option>
                  <option value="final">Final Exam</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-hidden bg-white/80 backdrop-blur-md rounded-2xl border border-blue-100 shadow-sm">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                      Roll
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                      Student Name
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                      Class
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-center">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-blue-50">
                  {studentsNoResult.map(student => (
                    <tr
                      key={student._id}
                      className="hover:bg-blue-50/50 transition-all group"
                    >
                      <td className="px-6 py-4 font-bold text-blue-700">
                        {student.roll}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-800">
                          {student.name}
                        </div>
                        <div className="text-xs text-slate-400">
                          {student.email}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-xs font-bold">
                          Grade {student.class_name}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Link
                          to={`/dashboard/student-give-result/${student._id}?class=${selectedClass}&exam=${selectedExam}&page=${currentPage}`}
                          className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold shadow-md transition-all transform active:scale-95 
                           bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200
                            cursor-pointer"
                        >
                          <FaUserEdit /> Give Number
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {students.length === 0 && (
                <div className="p-10 text-center text-slate-400 font-medium">
                  No students found for this class.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-slate-500 font-medium">
              Total{' '}
              <span className="text-blue-600 font-bold">{totalStudents}</span>{' '}
              students found
            </div>
            <nav className="flex items-center space-x-1">
              <button
                disabled={currentPage === 1}
                onClick={() =>
                  setSearchParams({
                    class: selectedClass,
                    exam: selectedExam,
                    page: currentPage - 1,
                  })
                }
                className="p-3 rounded-xl border border-blue-100 bg-white text-blue-600 hover:bg-blue-600 hover:text-white disabled:opacity-30 transition-all"
              >
                <FaChevronLeft />
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() =>
                    setSearchParams({
                      class: selectedClass,
                      exam: selectedExam,
                      page: i + 1,
                    })
                  }
                  className={`w-11 h-11 rounded-xl text-sm font-bold transition-all ${
                    currentPage === i + 1
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                      : 'bg-white text-blue-600 border border-blue-100 hover:border-blue-300'
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setSearchParams({
                    class: selectedClass,
                    exam: selectedExam,
                    page: currentPage + 1,
                  })
                }
                className="p-3 rounded-xl border border-blue-100 bg-white text-blue-600 hover:bg-blue-600 hover:text-white disabled:opacity-30 transition-all"
              >
                <FaChevronRight />
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentGiveResult;