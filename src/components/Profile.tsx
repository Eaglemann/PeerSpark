import { useEffect, useState } from "react";
import axios from "axios";

interface UserProfile {
  name: string;
  occupation: string;
  location: string;
  gender: string;
  created_at: string;
  skills: string[];
  image_url?: string; // Optional image URL
}

const Profile = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_PEERSPARK_AUTH_URL}/auth/user-data`,
          {},
          { withCredentials: true }
        );

        const user = response.data.users_by_pk;

        const formattedProfile: UserProfile = {
          name: user.name,
          occupation: user.occupation,
          location: user.location,
          gender: user.gender,
          created_at: user.created_at,
          skills: user.user_skills.map((entry: any) => entry.skill.name),
          image_url: user.image_url || "https://placehold.co/600x400",
        };

        setUserProfile(formattedProfile);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white flex items-center justify-center p-8">
      <div className="bg-white max-w-5xl w-full rounded-3xl shadow-2xl p-10 flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12">
        {/* Left: Image */}
        <div className="flex-shrink-0">
          <img
            src={userProfile.image_url}
            alt="Profile"
            className="w-48 h-48 object-cover rounded-full border-4 border-indigo-200 shadow-md"
          />
        </div>

        {/* Right: Info */}
        <div className="flex-1 space-y-6">
          <div className="text-4xl font-bold text-gray-900">
            {userProfile.name}
          </div>

          <div className="text-xl text-indigo-600 font-medium">
            {userProfile.occupation}
          </div>

          <div className="flex flex-wrap gap-6 text-gray-700">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-500">
                Location
              </span>
              <span>{userProfile.location}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-500">
                Gender
              </span>
              <span>
                {userProfile.gender.charAt(0).toUpperCase() +
                  userProfile.gender.slice(1)}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-500">
                Member Since
              </span>
              <span>
                {new Date(userProfile.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {userProfile.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
