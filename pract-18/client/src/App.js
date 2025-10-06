import React, { useEffect, useState } from "react";
import QuoteForm from "./components/QuoteForm";
import QuoteList from "./components/QuoteList";
import "./App.css";

function App() {
  const [quotes, setQuotes] = useState([]);

  // Fetch quotes
  const fetchQuotes = async () => {
    const res = await fetch("http://localhost:5000/api/quotes");
    const data = await res.json();
    setQuotes(data);
  };

  useEffect(() => { fetchQuotes(); }, []);

  // Add new quote
  const addQuote = async (quote) => {
    await fetch("http://localhost:5000/api/quotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quote),
    });
    fetchQuotes();
  };

  // Delete quote
  const deleteQuote = async (id) => {
    await fetch(`http://localhost:5000/api/quotes/${id}`, { method: "DELETE" });
    fetchQuotes();
  };

  return (
    <div className="app">
      <h1>💬 Quote Journal</h1>
      <QuoteForm onAdd={addQuote} />
      <QuoteList quotes={quotes} onDelete={deleteQuote} />
    </div>
  );
}

export default App;
