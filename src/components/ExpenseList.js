import React, { useState } from "react";

const ExpenseList = ({ expenses, setExpenses }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [editIndex, setEditIndex] = useState(null); // Tracks the index of the expense being edited

  // Handle Add or Update Expense
  const handleSaveExpense = () => {
    if (!name || !amount || isNaN(amount)) {
      alert("Please enter a valid expense name and amount.");
      return;
    }

    if (editIndex !== null) {
      // Update existing expense
      const updatedExpenses = [...expenses];
      updatedExpenses[editIndex] = { name, amount: parseFloat(amount) };
      setExpenses(updatedExpenses);
      setEditIndex(null); // Exit edit mode
    } else {
      // Add new expense
      setExpenses([...expenses, { name, amount: parseFloat(amount) }]);
    }

    // Clear input fields
    setName("");
    setAmount("");
  };

  // Handle Edit Button
  const handleEditExpense = (index) => {
    setEditIndex(index);
    setName(expenses[index].name); // Populate input fields with the selected expense's values
    setAmount(expenses[index].amount);
  };

  // Handle Delete Button
  const handleRemoveExpense = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  // Handle Cancel Edit
  const handleCancelEdit = () => {
    setEditIndex(null);
    setName("");
    setAmount("");
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-blue-400">Expense List</h2>

      {/* Input Section */}
      <div className="mt-4 space-y-4">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Expense Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 p-2 bg-gray-700 text-gray-100 rounded"
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex-1 p-2 bg-gray-700 text-gray-100 rounded"
          />
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleSaveExpense}
            className="w-full bg-pink-500 p-2 text-gray-100 rounded-lg"
          >
            {editIndex !== null ? "Update Expense" : "Add Expense"}
          </button>
          {editIndex !== null && (
            <button
              onClick={handleCancelEdit}
              className="w-full bg-gray-500 p-2 text-gray-100 rounded-lg"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Expense List */}
      <ul className="mt-4 space-y-2">
        {expenses.map((expense, index) => (
          <li
            key={index}
            className="flex justify-between bg-gray-700 p-2 rounded items-center"
          >
            <div>
              <span className="text-gray-100 font-bold">{expense.name}:</span>{" "}
              <span className="text-gray-100">${expense.amount.toFixed(2)}</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEditExpense(index)}
                className="text-blue-400 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleRemoveExpense(index)}
                className="text-red-400 hover:underline"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
