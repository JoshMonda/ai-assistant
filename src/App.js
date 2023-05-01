import React, { useState } from 'react';
import './App.css';
import TextEditor from './components/TextEditor';
import SuggestionsPanel from './components/SuggestionsPanel';

function App() {
  const [suggestions, setSuggestions] = useState([]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>AI-Assisted Content Creation Platform</h1>
      </header>
      <div className="container">
              <TextEditor setSuggestions={setSuggestions} />
        <SuggestionsPanel suggestions={suggestions} />
      </div>
    </div>
  );
}

export default App;

