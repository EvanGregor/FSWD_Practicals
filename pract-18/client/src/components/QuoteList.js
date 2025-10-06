import React from "react";

function QuoteList({ quotes, onDelete }) {
  return (
    <div className="quote-list">
      {quotes.map((q) => (
        <div key={q._id} className="quote-card">
          <p>“{q.text}”</p>
          <p className="author">– {q.author}</p>
          <button onClick={() => onDelete(q._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default QuoteList;
