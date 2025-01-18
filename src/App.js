// App.js
import React, { useState, useEffect } from "react";
import DynamicTitle from "./components/DynamicTitle";
import InputSection from "./components/InputSection";
import ExpenseList from "./components/ExpenseList";
import Summary from "./components/Summary";

const App = () => {
  const [totalHours, setTotalHours] = useState(0);
  const [hourlyRate, setHourlyRate] = useState(0);
  const [manualGross, setManualGross] = useState("");
  const [expenses, setExpenses] = useState([]);

  // Store calculations:
  const [results, setResults] = useState({
    grossPay: 0,
    netPay: 0,
    remainingBalance: 0,
    problematicExpenses: [],
  });

  useEffect(() => {
    // Skip calculations if there's no valid input for totalHours or manualGross
    const hasValidInput =
      manualGross.trim() !== "" || (totalHours > 0 && !isNaN(totalHours));

    if (!hasValidInput) {
      // Reset results but keep rendering the Summary
      setResults({
        grossPay: 0,
        netPay: 0,
        remainingBalance: 0,
        problematicExpenses: [],
      });
      return;
    }

    // Calculate gross pay (manualGross takes precedence)
    const regularHours = Math.min(totalHours, 80);
    const overtimeHours = Math.max(totalHours - 80, 0);
    const overtimeMultiplier = 1.8125;

    const calcGross =
      regularHours * hourlyRate + overtimeHours * hourlyRate * overtimeMultiplier;

    const grossPay = manualGross
      ? parseFloat(manualGross)
      : parseFloat(calcGross.toFixed(2));

    // Calculate taxes
    const federalTax = parseFloat((grossPay * 0.0628).toFixed(2));
    const socialSecurityTax = parseFloat((grossPay * 0.062).toFixed(2));
    const medicareTax = parseFloat((grossPay * 0.0145).toFixed(2));
    const stateTax = parseFloat((grossPay * 0.021).toFixed(2));
    const brooklynTax = parseFloat((grossPay * 0.025).toFixed(2));

    const totalTaxes = parseFloat(
      (
        federalTax +
        socialSecurityTax +
        medicareTax +
        stateTax +
        brooklynTax
      ).toFixed(2)
    );

    const netPay = parseFloat((grossPay - totalTaxes).toFixed(2));

    // Deduct expenses
    let remainingBalance = netPay;
    const problematicExpenses = [];

    expenses.forEach((expense) => {
      remainingBalance -= expense.amount;
      if (remainingBalance < 0) {
        problematicExpenses.push(expense);
      }
    });

    // Update results
    setResults({
      grossPay,
      netPay,
      remainingBalance: parseFloat(remainingBalance.toFixed(2)),
      problematicExpenses,
    });
  }, [totalHours, hourlyRate, manualGross, expenses]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <DynamicTitle />

      {/* Input Section */}
      <InputSection
        totalHours={totalHours}
        setTotalHours={setTotalHours}
        hourlyRate={hourlyRate}
        setHourlyRate={setHourlyRate}
        manualGross={manualGross}
        setManualGross={setManualGross}
      />

      {/* Expenses List */}
      <ExpenseList expenses={expenses} setExpenses={setExpenses} />

      {/* Summary always renders, but dialog messages appear conditionally */}
      <Summary
        grossPay={results.grossPay}
        netPay={results.netPay}
        remainingBalance={results.remainingBalance}
        problematicExpenses={results.problematicExpenses}
        showDialog={results.grossPay > 0} // Pass a flag for dialog visibility
      />
    </div>
  );
};

export default App;
