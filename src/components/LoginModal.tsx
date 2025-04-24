import { useState } from "react";
import axios from "axios";
import { useAuthStore } from "../store/auth";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister?: () => void;
  onLoginSuccess?: () => void;
}

const LoginModal = ({
  isOpen,
  onClose,
  onSwitchToRegister,
  onLoginSuccess,
}: LoginModalProps) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_PEERSPARK_AUTH_URL}/auth/login`,
        formData,
        {
          withCredentials: true, // Ensure cookies are sent with the request
        }
      );

      const data = response.data;
      console.log("Login successful", data);

      login(data.user, data.access_token);
      onLoginSuccess?.();
      onClose();
    } catch (error: any) {
      const message =
        error.response?.data?.detail || "Login failed. Please try again.";
      alert(message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-start pt-20 z-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Welcome back
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Log in
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          <button
            onClick={() => {
              onClose();
              onSwitchToRegister?.();
            }}
            className="text-blue-600 hover:underline font-medium"
          >
            Don’t have an account? Register
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

export default LoginModal;
