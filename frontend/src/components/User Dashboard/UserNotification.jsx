import React, { useState } from "react";

const UserNotification = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <div className="h-full  px-2">
      {/* Header */}
      <div className="mb-6">
        <p className="text-xl font-semibold text-gray-800">
          Notification Settings
        </p>
      </div>

      {/* Notification Toggle */}
      <div className="flex w-full max-w-md gap-20 rounded-lg bg-white p-6">
        <p className="text-lg  text-gray-800">
          Turn on Email notifications
        </p>
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            className="peer sr-only"
            checked={isChecked}
            onChange={handleToggle}
          />
          <div className="h-8 w-14 rounded-full bg-gray-300 transition-colors duration-300 peer-checked:bg-blue-500 peer-focus:ring-4 peer-focus:ring-blue-400">
            <span
              className={`absolute left-1 top-1 h-6 w-6 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
                isChecked ? "translate-x-6" : ""
              }`}
            ></span>
          </div>
        </label>
      </div>
    </div>
  );
};

export default UserNotification;
