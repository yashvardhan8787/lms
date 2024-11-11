import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/api/v1/get-users", {
        withCredentials: true,
      });
      setUsers(response.data.users);
    } catch (err) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/v1/delete-user/${userId}`, {
        withCredentials: true,
      });
      setUsers(users.filter((user) => user._id !== userId));
    } catch (err) {
      setError("Failed to delete user");
    }
  };

  const handleUpdateRole = async (email ,userId, newRole) => {
    try {
      await axios.put(
        `http://localhost:8080/api/v1/update-user`,
        { email:email, role: newRole },
        { withCredentials: true }
      );
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (err) {
      console.log(error);
      setError("Failed to update role");
    }
  };

  return (
    <div className="p-6  mx-auto bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Users</h2>
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Name</th>
                <th className="px-4 py-3 text-left font-medium">Email</th>
                <th className="px-4 py-3 text-left font-medium">Role</th>
                <th className="px-4 py-3 text-left font-medium">Verified</th>
                <th className="px-4 py-3 text-left font-medium">Badges</th>
                <th className="px-4 py-3 text-left font-medium">Streaks</th>
                <th className="px-4 py-3 text-left font-medium">Title</th>
                <th className="px-4 py-3 text-left font-medium">About</th>
                <th className="px-4 py-3 text-left font-medium">Courses</th>
                <th className="px-4 py-3 text-left font-medium">Created At</th>
                <th className="px-4 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user._id} className="even:bg-gray-50">
                  <td className="px-4 py-3 border-b">{user.name}</td>
                  <td className="px-4 py-3 border-b">{user.email}</td>
                  <td className="px-4 py-3 border-b">
                    <select
                      className="bg-gray-100 border border-gray-300 rounded px-3 py-1"
                      value={user.role}
                      onChange={(e) => handleUpdateRole( user.email ,user._id, e.target.value)}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 border-b">
                    {user.isVerified ? "Yes" : "No"}
                  </td>
                  <td className="px-4 py-3 border-b">{user.badges.length}</td>
                  <td className="px-4 py-3 border-b">{user.streaks}</td>
                  <td className="px-4 py-3 border-b">{user.title}</td>
                  <td className="px-4 py-3 border-b truncate max-w-xs">{user.about}</td>
                  <td className="px-4 py-3 border-b">
                    <div className="relative group">
                      {user.courses.length} Course(s)
                      <div className="absolute left-0 w-40 bg-gray-200 text-gray-700 text-sm p-2 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {user.courses.map((course) => (
                          <div key={course._id}>ID: {course.courseId}</div>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 border-b">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3 border-b">
                    <button
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition-colors"
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
