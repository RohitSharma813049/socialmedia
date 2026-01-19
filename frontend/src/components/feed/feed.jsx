import React from "react";

function Feed() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Home Feed
      </h2>

      <div className="bg-gray-900 p-4 rounded-lg mb-4">
        <p>📸 First post</p>
      </div>

      <div className="bg-gray-900 p-4 rounded-lg">
        <p>📸 Second post</p>
      </div>
    </div>
  );
}

export default Feed;
