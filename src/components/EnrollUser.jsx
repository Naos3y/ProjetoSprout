import React, { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";

const TableTextInput = ({ label, tid }) => {
  const [email, setEmail] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchExistingUsers = async () => {
      try {
        const response = await fetch(
          `/api/adminTrainings/getUserNameAndEmailByTrainingID?tid=${tid}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          const existingUsers = data.users.map((user) => ({
            email: user.email,
            name: user.name,
          }));
          setList(existingUsers);
        } else {
          toast.error("Failed to fetch existing users.");
        }
      } catch (error) {
        console.error("Error fetching existing users:", error);
        toast.error(
          "An error occurred while fetching existing users. Please try again later."
        );
      }
    };

    fetchExistingUsers();
  }, [tid]);

  const handleChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
  };

  const handleAddToList = async () => {
    try {
      if (!email) {
        toast.error("Please enter an email address.");
        return;
      }

      if (list.some((item) => item.email === email)) {
        toast.error("This email is already in the list.");
        return;
      }

      const response = await fetch("/api/adminTrainings/checkUserEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.emailFound === "yes") {
          // Fetch user ID by email
          const userIDResponse = await fetch(
            `/api/adminTrainings/getUserIDWithEmail?email=${email}`,
            { method: "GET" }
          );

          if (userIDResponse.ok) {
            const userIDData = await userIDResponse.json();
            const userID = userIDData.emails[0].bruno_getuseridwithemail;

            // Fetch regular user ID by user ID
            const regularUserIDResponse = await fetch(
              `/api/adminTrainings/getRegularUserID_with_single_UID?uid=${encodeURIComponent(
                userID
              )}`
            );

            if (regularUserIDResponse.ok) {
              const regularUserIDData = await regularUserIDResponse.json();
              const regularUserIDs = regularUserIDData.userids;

              // Enroll user in the training
              const enrollResponse = await fetch(
                `/api/adminTrainings/enrollUsers`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    trainingID: tid,
                    userIDs: regularUserIDs,
                  }),
                }
              );

              const enrollData = await enrollResponse.json();

              if (enrollResponse.ok) {
                toast.success(enrollData.message);
                const updatedList = [...list, { email, name: data.userName }];
                setList(updatedList);
                setEmail("");
              } else {
                toast.error(enrollData.message);
              }
            } else {
              toast.error("Failed to fetch regular user ID. Please try again.");
            }
          } else {
            toast.error("Failed to fetch user ID. Please try again.");
          }
        } else {
          toast.error("Email verification failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      toast.error(
        "An error occurred while verifying email. Please try again later."
      );
    }
  };

  const handleRemoveFromList = async (index) => {
    const emailToRemove = list[index].email;

    try {
      const response = await fetch(
        `/api/adminTrainings/removeUserFromTraining`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tid,
            email: emailToRemove,
          }),
        }
      );

      const removeData = await response.json();

      if (response.ok) {
        toast.success(removeData.message);
        const updatedList = [...list];
        updatedList.splice(index, 1);
        setList(updatedList);
      } else {
        toast.error(removeData.message);
      }
    } catch (error) {
      console.error("Error removing user from training:", error);
      toast.error(
        "An error occurred while removing the user. Please try again later."
      );
    }
  };

  return (
    <div className="relative py-5">
      <label>{label}</label>
      <div className="flex items-center space-x-5">
        <input
          type="text"
          value={email}
          onChange={handleChange}
          className="border p-2 w-full rounded-md border-gray-300 focus:outline-none focus:border-green-500 mt-2"
        />
        <button
          onClick={handleAddToList}
          className="bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-green-500 hover:text-white active:bg-green-700 mt-2"
        >
          Add
        </button>
      </div>
      {list.length > 0 && (
        <table className="mt-4 w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">
                  {item.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.name}
                </td>
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
      )}
    </div>
  );
};

export default TableTextInput;
