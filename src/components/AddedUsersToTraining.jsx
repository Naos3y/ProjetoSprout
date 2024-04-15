import React, { useState } from "react";

const AddedUsersToTraining = ({ users }) => {
  const [list, setList] = useState(users);

  const handleRemoveFromList = (index) => {
    const updatedList = [...list];
    updatedList.splice(index, 1);
    setList(updatedList);
  };

  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="border border-gray-300 px-4 py-2">User Added</th>
          <th className="border border-gray-300 px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {list.map((user, index) => (
          <tr key={index}>
            <td className="border border-gray-300 px-4 py-2">{user.label}</td>
            <td className="border border-gray-300 px-4 py-2">
              <div className="flex justify-center">
                <button
                  onClick={() => handleRemoveFromList(index)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AddedUsersToTraining;
