import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import axios from "axios";

const skillOptions = [
  { value: "5aa26cd1-f195-4f8c-bf4a-3b0576fca703", label: "Python" },
  { value: "6d0e3ea4-668c-4e52-b20f-2026ecc651df", label: "React" },
  { value: "a9f57a2b-eef0-422c-9d5f-c1255109fbd9", label: "Data Analysis" },
  {
    value: "0f51444a-93d7-4cdc-89b2-1303e6a03638",
    label: "Project Management",
  },
  { value: "256f400d-59ac-40fb-bbc2-fd3487cc13f7", label: "JavaScript" },
  { value: "e75592fe-731b-4acd-932e-4528a9b3d1af", label: "Python" },
  { value: "e69b1588-de4e-4ba2-9b2c-753dfa38600b", label: "React" },
  { value: "e9a0188e-de91-4e21-94f3-71f589c60abb", label: "Node.js" },
  { value: "1bfba7f4-76f2-4687-91a3-be3b49b7aea8", label: "SQL" },
  { value: "5407239c-3c31-4031-bb81-cd3eaee4f10c", label: "Docker" },
  { value: "f7c62ae3-b294-4e6d-9260-0d7ebdc44aba", label: "Django" },
  { value: "112313b5-19e3-4bb9-8ae8-df12f3189a43", label: "Flask" },
  { value: "1ac44fe6-2afe-4adf-bcad-75686ae461cd", label: "FastAPI" },
  { value: "e7e90a7a-3f6d-4ffa-b7d3-52e3afaa4bcd", label: "Typescript" },
  { value: "43858788-089b-4198-b179-31eedac5208c", label: "Next.js" },
  { value: "5e9d8b14-7fe3-45c6-bda3-13bc969006ba", label: "DevOps" },
  { value: "ee99e0b0-92b2-47f0-b538-e1eb884bc666", label: "AWS" },
  { value: "5c13666e-d663-4b3e-b826-ad7ce79f8d9c", label: "Java" },
  { value: "994c0e31-88a4-496a-9eb9-639c0525ce0b", label: "React Native" },
  { value: "66969490-ea80-41c9-8eb0-b6e3548812ac", label: "C++" },
  { value: "b6cb6831-4fde-4c5b-a6eb-dcc9f98531e8", label: "Flutter" },
  { value: "4c340740-6297-466f-a097-5f8759fd9e74", label: "Nest.js" },
  { value: "89a8c148-5582-4711-a4da-e458f59eaa0a", label: "Svetle" },
  { value: "f02e196a-9036-4bee-ad4a-aa7ffd93784c", label: "Kubernetes" },
  { value: "1ab23fbe-e911-47b8-a720-dbcbb7e3f4bd", label: "Algorithms" },
  { value: "3752423f-ebda-4976-8fad-4152e55ab8fc", label: "Go" },
  { value: "688366a8-e1be-4b16-8099-538809691888", label: "PHP" },
  { value: "d0b5b613-8620-4414-a2f7-91887f8dc093", label: "Laravel" },
  { value: "74924151-da14-468c-be3f-29b81fe34a18", label: "Linux" },
  { value: "8957df73-233d-432b-bd46-9fe1c96856d9", label: "Shell Scripting" },
  { value: "842661d1-2e9b-4d27-a532-1f2609c75471", label: "Bash" },
  { value: "e77c76a2-caeb-4f8d-a3ac-e971ecfed155", label: "Arduino" },
  { value: "05f1365d-1d1d-436a-bb04-5a08419446ff", label: "Machine Learning" },
  { value: "dc3d915c-d61a-457c-a270-2c44f3348241", label: "Data Analysis" },
  { value: "e212905f-a739-46da-aa95-715711b6bafe", label: "GenAI" },
  { value: "97d882c5-5cf2-45e0-b4a4-764a45ea3a9e", label: "JavaScript" },
  { value: "478bbc20-28a4-4d59-8bf8-be4742086417", label: "Python" },
  { value: "66757464-d342-45ea-a042-0d7a29134861", label: "Docker" },
];

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

const Onboarding = () => {
  const [skills, setSkills] = useState<{ value: string; label: string }[]>([]);
  const [location, setLocation] = useState("");
  const [occupation, setOccupation] = useState("");
  const [age, setAge] = useState<number>();
  const [gender, setGender] = useState<{ value: string } | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const payload = {
        skills: skills.map((skill) => ({ skill_id: skill.value })),
        location,
        occupation,
        age: Number(age),
        gender: gender?.value,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_PEERSPARK_AUTH_URL}/auth/update-profile`,
        payload,
        {
          withCredentials: true,
        }
      );
      console.log("Profile updated successfully!", response.data);

      navigate("/profile", { replace: true });
    } catch (err) {
      console.error(err);
      alert("Failed to save onboarding info.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start pt-20 bg-gray-100 px-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
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
            options={skillOptions}
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
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
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
            onChange={(selectedOption) => setGender(selectedOption)}
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
