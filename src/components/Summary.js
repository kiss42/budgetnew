import React from "react";
import { FaMoneyBillWave, FaWallet, FaExclamationTriangle } from "react-icons/fa";
import { getRemainingBalanceMessage, getNetPayMessage } from "./dialog";

const Summary = ({
  grossPay,
  netPay,
  remainingBalance,
  problematicExpenses,
  showDialog, // New prop to control dialog visibility
}) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold text-purple-400">Summary</h2>

    {/* Gross Pay */}
    <div className="bg-gray-700 p-4 rounded-lg mt-4">
      <div className="flex items-center gap-4">
        <FaMoneyBillWave className="text-yellow-400 text-2xl" />
        <span className="text-gray-100 font-semibold">Gross Pay:</span>
      </div>
      <p className="text-gray-100 font-bold text-lg">${grossPay.toFixed(2)}</p>
    </div>

    {/* Net Pay */}
    <div className="bg-gray-700 p-4 rounded-lg mt-4">
      <div className="flex items-center gap-4">
        <FaWallet className="text-green-400 text-2xl" />
        <span className="text-gray-100 font-semibold">Net Pay:</span>
      </div>
      <p className="text-gray-100 font-bold text-lg">${netPay.toFixed(2)}</p>
      {showDialog && (
        <p className="text-gray-400 italic">{getNetPayMessage(netPay)}</p>
      )}
    </div>

    {/* Remaining Balance */}
    <div
      className={`bg-gray-700 p-4 rounded-lg mt-4 ${
        remainingBalance >= 0
          ? "border-l-4 border-green-400"
          : "border-l-4 border-red-400"
      }`}
    >
      <div className="flex items-center gap-4">
        <FaWallet
          className={`text-2xl ${
            remainingBalance >= 0 ? "text-green-400" : "text-red-400"
          }`}
        />
        <span className="text-gray-100 font-semibold">Remaining Balance:</span>
      </div>
      <p className="text-gray-100 font-bold text-lg">${remainingBalance.toFixed(2)}</p>
      {showDialog && (
        <p
          className={`text-lg font-semibold ${
            remainingBalance >= 0 ? "text-green-400" : "text-red-500"
          }`}
        >
          {getRemainingBalanceMessage(remainingBalance)}
        </p>
      )}
    </div>

    {/* Problematic Expenses */}
    {problematicExpenses.length > 0 && (
      <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded-lg mt-4">
        <div className="flex items-center gap-4">
          <FaExclamationTriangle className="text-red-500 text-2xl" />
          <span className="text-red-700 font-semibold">
            Problematic Expenses:
          </span>
        </div>
        <ul className="mt-2">
          {problematicExpenses.map((expense, index) => (
            <li key={index} className="text-red-600">
              {expense.name}: ${expense.amount.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

export default Summary;
