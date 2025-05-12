import { useState } from 'react';
import { searchNotes } from '../utils/dataService';

export default function SearchBar({ setNotes, setCurrentFolder, setCurrentNote }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    const results = searchNotes(searchQuery);
    setNotes(results);
    setCurrentFolder(null);
    setCurrentNote(null);
  };

  const handleClear = () => {
    setSearchQuery('');
    setNotes([]);
    setCurrentFolder(null);
    setCurrentNote(null);
  };

  return (
    <div className="mb-4 flex">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        placeholder="Search notes..."
        className="flex-1 p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4"
      >
        Search
      </button>
      <button
        onClick={handleClear}
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 rounded-r"
      >
        Clear
      </button>
    </div>
  );
}