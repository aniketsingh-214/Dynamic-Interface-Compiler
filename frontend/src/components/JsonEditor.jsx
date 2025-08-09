import React from 'react';

function JsonEditor({ value, onChange, error }) {
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">JSON Schema Definition</h2>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full flex-grow p-4 font-mono text-sm bg-gray-900 text-white rounded-lg border-2 border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        spellCheck="false"
      />
      {error && <pre className="mt-2 p-2 bg-red-100 text-red-700 rounded text-xs">{error}</pre>}
    </div>
  );
}

export default JsonEditor;