import { useParams } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { sendMatchEmail } from "../utils/emailSender";
import { motion } from "framer-motion";

const users = [
  {
    id: 1,
    name: "Alice Johnson",
    image: "https://via.placeholder.com/150",
    skills: ["React", "JavaScript", "GraphQL"],
    email: "alice@example.com",
    bio: "A passionate front-end developer and JavaScript enthusiast.",
  },
  {
    id: 2,
    name: "Bob Smith",
    image: "https://via.placeholder.com/150",
    skills: ["Node.js", "Express", "MongoDB"],
    email: "bob@example.com",
    bio: "Backend developer, building scalable APIs with Node.js.",
  },
  {
    id: 3,
    name: "Charlie Brown",
    image: "https://via.placeholder.com/150",
    skills: ["Python", "Django", "PostgreSQL"],
    email: "charlie@example.com",
    bio: "Full-stack developer with a focus on Python and Django.",
  },
  {
    id: 4,
    name: "Dana White",
    image: "https://via.placeholder.com/150",
    skills: ["Vue.js", "TypeScript", "GraphQL"],
    email: "dana@example.com",
    bio: "Vue.js developer, building beautiful web applications.",
  },
];

const UserProfilePage = () => {
  const { id } = useParams();
  const user = users.find((u) => u.id === Number(id));

  const [isMatched, setIsMatched] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [messageText, setMessageText] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleMatch = () => {
    if (user) {
      const matchedUser = users.find((u) => u.id !== user.id);
      if (matchedUser) {
        sendMatchEmail(user.name, matchedUser.email, matchedUser.name);
        setIsMatched(true);
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 3000);
      }
    }
  };

  const handleChatSubmit = () => {
    if (messageText.trim()) {
      setMessages((prev) => [
        ...prev,
        {
          sender: user?.name,
          content: messageText,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
      setMessageText("");
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!user) return <div>User not found</div>;

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-lg max-w-xl mx-auto">
        <div className="flex justify-center mb-4">
          <img
            src={user.image}
            alt={user.name}
            className="w-32 h-32 object-cover rounded-full border-4 border-blue-500"
          />
        </div>
        <div className="text-center">
          <div className="text-2xl font-semibold text-gray-800 mb-2">
            {user.name}
          </div>
          <div className="text-sm text-gray-600 mb-4">{user.email}</div>
          <div className="text-sm text-gray-600 mb-4">{user.bio}</div>
          <div className="text-sm text-gray-600 mb-4">
            Skills: {user.skills.join(", ")}
          </div>

          {!isMatched ? (
            <button
              onClick={handleMatch}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition duration-300 z-10"
            >
              Match
            </button>
          ) : (
            <div className="mt-6 border-t pt-4">
              <div className="text-sm text-gray-600 mb-4">
                You are matched! Start chatting below:
              </div>

              <div className="flex flex-col h-96">
                {/* Message list */}
                <div className="flex-1 overflow-y-auto pr-2 space-y-4 mb-4">
                  {messages.map((msg, index) => (
                    <motion.div
                      key={index}
                      className={`flex ${
                        msg.sender === user.name
                          ? "justify-end"
                          : "justify-start"
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div
                        className={`px-4 py-2 max-w-xs rounded-2xl text-sm shadow ${
                          msg.sender === user.name
                            ? "bg-blue-500 text-white ml-2"
                            : "bg-gray-200 text-gray-900 mr-2"
                        }`}
                      >
                        <div>{msg.content}</div>
                        <div className="text-xs text-gray-400 text-right mt-1">
                          {msg.timestamp}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="mt-auto">
                  <textarea
                    placeholder="Type a message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 resize-none"
                    rows={2}
                  />
                  <button
                    onClick={handleChatSubmit}
                    className="mt-2 w-full bg-green-600 text-white text-sm font-medium rounded-lg py-2 hover:bg-green-700 transition duration-300"
                  >
                    Send Chat
                  </button>
                </div>
              </div>
            </div>
          )}

          {toastVisible && (
            <motion.div
              className="fixed top-24 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg z-50"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              Matched! You can now chat.
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
