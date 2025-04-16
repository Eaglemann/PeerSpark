import { useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { GET_USER_BY_ID } from "../graphql/queries";
import { sendMatchEmail } from "../utils/emailSender";

export interface Skill {
  id: string;
  name: string;
  description: string;
}

export interface UserSkill {
  skill: Skill;
}

export interface User {
  id: string;
  name: string;
  email: string;
  profile_picture: string;
  bio: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  user_skills: UserSkill[];
}

const UserProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const [isMatched, setIsMatched] = useState(false);
  const [messages, setMessages] = useState<
    { sender: string; content: string; timestamp: string }[]
  >([]);
  const [messageText, setMessageText] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data, loading, error } = useQuery(GET_USER_BY_ID, {
    variables: { id },
  });

  const user: User = data?.users_by_pk;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (loading) return <div className="text-center py-10">Loading user...</div>;
  if (error || !user)
    return <div className="text-center py-10 text-red-500">User not found</div>;

  const handleMatch = () => {
    sendMatchEmail(user.name, "test@example.com", "Dummy Match");
    setIsMatched(true);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  const handleChatSubmit = () => {
    if (messageText.trim()) {
      setMessages((prev) => [
        ...prev,
        {
          sender: user.name,
          content: messageText,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
      setMessageText("");
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-lg max-w-xl mx-auto">
        <div className="flex justify-center mb-4">
          <img
            src={user.profile_picture || "https://placehold.co/400"}
            alt={user.name}
            className="w-32 h-32 object-cover rounded-full border-4 border-blue-500"
          />
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {user.name}
          </h2>
          <p className="text-sm text-gray-600 mb-1">{user.email}</p>
          <p className="text-sm text-gray-600 mb-4">{user.bio}</p>
          <p className="text-sm text-gray-600 mb-4">
            <span className="font-semibold">Skills:</span>{" "}
            {user.user_skills?.map((us) => us.skill.name).join(", ") || "None"}
          </p>

          {!isMatched ? (
            <button
              onClick={handleMatch}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
            >
              Match
            </button>
          ) : (
            <div className="mt-4">
              <div className="max-h-64 overflow-y-auto border rounded p-2 bg-gray-50 mb-2">
                {messages.map((msg, index) => (
                  <div key={index} className="mb-2">
                    <strong>{msg.sender}:</strong> {msg.content}
                    <span className="text-xs text-gray-400 ml-2">
                      {msg.timestamp}
                    </span>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="p-2 border rounded w-full mb-2"
                placeholder="Type a message..."
              />
              <button
                onClick={handleChatSubmit}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition w-full"
              >
                Send Message
              </button>
            </div>
          )}

          {toastVisible && (
            <motion.div
              className="fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Match successful!
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
