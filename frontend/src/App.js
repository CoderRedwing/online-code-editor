import React from 'react';
import './App.css';  // Import the global CSS file

// Import your CodeEditor component from the correct path
import CodeEditor from './components/CodeEditor'; 

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Online Code Editor</h1>
            </header>
            <main>
                <CodeEditor />  {/* Renders the CodeEditor component */}
            </main>
            <footer className="App-footer">
                
            </footer>
        </div>
    );
}

export default App;
