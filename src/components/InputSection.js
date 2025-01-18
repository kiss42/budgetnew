import React from "react";

const InputSection = ({
  totalHours,
  setTotalHours,
  hourlyRate,
  setHourlyRate,
  manualGross,
  setManualGross,
}) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-pink-400">Input Details</h2>
      <div className="mt-4 space-y-4">
        <div>
          <label className="block text-gray-400">Total Hours Worked:</label>
          <input
            type="number"
            value={totalHours}
            onChange={(e) => setTotalHours(e.target.value)}
            className="w-full p-2 bg-gray-700 text-gray-100 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-400">Hourly Rate:</label>
          <input
            type="number"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
            className="w-full p-2 bg-gray-700 text-gray-100 rounded"
          />
        </div>

        {/* Optional Manual Gross Override */}
        <div>
          <label className="block text-gray-400">Override Gross Pay (optional):</label>
          <input
            type="number"
            step="0.01"
            value={manualGross}
            onChange={(e) => setManualGross(e.target.value)}
            className="w-full p-2 bg-gray-700 text-gray-100 rounded"
          />
          <small className="text-gray-500">
            Leave blank to compute Gross from hours &amp; rate.
          </small>
        </div>
      </div>
    </div>
  );
};

export default InputSection;
