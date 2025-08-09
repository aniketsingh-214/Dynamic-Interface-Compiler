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

  const schema = useMemo(() => {
    try {
      const parsed = JSON.parse(jsonInput);
      setParseError(null); 
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
      </header>
      <main className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[70vh]">
        <JsonEditor value={jsonInput} onChange={setJsonInput} error={parseError} />
        <DynamicRenderer schema={schema} />
      </main>
    </div>
  );
}

export default App;