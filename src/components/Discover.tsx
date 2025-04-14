import React, { useState } from "react";

// Dummy data for users
const users = [
  {
    id: 1,
    name: "Alice Johnson",
    image: "https://via.placeholder.com/150",
    skills: ["React", "JavaScript", "GraphQL"]
  },
  {
    id: 2,
    name: "Bob Smith",
    image: "https://via.placeholder.com/150",
    skills: ["Node.js", "Express", "MongoDB"]
  },
  {
    id: 3,
    name: "Charlie Brown",
    image: "https://via.placeholder.com/150",
    skills: ["Python", "Django", "PostgreSQL"]
  },
  {
    id: 4,
    name: "Dana White",
    image: "https://via.placeholder.com/150",
    skills: ["Vue.js", "TypeScript", "GraphQL"]
  },
];

const Discover = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filterUsers = (users: any) => {
    return users.filter((user: any) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredUsers = filterUsers(users);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-4">Discover Users</h2>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearchChange}
          className="px-6 py-3 border-2 border-gray-300 rounded-lg w-full sm:w-96 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-300"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredUsers.map((user: any) => (
          <div
            key={user.id}
            className="bg-white border border-gray-200 p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300"
          >
            <div className="flex justify-center mb-4">
              <img
                src={user.image}
                alt={user.name}
                className="w-32 h-32 object-cover rounded-full border-4 border-blue-500"
              />
            </div>
            <div className="text-center">
              <div className="text-xl font-semibold text-gray-800 mb-2">{user.name}</div>
              <div className="text-sm text-gray-600 mb-4">
                Skills: {user.skills.join(", ")}
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition duration-300">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Discover;
