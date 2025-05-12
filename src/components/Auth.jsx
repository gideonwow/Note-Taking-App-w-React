export default function Auth({ onContinueAsGuest }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl flex items-center">
        {/* Logo on the left */}
        <div className="mr-8">
          <div className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
            <img src="/TakeNoteBro.png" alt="TakeNoteBro Logo" className="w-32 h-32 object-contain"/>
          </div>
        </div>
        
        {/* Text and button on the right */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">TakeNoteBro</h1>
          <p className="text-gray-600 mb-6">A simple note-taking app</p>
          <button
            onClick={onContinueAsGuest}
            className="w-full max-w-xs bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg transition duration-200 shadow hover:shadow-md"
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
}