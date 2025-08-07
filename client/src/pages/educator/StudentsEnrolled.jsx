import React, { useEffect, useState } from 'react'
import { dummyStudentEnrolled } from '../../assets/assets';
import Loading from '../../components/student/Loading';

const StudentsEnrolled = () => {
  const[enrolledStudents,setEnrolledStudents] = useState(null);
  const fetchEnrolledStudents = async ()=>{
    setEnrolledStudents(dummyStudentEnrolled)
  }
  useEffect(()=>{
    fetchEnrolledStudents();
  },[])
  return enrolledStudents ? (
    <div className="overflow-x-auto rounded-md shadow border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
        <thead className="bg-gray-50 text-gray-700">
          <tr>
            <th className="px-4 py-3 font-medium">#</th>
            <th className="px-4 py-3 font-medium">Student name</th>
            <th className="px-4 py-3 font-medium">Course Title</th>
            <th className="px-4 py-3 font-medium">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {enrolledStudents.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-3 ">{index + 1}</td>
              <td className="px-4 py-3 flex items-center gap-3">
                <img
                  src={item.student.imageUrl} // Leave blank or replace with image path
                  alt=""
                  className="h-8 w-8 rounded-full bg-gray-200"
                />
                <span>{item.student.name}</span>
              </td>
              <td className="px-4 py-3 text-gray-700">{item.courseTitle}</td>
              <td className="px-4 py-3 text-gray-500">{new Date(item.purchaseDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (<Loading></Loading>)
}

export default StudentsEnrolled
