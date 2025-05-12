import { useState, useEffect } from 'react';
import { saveNotes, getNotes } from '../utils/dataService';

export default function NoteEditor({ 
  currentNote, 
  currentFolder, 
  setNotes, 
  setCurrentNote 
}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showFolderAlert, setShowFolderAlert] = useState(false);

  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title);
      setContent(currentNote.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [currentNote]);

  const handleSave = () => {
    if (!title.trim()) return;
    
    // Check if folder is selected when creating a new note
    if (!currentNote && !currentFolder) {
      setShowFolderAlert(true);
      return;
    }
    
    setShowFolderAlert(false);
    
    const allNotes = getNotes();
    let updatedNotes = [];
    
    if (currentNote) {
      // Update existing note
      updatedNotes = allNotes.map(note => 
        note.id === currentNote.id ? { ...note, title, content } : note
      );
    } else {
      // Create new note
      const newNote = {
        id: Date.now().toString(),
        title,
        content,
        folderId: currentFolder.id,
        createdAt: new Date().toISOString()
      };
      updatedNotes = [...allNotes, newNote];
      setCurrentNote(newNote);
    }
    
    saveNotes(updatedNotes);
    setNotes(updatedNotes.filter(note => note.folderId === currentFolder?.id));
  };

  const handleNewNote = () => {
    setCurrentNote(null);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-blue-800">
          {currentNote ? 'Edit Note' : 'New Note'}
        </h2>
        <div className="space-x-2">
          <button
            onClick={handleNewNote}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded text-sm"
          >
            New
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
          >
            Save
          </button>
        </div>
      </div>
      
      {showFolderAlert && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded border border-red-200">
          Please select a folder before saving the note.
        </div>
      )}
      
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note title"
        className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your note here..."
        className="flex-1 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
      />
    </div>
  );
}