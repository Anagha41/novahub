import React, { useEffect, useState } from "react";

const UserList = () => {
  const [profiles, setProfiles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/user")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch profiles");
        }
        return response.json();
      })
      .then((data) => setProfiles(data))
      .catch((error) => setError(error.message));
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="bg-gradient-to-r from-gray-100 to-gray-50 p-8 rounded-xl shadow-lg mb-10 max-w-3xl mx-auto border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800 text-center">
          User Profiles
        </h2>
        <p className="text-sm text-gray-500 text-center">
          View and manage all registered users.
        </p>
      </div>

      {error ? (
        <div className="bg-red-100 text-red-600 p-4 rounded-lg shadow-md text-center">
          {error}
        </div>
      ) : (
      <div className="bg-gradient-to-r from-gray-100 to-gray-50 p-8 rounded-xl shadow-lg mb-10 max-w-3xl mx-auto border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider"
                >
                  Role
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {profiles.length === 0 ? (
                <tr>
                  <td
                    colSpan="3"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No profiles found
                  </td>
                </tr>
              ) : (
                profiles.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-800">{user.id}</td>
                    <td className="px-6 py-4 text-gray-800">{user.email}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === "ADMIN"
                            ? "bg-red-100 text-red-700"
                            : user.role === "COORDINATOR"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserList;
