import React, { useState, useMemo } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import JsonEditor from './components/JsonEditor';
import DynamicRenderer from './components/DynamicRenderer';

const defaultSchema = `{
  "type": "form",
  "fields": [
    { "label": "Name", "type": "text", "required": true },
    { "label": "Age", "type": "number", "min": 18 }
  ],
  "submitText": "Register",
  "onSubmit": "if (values.age < 21) return 'Sorry, you must be 21 or older to register.'; if (!values.name) return 'Name is required!'"
}`;

function App() {
  const [jsonInput, setJsonInput] = useLocalStorage('schema', defaultSchema);
  const [parseError, setParseError] = useState(null);

  // We use useMemo to only re-parse the JSON when the input string changes.
  // This is a performance optimization.
  const schema = useMemo(() => {
    try {
      const parsed = JSON.parse(jsonInput);
      setParseError(null); // Clear previous errors if parsing is successful
      return parsed;
    } catch (e) {
      setParseError(`Invalid JSON: ${e.message}`);
      return null;
    }
  }, [jsonInput]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-gray-800">Dynamic Interface Compiler</h1>
        <p className="text-lg text-gray-600 mt-2">Define UI with JSON on the left, see it rendered live on the right.</p>
      </header>
      <main className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[70vh]">
        <JsonEditor value={jsonInput} onChange={setJsonInput} error={parseError} />
        <DynamicRenderer schema={schema} />
      </main>
    </div>
  );
}

export default App;