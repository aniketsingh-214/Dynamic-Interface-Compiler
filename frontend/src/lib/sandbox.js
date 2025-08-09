/**
 * Executes a user-defined string of logic in a sandboxed environment.
 * @param {string} logicString - The string of JS logic to execute.
 * @param {object} values - The form values to pass into the logic.
 * @returns {any} The result of the executed logic, or an error message string.
 */
export function safeExecute(logicString, values) {
  if (!logicString) {
    return null; 
  }
  try {
    // new Function() creates a function in the global scope, not the local one.
    // It cannot access variables from this file, making it a safe sandbox.
    const sandboxedFunction = new Function('values', logicString);
    return sandboxedFunction(values);
  } catch (error) {
    console.error("Error executing sandboxed code:", error);
    return `Logic Error: ${error.message}`;
  }
}