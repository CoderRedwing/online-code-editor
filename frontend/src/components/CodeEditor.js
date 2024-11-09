import React, { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import axios from 'axios';
import '../App.css';

const CodeEditor = () => {
    // Define extensions for each language
    const languageExtensions = {
        c: 'c',
        cpp: 'cpp',
        java: 'java',
        python: 'py',
        rust: 'rs',
        php: 'php',
        javascript: 'js',
    };

    // Define "Hello, World!" templates for each language
    const helloWorldTemplates = {
        c: '#include <stdio.h>\nint main() {\n    printf("Hello, World! ");\n    return 0;\n}',
        cpp: '#include <iostream>\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}',
        java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
        python: 'print("Hello, World!")',
        rust: 'fn main() {\n    println!("Hello, World!");\n}',
        php: '<?php\n    echo "Hello, World!";\n?>',
        javascript: 'console.log("Hello, World!");',
    };

    const [code, setCode] = useState(helloWorldTemplates.c); // Default code for C
    const [language, setLanguage] = useState('c');
    const [output, setOutput] = useState('');

    const handleRunClick = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/execute', {
                language,
                code,
            });
            setOutput(response.data.output || 'Execution successful with no output');
        } catch (error) {
            setOutput(`Error executing code: ${error.response ? error.response.data.error : error.message}`);
        }
    };

    const handleClearClick = () => {
        setOutput('');  // Clear the output
    };

    // Function to handle language change and update editor with "Hello, World!" template
    const handleLanguageChange = (selectedLanguage) => {
        setLanguage(selectedLanguage);
        setCode(helloWorldTemplates[selectedLanguage]);
    };

    return (
        <div className="code-editor-container">
            {/* Top bar */}
            <div className="topbar">
                <div className="file-name">
                    <span>{`main.${languageExtensions[language]}`}</span>
                </div>
                <div className="topbar-controls">
                    <button onClick={handleRunClick} className="topbar-button run-btn">Run</button>
                    <button onClick={handleClearClick} className="topbar-button clear-btn">Clear</button>
                </div>
            </div>

            <div className="editor-output-container">
                {/* Vertical toolbar for language selection */}
                <div className="vertical-toolbar">
                    <button onClick={() => handleLanguageChange('c')}>
                        <img src="/assets/c.png" alt="C" />
                    </button>
                    <button onClick={() => handleLanguageChange('cpp')}>
                        <img src="/assets/cpp.png" alt="C++" />
                    </button>
                    <button onClick={() => handleLanguageChange('java')}>
                        <img src="/assets/java.png" alt="Java" />
                    </button>
                    <button onClick={() => handleLanguageChange('python')}>
                        <img src="/assets/python.png" alt="Python" />
                    </button>
                    <button onClick={() => handleLanguageChange('rust')}>
                        <img src="/assets/rust.png" alt="Rust" />
                    </button>
                    <button onClick={() => handleLanguageChange('php')}>
                        <img src="/assets/php.png" alt="PHP" />
                    </button>
                    <button onClick={() => handleLanguageChange('javascript')}>
                        <img src="/assets/javascript.png" alt="JavaScript" />
                    </button>
                </div>

                {/* Code editor section */}
                <div className="editor-section">
                    <MonacoEditor
                        language={language}
                        value={code}
                        onChange={(newValue) => setCode(newValue)}
                        height="calc(100vh - 100px)"  // Adjust height for scrolling
                        theme="vs-light"
                        options={{
                            selectOnLineNumbers: true,
                            automaticLayout: true,
                        }}
                    />
                </div>

                {/* Output section */}
                <div className="output-section">
                    <h3>Output:</h3>
                    <pre>{output}</pre>
                </div>
            </div>
        </div>
    );
};

export default CodeEditor;
