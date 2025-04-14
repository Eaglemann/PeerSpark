import React, { useState } from "react";

const Skills = () => {
  // Example dummy data for skills
  const skills = [
    { id: 1, name: "JavaScript", level: "Intermediate" },
    { id: 2, name: "React", level: "Advanced" },
    { id: 3, name: "Python", level: "Beginner" },
    { id: 4, name: "Node.js", level: "Intermediate" },
    { id: 5, name: "CSS", level: "Advanced" },
  ];

  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if (newSkill) {
      // Add new skill logic here
      console.log("New skill added:", newSkill);
      setNewSkill(""); // Clear input after adding
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">Skills</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Your Skills</h2>
        <ul className="space-y-4 mt-4">
          {skills.map((skill) => (
            <li
              key={skill.id}
              className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg"
            >
              <span className="text-lg font-medium text-gray-800">{skill.name}</span>
              <span className="text-sm text-gray-500">{skill.level}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Add a new skill"
          className="p-2 border border-gray-300 rounded-lg w-3/4"
        />
        <button
          onClick={handleAddSkill}
          className="ml-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
        >
          Add Skill
        </button>
      </div>
    </div>
  );
};

export default Skills;
