import React, { useState } from "react";

function QuoteForm({ onAdd }) {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text || !author) return;
    onAdd({ text, author });
    setText("");
    setAuthor("");
  };

  return (
    <form className="quote-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter quote"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default QuoteForm;
