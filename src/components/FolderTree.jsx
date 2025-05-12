import { useState } from 'react';
import { getFolders, saveFolders, getNotesByFolder } from '../utils/dataService';

export default function FolderTree({ 
  folders, 
  setFolders, 
  setCurrentFolder, 
  setNotes, 
  setCurrentNote 
}) {
  const [newFolderName, setNewFolderName] = useState('');

  const handleAddFolder = () => {
    if (!newFolderName.trim()) return;
    
    const newFolder = {
      id: Date.now().toString(),
      name: newFolderName.trim()
    };
    
    const updatedFolders = [...folders, newFolder];
    setFolders(updatedFolders);
    saveFolders(updatedFolders);
    setNewFolderName('');
  };

  const handleDeleteFolder = (folderId) => {
    const updatedFolders = folders.filter(folder => folder.id !== folderId);
    setFolders(updatedFolders);
    saveFolders(updatedFolders);
    
    // Clear notes if the current folder was deleted
    if (setCurrentFolder().id === folderId) {
      setCurrentFolder(null);
      setNotes([]);
      setCurrentNote(null);
    }
  };

  const handleFolderClick = (folder) => {
    setCurrentFolder(folder);
    const folderNotes = getNotesByFolder(folder.id);
    setNotes(folderNotes);
    setCurrentNote(null);
  };

  return (
    <div className="bg-blue-50 p-4 rounded-lg h-full">
      <h2 className="text-lg font-semibold text-blue-800 mb-4">Folders</h2>
      <div className="mb-4 flex">
        <input
          type="text"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          placeholder="New folder name"
          className="flex-1 p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          onClick={handleAddFolder}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 rounded-r"
        >
          Add
        </button>
      </div>
      <ul className="space-y-1">
        {folders.map((folder) => (
          <li key={folder.id} className="flex items-center group">
            <button
              onClick={() => handleFolderClick(folder)}
              className="flex-1 text-left p-2 hover:bg-blue-100 rounded transition"
            >
              {folder.name}
            </button>
            <button
              onClick={() => handleDeleteFolder(folder.id)}
              className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 p-1 transition"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}