import React from "react";
import { Link } from "react-router-dom";

const ForumItem = ({ forum }) => {
  return (
    <Link
      to={`/forums/${forum._id}/posts`}
      className="block p-6 border border-gray-200 rounded-lg shadow-md hover:bg-blue-50 transition duration-300"
    >
      <h2 className="text-2xl font-semibold text-gray-800">{forum.title}</h2>
      <p className="text-gray-600 mt-2">{forum.description}</p>
    </Link>
  );
};

export default ForumItem;
