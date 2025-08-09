# Dynamic Interface Compiler

A mini-app that allows users to design UI blocks (like forms and text) by writing JSON schema and see them rendered live as React components without a page refresh. This project serves as an exploration into dynamic rendering, component factories, and safe execution of user-defined logic.



---

## ✨ Features

* **Live JSON Editor**: A simple, clean editor for defining your UI schema.
* **Real-time Renderer**: Instantly parses your JSON and renders the corresponding React components.
* **Component Library**: Supports `form`, `text`, and `image` components out of the box.
* **State Persistence**: Your schema is automatically saved to `localStorage`, so your work is safe on refresh.
* **Sandboxed Logic Execution**: Attach custom validation logic to forms via the JSON schema. This logic is executed safely, preventing common security risks.
* **Robust Error Handling**: The renderer and sandbox are designed to fail gracefully, providing clear feedback on invalid JSON or buggy user logic.

---

## 🚀 Tech Stack

* **Framework**: [React](https://reactjs.org/) via [Vite](https://vitejs.dev/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **State Management**: React Hooks (`useState`) & a custom `useLocalStorage` hook.
* **Core Logic**: JavaScript `Proxy` for a robust sandbox environment.

---

## 🛠️ Getting Started

### Prerequisites

* Node.js (v18.x or higher)
* npm or yarn

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd dynamic-interface-compiler
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:5173`.

---

## Usage

The application is split into two panels.

1.  **JSON Schema Definition (Left Panel)**: Write your JSON here. The schema must have a `type` key to specify which component to render.

2.  **Live Preview (Right Panel)**: The rendered component will appear here.

### Example Schemas

#### Text Component

```json
{
  "type": "text",
  "level": "h1",
  "content": "Welcome to the Compiler!"
}
````

#### Image Component

```json
{
  "type": "image",
  "src": "[https://vitejs.dev/logo.svg](https://vitejs.dev/logo.svg)",
  "alt": "Vite Logo",
  "caption": "Powered by Vite"
}
```

#### Form Component with Logic

This example demonstrates how to add custom validation using the `onSubmit` key.

```json
{
  "type": "form",
  "fields": [
    { "label": "Name", "type": "text", "name": "name", "required": true },
    { "label": "Age", "type": "number", "name": "age", "min": 18 }
  ],
  "submitText": "Register",
  "onSubmit": "if (values.age < 21) return 'Sorry, you must be at least 21 to register.'; if (values.name.length < 2) return 'Name is too short.';"
}
```

* **Export/Import Schema**: Add buttons to allow users to download their UI schema as a `.json` file and to upload a file to load a configuration.
```
