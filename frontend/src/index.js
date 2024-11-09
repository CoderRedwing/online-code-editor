import React from 'react';
import ReactDOM from 'react-dom/client'; // Correct import for React 18
import App from './App'; // Main App component

// Create the root element where the app will be rendered
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app within React's StrictMode for best practices
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
