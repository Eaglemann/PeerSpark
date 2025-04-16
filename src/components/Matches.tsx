import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_MATCHES } from "../graphql/queries";

interface Match {
  id: string;
  user1: {
    id: string;
    name: string;
    profile_picture: string;
  };
  user2: {
    id: string;
    name: string;
    profile_picture: string;
  };
}

const Matches = () => {
  const currentUserId = "b362d81c-a658-4e46-9523-a9e877da3c33"; // Hardcoded user ID for now

  const { loading, error, data } = useQuery(GET_MATCHES, {
    variables: { userId: currentUserId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Filter matches where currentUserId is either user1 or user2
  const matches: Match[] = data.matches.filter(
    (match: Match) =>
      match.user1.id === currentUserId || match.user2.id === currentUserId
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
        Matches
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {matches.map((match) => {
          const otherUser =
            match.user1.id === currentUserId ? match.user2 : match.user1;
          return (
            <div
              key={match.id}
              className="bg-white rounded-lg shadow-lg p-4 text-center flex flex-col items-center"
            >
              <div className="flex justify-center mb-4">
                <img
                  src={otherUser.profile_picture || "https://placehold.co/400"}
                  alt={otherUser.name}
                  className="w-24 h-24 object-cover rounded-full border-4 border-blue-500"
                />
              </div>
              <div className="text-center">
                <div className="text-xl font-semibold text-gray-800 mb-2">
                  {otherUser.name}
                </div>
                <Link to={`/user/${otherUser.id}`}>
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition duration-300">
                    View Profile
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Matches;
