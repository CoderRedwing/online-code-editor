const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// Function to run code in Docker
const runCodeInDocker = (language, code) => {
    return new Promise((resolve, reject) => {
        // Create a temp file based on language
        const tempFileName = `temp_code.${getFileExtension(language)}`;
        const tempFilePath = path.join(process.cwd(), tempFileName);

        // Write code to a temporary file
        fs.writeFileSync(tempFilePath, code);

        // Get Docker command for the specified language
        const dockerCommand = getDockerCommand(language, tempFilePath);
        console.log(`Running command: ${dockerCommand}`); // Log the command for debugging

        exec(dockerCommand, (error, stdout, stderr) => {
            console.log(`stdout: ${stdout}`); // Log stdout
            console.log(`stderr: ${stderr}`); // Log stderr

            // Log complete output for debugging
            if (stdout) {
                console.log(`Output: ${stdout}`);
            }
            if (stderr) {
                console.log(`Errors: ${stderr}`);
            }

            // Check if there are errors or stderr output
            if (error) {
                console.error(`Execution error: ${error.message}`);
                reject(`Execution error: ${error.message}`);
            } else if (stderr) {
                console.error(`Docker stderr: ${stderr}`);
                reject(`Docker stderr: ${stderr}`);
            } else {
                resolve(stdout);
            }

            // Clean up temp file after execution
            fs.unlinkSync(tempFilePath);
        });
    });
};

// Function to get Docker command based on language
const getDockerCommand = (language, filePath) => {
    switch (language) {
        case 'python':
            return `docker run --rm -v ${process.cwd()}:/usr/src/myapp -w /usr/src/myapp python:3.9 python ${path.basename(filePath)}`;
        case 'cpp':
            return `docker run --rm -v ${process.cwd()}:/usr/src/myapp -w /usr/src/myapp gcc:latest bash -c "g++ ${path.basename(filePath)} -o temp.out && ./temp.out"`;
        case 'c':
            return `docker run --rm -v ${process.cwd()}:/usr/src/myapp -w /usr/src/myapp gcc:latest bash -c "gcc ${path.basename(filePath)} -o temp.out && ./temp.out"`;
        case 'java':
            return `docker run --rm -v ${process.cwd()}:/usr/src/myapp -w /usr/src/myapp openjdk:17-alpine bash -c "javac ${path.basename(filePath)} && java Main"`;
        case 'javascript':
            return `docker run --rm -v ${process.cwd()}:/usr/src/myapp -w /usr/src/myapp node:16-alpine node ${path.basename(filePath)}`;
        case 'php':
            return `docker run --rm -v ${process.cwd()}:/usr/src/myapp -w /usr/src/myapp php:latest php ${path.basename(filePath)}`;
        case 'rust':
            return `docker run --rm -v ${process.cwd()}:/usr/src/myapp -w /usr/src/myapp rust:latest bash -c "rustc ${path.basename(filePath)} -o temp.out && ./temp.out"`;

        default:
            throw new Error('Unsupported language');
    }
};

// Function to get file extension based on language
const getFileExtension = (language) => {
    switch (language) {
        case 'python': return 'py';
        case 'cpp': return 'cpp';
        case 'c': return 'c';
        case 'java': return 'java';
        case 'javascript': return 'js';
        case 'php': return 'php';
        case 'rust': return 'rs';
        default: throw new Error('Unsupported language');
    }
};

module.exports = { runCodeInDocker };
