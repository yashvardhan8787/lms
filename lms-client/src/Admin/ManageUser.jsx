import React, { useContext} from "react";
import { AdminContext } from "../contexts/AdminContext";
const ManageUser = () => {

  const {users , error ,loading ,handleDeleteUser ,handleUpdateRole} = useContext(AdminContext)

  return (
    <div className="p-6 mx-auto bg-gray-50 rounded-lg shadow-xl max-w-7xl">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Users Management</h2>
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-gray-700 to-gray-800 text-white">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Name</th>
                <th className="px-6 py-3 text-left font-semibold">Email</th>
                <th className="px-6 py-3 text-left font-semibold">Role</th>
                <th className="px-6 py-3 text-left font-semibold">Verified</th>
                <th className="px-6 py-3 text-left font-semibold">Badges</th>
                <th className="px-6 py-3 text-left font-semibold">Streaks</th>
                <th className="px-6 py-3 text-left font-semibold">Title</th>
                <th className="px-6 py-3 text-left font-semibold">About</th>
                <th className="px-6 py-3 text-left font-semibold">Courses</th>
                <th className="px-6 py-3 text-left font-semibold">Created At</th>
                <th className="px-6 py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td className="px-6 py-4 border-b">{user.name}</td>
                  <td className="px-6 py-4 border-b">{user.email}</td>
                  <td className="px-6 py-4 border-b">
                    <select
                      className="bg-gray-100 border border-gray-300 rounded px-3 py-1"
                      value={user.role}
                      onChange={(e) => handleUpdateRole(user.email, user._id, e.target.value)}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 border-b">
                    {user.isVerified ? "Yes" : "No"}
                  </td>
                  <td className="px-6 py-4 border-b">{user.badges.length}</td>
                  <td className="px-6 py-4 border-b">{user.streaks}</td>
                  <td className="px-6 py-4 border-b">{user.title}</td>
                  <td className="px-6 py-4 border-b truncate max-w-xs">{user.about}</td>
                  <td className="px-6 py-4 border-b">
                    <div className="relative group">
                      {user.courses.length} Course(s)
                      <div className="absolute left-0 w-40 bg-gray-200 text-gray-700 text-sm p-2 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {user.courses.map((course , index) => (
                          <div key={index}>ID: {course.courseId}</div>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 border-b">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 border-b">
                    <button
                      className="bg-gradient-to-r from-red-500 to-red-600 text-white py-1 px-3 rounded border border-red-700 hover:bg-gradient-to-r hover:from-red-600 hover:to-red-700 hover:border-red-800 transition-all duration-300 ease-in-out shadow hover:shadow-lg"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUser;
