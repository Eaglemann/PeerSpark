import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "../graphql/queries";

interface User {
  id: string;
  name: string;
  email: string;
  profile_picture: string;
  bio: string;
}

const Discover = () => {
  const { id } = useParams<{ id: string }>();

  const { data, loading, error } = useQuery(GET_USER_BY_ID, {
    variables: { id },
  });

  const user: User = data?.users_by_pk;

  if (loading) return <div className="text-center py-10">Loading user...</div>;
  if (error || !user)
    return <div className="text-center py-10 text-red-500">User not found</div>;

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {user.map((user: User) => (
          <div
            key={user.id}
            className="bg-white border border-gray-200 p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300"
          >
            <div className="flex justify-center mb-4">
              <img
                src={user.profile_picture || "https://placehold.co/400"}
                alt={user.name}
                className="w-32 h-32 object-cover rounded-full border-4 border-blue-500"
              />
            </div>
            <div className="text-center">
              <div className="text-xl font-semibold text-gray-800 mb-2">
                {user.name}
              </div>
              <div className="text-sm text-gray-600 mb-4">
                {/* Skills: {user.skills.join(", ")} */}
              </div>
              <Link to={`/user/${user.id}`}>
                <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition duration-300">
                  View Profile
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Discover;
