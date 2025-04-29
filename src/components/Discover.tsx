import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Define the type for the skills
interface Skill {
  skill: {
    name: string;
  };
}

// Define the type for each user
interface User {
  id: string;
  name: string;
  bio: string | null;
  email: string;
  location: string | null;
  occupation: string | null;
  profile_picture: string | null;
  user_skills: Skill[];
}

const Discover: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch data from /auth/discover
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_PEERSPARK_AUTH_URL}/auth/discover`,
          {},
          { withCredentials: true }
        );
        const usersData: User[] = response.data.users;
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <p className="text-xl font-semibold text-gray-600 animate-pulse">
          Loading users...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
        Discover New Connections
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10">
        {users.map((user) => (
          <Link
            to={`/user/${user.id}`}
            key={user.id}
            className="block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group"
          >
            <div className="relative">
              <img
                src={user.profile_picture || "https://placehold.co/600x400"}
                alt={user.name}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent p-4">
                <h2 className="text-white text-lg font-bold">{user.name}</h2>
              </div>
            </div>

            <div className="p-5 space-y-3">
              <p className="text-gray-600 text-sm">
                {user.bio
                  ? user.bio.slice(0, 100) +
                    (user.bio.length > 100 ? "..." : "")
                  : "No bio available"}
              </p>

              <div className="flex items-center text-gray-500 text-xs space-x-4">
                <span>{user.occupation || "Unknown Occupation"}</span>
                <span>•</span>
                <span>{user.location || "Unknown Location"}</span>
              </div>

              {user.user_skills.length > 0 && (
                <div>
                  <h4 className="text-gray-700 font-semibold text-sm mb-1">
                    Skills:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {user.user_skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full"
                      >
                        {skill.skill.name}
                      </span>
                    ))}
                    {user.user_skills.length > 3 && (
                      <span className="text-xs text-gray-400">
                        +{user.user_skills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;
