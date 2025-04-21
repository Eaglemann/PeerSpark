import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import axios from "axios";

const skillsOptions = [
  { value: "JavaScript", label: "JavaScript" },
  { value: "Python", label: "Python" },
  { value: "React", label: "React" },
  { value: "Node.js", label: "Node.js" },
  { value: "SQL", label: "SQL" },
  { value: "Docker", label: "Docker" },
  { value: "AWS", label: "Django" },
  { value: "AWS", label: "Flask" },
  { value: "AWS", label: "FastAPI" },
  { value: "AWS", label: "Typescript" },
  { value: "AWS", label: "Next.js" },
  { value: "AWS", label: "DevOps" },
  { value: "AWS", label: "AWS" },
  { value: "AWS", label: "Java" },
  { value: "AWS", label: "React Native" },
  { value: "AWS", label: "C++" },
];

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

const Onboarding = () => {
  const [skills, setSkills] = useState<{ value: string; label: string }[]>([]);
  const [location, setLocation] = useState("");
  const [profession, setProfession] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [gender, setGender] = useState<{ value: string }>();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (skills.length < 1) {
      alert("Please add at least 1 skill.");
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_PEERSPARK_AUTH_URL}/user/onboarding`,
        {
          skills: skills.map((s) => s.value),
          location,
          profession,
          age,
          gender: gender?.value,
        }
      );

      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to save onboarding info.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start pt-20 bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Welcome to PeerSpark 👋
        </h2>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Skills (1–5)
          </label>
          <Select
            isMulti
            options={skillsOptions}
            value={skills}
            onChange={(selected) => setSkills(selected.slice(0, 5))}
            placeholder="Type and select skills..."
          />
          {skills.length > 5 && (
            <p className="text-red-500 text-sm mt-1">
              You can select up to 5 skills.
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded-md"
            placeholder="e.g. Berlin"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Profession
          </label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded-md"
            placeholder="e.g. Backend Developer"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Age</label>
          <input
            type="number"
            className="w-full border px-3 py-2 rounded-md"
            placeholder="e.g. 28"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            min={18}
            max={100}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Gender</label>
          <Select
            options={genderOptions}
            value={gender}
            onChange={setGender}
            placeholder="Select gender"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default Onboarding;
