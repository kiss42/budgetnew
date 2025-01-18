import { useEffect } from "react";

const FinanceCalculator = ({
  totalHours,
  hourlyRate,
  expenses,
  onResultsUpdate,
  manualGross, // <-- bring in manualGross
}) => {
  useEffect(() => {
    // 1) Compute a "calculatedGross" from hours/rate
    const regularHours = Math.min(totalHours, 80);
    const overtimeHours = Math.max(totalHours - 80, 0);
    const overtimeMultiplier = 1.8125;

    const regularPay = regularHours * hourlyRate;
    const overtimePay = overtimeHours * hourlyRate * overtimeMultiplier;
    const calculatedGross = regularPay + overtimePay;

    // 2) If the user provided a manualGross, use that; otherwise, use calculatedGross.
    //    Make sure to parse them as floats so you don't end up with strings.
    let grossPay = parseFloat(manualGross) || calculatedGross;
    grossPay = parseFloat(grossPay.toFixed(2)); // round to 2 decimals

    // 3) Calculate Taxes.
    //    If you want to avoid small rounding errors for each line,
    //    you can sum the tax rates and do ONE multiplication at the end.
    const taxRates = {
      federal: 0.0628,        // Federal Tax (6.28%)
      socialSecurity: 0.062,  // Social Security (6.2%)
      medicare: 0.0145,       // Medicare (1.45%)
      state: 0.021,           // State Tax (2.1%)
      brooklyn: 0.025,        // Local Tax (2.5%)
    };
    
    // Option A: Sum the tax rates first
    const totalTaxRate = Object.values(taxRates).reduce((sum, val) => sum + val, 0);
    // Then calculate total taxes with a single multiplication (helps reduce rounding mismatch).
    let totalTaxes = grossPay * totalTaxRate;
    // Round to two decimals once
    totalTaxes = parseFloat(totalTaxes.toFixed(2));

    // Option B: If you still want each line item, that's fine—just be aware of minor rounding differences:
    // const federalTax = parseFloat((grossPay * taxRates.federal).toFixed(2));
    // ... (repeat for each)
    // const totalTaxes = parseFloat(
    //   (federalTax + socialSecurityTax + medicareTax + stateTax + brooklynTax).toFixed(2)
    // );

    // 4) Net Pay
    let netPay = grossPay - totalTaxes;
    netPay = parseFloat(netPay.toFixed(2));

    // 5) Deduct Expenses
    let remainingBalance = netPay;
    const problematicExpenses = [];

    expenses.forEach((expense) => {
      remainingBalance -= expense.amount;
      if (remainingBalance < 0) {
        problematicExpenses.push(expense);
      }
    });

    // 6) Send results up to parent
    onResultsUpdate({
      grossPay,
      netPay,
      remainingBalance: parseFloat(remainingBalance.toFixed(2)),
      problematicExpenses,
    });
  }, [totalHours, hourlyRate, expenses, onResultsUpdate, manualGross]);

  return null;
};

export default FinanceCalculator;
