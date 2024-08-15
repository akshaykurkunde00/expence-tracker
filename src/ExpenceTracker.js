import React, { useState } from 'react';
import './ExpenceTracker.css'

function ExpenseTracker() {
  const [balance, setBalance] = useState(10000);
  const [search, setSearch] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState('');
  const [amount, setAmount] = useState('');
  const [filteredExpenses, setFilteredExpenses] = useState([]);

  const addExpense = () => {
    if (newExpense && amount) {
      const expense = { description: newExpense, amount: parseFloat(amount) };
      const updatedExpenses = [...expenses, expense];
      setExpenses(updatedExpenses);
      setFilteredExpenses(updatedExpenses);
      setNewExpense('');
      setAmount('');
    }
  };

  const deleteExpense = (index) => {
    const updatedExpenses = [...expenses];
    updatedExpenses.splice(index, 1);
    setExpenses(updatedExpenses);
    setFilteredExpenses(updatedExpenses);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);

    if (searchTerm === '') {
      setFilteredExpenses(expenses);
    } else {
      const filtered = expenses.filter(expense =>
        expense.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredExpenses(filtered);
    }
  };

  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount,0);

  return (
    <>
      <div className='container'>
        <div className='tracker'>
          <h2>Expense Tracker</h2>
          <p className="income">Total Income: {balance - totalExpenses} Rs</p>
          <div className="input-group">
            <input
              type="text"
              placeholder="Expense description"
              value={newExpense}
              onChange={(e) => setNewExpense(e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={addExpense}>Add Expense</button>
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="Search expenses"
              value={search}
              onChange={handleSearch}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
        <ul>
          {filteredExpenses.map((expense, index) => (
            <li key={index}>
              {expense.description} - {expense.amount} Rs
              <button onClick={() => deleteExpense(index)}>Delete</button>
            </li>
          ))}
        </ul>
        <p className="expense">Total Expenses: {totalExpenses} Rs</p>
      </div>
    </>
  );
}

export default ExpenseTracker;
