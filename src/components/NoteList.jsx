export default function NoteList({ 
  notes, 
  currentFolder, 
  setCurrentNote, 
  currentNote, 
  handleDeleteNote 
}) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm h-full overflow-y-auto">
      <h2 className="text-lg font-semibold text-blue-800 mb-4">
        {currentFolder ? `Notes in ${currentFolder.name}` : 'All Notes'}
      </h2>
      <ul className="space-y-2">
        {notes.map((note) => (
          <li key={note.id}>
            <button
              onClick={() => setCurrentNote(note)}
              className={`w-full text-left p-3 rounded transition ${currentNote?.id === note.id ? 'bg-blue-100 border-l-4 border-blue-500' : 'hover:bg-blue-50'}`}
            >
              <h3 className="font-medium truncate">{note.title}</h3>
              <p className="text-sm text-gray-500 truncate">
                {note.content.substring(0, 60)}...
              </p>
              <div className="flex justify-end mt-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteNote(note.id);
                  }}
                  className="text-xs text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </button>
          </li>
        ))}
        {notes.length === 0 && (
          <li className="text-gray-500 text-center py-4">No notes found</li>
        )}
      </ul>
    </div>
  );
}