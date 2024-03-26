import React, { useState } from 'react';

export default function PairingSuggestionsPage() {
  const [selectedClass, setSelectedClass] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleClassSelect = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleGenerateSuggestions = () => {
    // Here you would implement the logic to generate pairing suggestions based on the selected class.
    // For demonstration purposes, let's assume we have hardcoded some suggestions.
    setSuggestions([
      { name: 'Alice', discord: 'alice#1234' },
      { name: 'Bob', discord: 'bob#5678' },
      { name: 'Charlie', discord: 'charlie#9012' }
    ]);
  };

  return (
    <div className="flex flex-col items-center bg-slate-100">
      <style>{`
        body, html {
          margin: 0;
          padding: 0;
        }
      `}</style>
      <div className="w-full max-w-md mx-auto space-y-6 mt-6 p-4 bg-white shadow-md rounded-lg">
        <h1 className="text-xl font-bold mb-4">Pairing Suggestions</h1>
        <div className="flex items-center">
          <label htmlFor="classSelect" className="mr-2">Select a Class:</label>
          <select id="classSelect" value={selectedClass} onChange={handleClassSelect}>
            <option value="">Select a class</option>
            <option value="CSC 101">CSC 101</option>
            <option value="CSC 102">CSC 102</option>
            <option value="CSC 103">CSC 103</option>
            <option value="CSC 104">CSC 104</option>
            <option value="CSC 105">CSC 105</option>
            <option value="CSC 106">CSC 106</option>
          </select>
          <button onClick={handleGenerateSuggestions} className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Generate Suggestions</button>
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-bold mb-2">Pairing Suggestions:</h2>
          <ul className="list-disc pl-6">
            {suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion.name} - Discord: {suggestion.discord}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
