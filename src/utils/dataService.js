export const getFolders = () => {
  const folders = JSON.parse(localStorage.getItem('folders')) || [];
  return folders;
};

export const getNotes = () => {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  return notes;
};

export const saveFolders = (folders) => {
  localStorage.setItem('folders', JSON.stringify(folders));
};

export const saveNotes = (notes) => {
  localStorage.setItem('notes', JSON.stringify(notes));
};

export const getNotesByFolder = (folderId) => {
  const notes = getNotes();
  return notes.filter(note => note.folderId === folderId);
};

export const searchNotes = (query) => {
  const notes = getNotes();
  const lowerQuery = query.toLowerCase();
  return notes.filter(note => 
    note.title.toLowerCase().includes(lowerQuery) || 
    note.content.toLowerCase().includes(lowerQuery)
  );
};