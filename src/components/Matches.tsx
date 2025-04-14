const Matches = () => {
  // Example dummy data for matches
  const matches = [
    { id: 1, name: "Alice", imageUrl: "https://via.placeholder.com/150" },
    { id: 2, name: "Bob", imageUrl: "https://via.placeholder.com/150" },
    { id: 3, name: "Charlie", imageUrl: "https://via.placeholder.com/150" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
        Matches
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {matches.map((match) => (
          <div
            key={match.id}
            className="bg-white rounded-lg shadow-lg p-4 text-center flex flex-col items-center"
          >
            <img
              src={match.imageUrl}
              alt={match.name}
              className="w-24 h-24 rounded-full mb-4"
            />
            <h2 className="text-xl font-medium text-gray-800">{match.name}</h2>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Matches;
