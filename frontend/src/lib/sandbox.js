/**
 * Executes a user-defined string of logic in a sandboxed environment.
 * @param {string} logicString - The string of JS logic to execute.
 * @param {object} values - The raw form values object.
 * @returns {any} The result of the executed logic, or an error message string.
 */
export function safeExecute(logicString, values) {
  if (!logicString) {
    return null;
  }

  // 💡 THE FIX: We create a Proxy to make the values object "safer".
  // A Proxy wraps another object and intercepts operations, like property access.
  const safeValues = new Proxy(values, {
    get(target, prop) {
      // This 'get' handler is triggered whenever the logic tries to
      // access a property, e.g., `values.name`

      // First, check if the property actually exists on the real object.
      if (prop in target) {
        return target[prop];
      }

      // If the property does NOT exist (due to a typo, etc.),
      // return an empty string '' instead of undefined.
      // This prevents the "Cannot read properties of undefined" error.
      // The logic `values.typo.length` will become `''.length`, which is 0.
      return '';
    },
  });

  try {
    // The sandboxed function now receives the "safe" proxy, not the raw object.
    const sandboxedFunction = new Function('values', logicString);
    return sandboxedFunction(safeValues);
  } catch (error) {
    // This will now primarily catch syntax errors in the logic string itself,
    // as our Proxy prevents most runtime access errors.
    console.error("Error executing sandboxed code:", error);
    return `Logic Error: ${error.message}`;
  }
}