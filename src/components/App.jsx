import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { getFolders, getNotesByFolder, saveNotes } from '../utils/dataService';
import Auth from './Auth';
import FolderTree from './FolderTree';
import NoteList from './NoteList';
import NoteEditor from './NoteEditor';
import SearchBar from './SearchBar';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [folders, setFolders] = useLocalStorage('folders', []);
  const [notes, setNotes] = useState([]);
  const [currentFolder, setCurrentFolder] = useState(null);
  const [currentNote, setCurrentNote] = useState(null);

  const handleContinueAsGuest = () => {
    setIsAuthenticated(true);
  };

  const handleDeleteNote = (noteId) => {
    const allNotes = JSON.parse(localStorage.getItem('notes')) || [];
    const updatedNotes = allNotes.filter(note => note.id !== noteId);
    saveNotes(updatedNotes);
    
    if (currentFolder) {
      setNotes(updatedNotes.filter(note => note.folderId === currentFolder.id));
    } else {
      setNotes(updatedNotes);
    }
    
    if (currentNote?.id === noteId) {
      setCurrentNote(null);
    }
  };

  if (!isAuthenticated) {
    return <Auth onContinueAsGuest={handleContinueAsGuest} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">TakeNoteBro</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <FolderTree 
              folders={folders} 
              setFolders={setFolders} 
              setCurrentFolder={setCurrentFolder}
              setNotes={setNotes}
              setCurrentNote={setCurrentNote}
            />
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <SearchBar 
              setNotes={setNotes} 
              setCurrentFolder={setCurrentFolder} 
              setCurrentNote={setCurrentNote}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Note List */}
              <div className="md:col-span-1 h-[calc(100vh-200px)]">
                <NoteList 
                  notes={notes} 
                  currentFolder={currentFolder} 
                  setCurrentNote={setCurrentNote}
                  currentNote={currentNote}
                  handleDeleteNote={handleDeleteNote}
                />
              </div>
              
              {/* Note Editor */}
              <div className="md:col-span-1 h-[calc(100vh-200px)]">
                <NoteEditor 
                  currentNote={currentNote} 
                  currentFolder={currentFolder} 
                  setNotes={setNotes}
                  setCurrentNote={setCurrentNote}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}