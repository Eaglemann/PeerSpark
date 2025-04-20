import { useState } from "react";

interface ResetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin?: () => void;
  onSwitchToRegister?: () => void;
}

const ResetPasswordModal = ({
  isOpen,
  onClose,
  onSwitchToLogin,
  onSwitchToRegister,
}: ResetPasswordModalProps) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Password reset link sent to your email.");
      } else {
        setMessage(data.detail || "Something went wrong.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-start pt-20 z-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
          Reset your password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Send Reset Link
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
        )}

        <div className="mt-6 text-center text-sm text-gray-600">
          Remembered your password?{" "}
          <button
            className="text-blue-600 hover:underline font-medium"
            onClick={onSwitchToLogin}
          >
            Log in
          </button>
        </div>
        <div className="text-center text-sm text-gray-600 mt-2">
          Don't have an account?{" "}
          <button
            className="text-blue-600 hover:underline font-medium"
            onClick={onSwitchToRegister}
          >
            Register
          </button>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black text-xl"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordModal;
