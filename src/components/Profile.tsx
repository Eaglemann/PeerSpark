const Profile = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center">
        {/* Profile Image */}
        <img
          src="https://via.placeholder.com/150"
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        {/* Profile Name */}
        <h1 className="text-3xl font-semibold text-gray-800">John Doe</h1>
        {/* Profile Details */}
        <p className="text-gray-600 mt-2">Software Engineer</p>
      </div>
      <div className="mt-8">
        {/* Skills Section */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Skills</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li className="text-gray-700">JavaScript</li>
          <li className="text-gray-700">React</li>
          <li className="text-gray-700">Node.js</li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
