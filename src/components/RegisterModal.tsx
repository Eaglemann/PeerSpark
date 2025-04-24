import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin?: () => void;
}

const RegisterModal = ({
  isOpen,
  onClose,
  onSwitchToLogin,
}: RegisterModalProps) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Step 1: Register the user
      await axios.post(
        `${import.meta.env.VITE_PEERSPARK_AUTH_URL}/auth/register`,
        formData
      );

      // Step 2: Log the user in
      const loginResponse = await axios.post(
        `${import.meta.env.VITE_PEERSPARK_AUTH_URL}/auth/login`,
        {
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true, // Ensure cookies are sent with the request
        }
      );

      const data = loginResponse.data;

      login(data.user, data.access_token);
      onClose();
      navigate("/onboarding", { replace: true });
    } catch (error: any) {
      const message =
        error.response?.data?.detail ||
        "Registration failed. Please try again.";
      alert(message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-start pt-20 z-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Create your account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <button
            className="text-blue-600 hover:underline font-medium"
            onClick={onSwitchToLogin}
          >
            Log in
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

export default RegisterModal;
