const express = require('express');
const router = express.Router();
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs'); // Import fs module for file handling

// Function to execute code based on the language
const runCodeInDocker = (language, code, input = '', useFile = false) => {
    return new Promise((resolve, reject) => {
        let command;

        // If useFile is true, we write to a temporary file
        if (useFile) {
            const filename = `temp.${language}`; // Temporary filename for the code
            const filePath = path.join(__dirname, filename); // Full path for the temp file

            // Write code to a temporary file
            try {
                fs.writeFileSync(filePath, code);
                console.log(`Temporary file created at ${filePath} with content: ${code}`);
            } catch (writeError) {
                console.error('Error writing the temporary file:', writeError);
                return reject('Failed to write temporary file');
            }

            switch (language) {
                case 'python':
                    command = `docker run --rm -v ${process.cwd()}:/usr/src/app python:latest python /usr/src/app/${filename}`;
                    break;
                case 'cpp':
                    command = `docker run --rm -v ${process.cwd()}:/usr/src/app gcc:latest g++ /usr/src/app/${filename} -o /usr/src/app/temp && /usr/src/app/temp`;
                    break;
                case 'c':
                    command = `docker run --rm -v ${process.cwd()}:/usr/src/app gcc:latest gcc /usr/src/app/${filename} -o /usr/src/app/temp && /usr/src/app/temp`;
                    break;
                case 'java':
                    command = `docker run --rm -v ${process.cwd()}:/usr/src/app openjdk:latest bash -c "javac /usr/src/app/${filename} && java -cp /usr/src/app Main"`;
                    break;
                case 'javascript':
                    command = `docker run --rm -v ${process.cwd()}:/usr/src/app node:latest node /usr/src/app/${filename}`;
                    break;
                case 'php':
                    command = `docker run --rm -v ${process.cwd()}:/usr/src/app php:latest php /usr/src/app/${filename}`;
                    break;
                case 'rust':
                    command = `docker run --rm -v ${process.cwd()}:/usr/src/app rust:latest bash -c "rustc /usr/src/app/${filename} -o /usr/src/app/temp && /usr/src/app/temp"`;
                    break;
                default:
                    return reject('Language not supported');
            }

            // Execute the command
            console.log(`Executing command: ${command}`);
            exec(command, (error, stdout, stderr) => {
                // Clean up temporary file if it exists
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                    console.log(`Temporary file ${filePath} deleted.`);
                }

                if (error) {
                    console.error(`Error executing command: ${error.message}`);
                    console.error(`stderr: ${stderr}`);
                    reject(`Error: ${stderr}`);
                } else {
                    console.log(`Command executed successfully. Output: ${stdout}`);
                    resolve(stdout);
                }
            });
        } else {
            // If not using a file, run directly from stdin
            const sanitizedCode = code.replace(/"/g, '\\"').replace(/\n/g, '\\n'); // Escape quotes and newlines

            switch (language) {
                case 'python':
                    command = `echo "${sanitizedCode}" | docker run -i --rm python:latest python -`;
                    break;
                case 'cpp':
                    command = `echo "${sanitizedCode}" | docker run -i --rm gcc:latest bash -c "g++ -x c++ -o /tmp/a.out - && /tmp/a.out"`;
                    break;
                case 'c':
                              // Escape quotes and newlines
                    command = `echo "${sanitizedCode}" | docker run -i --rm gcc:latest bash -c "gcc -x c -o /tmp/a.out - && /tmp/a.out"`;
                    break;
                case 'java':
                    command = `echo "${sanitizedCode}" | docker run -i --rm openjdk:latest bash -c "cat > Main.java && javac Main.java && java Main"`;
                    break;
                case 'javascript':
                    command = `echo "${sanitizedCode}" | docker run -i --rm node:latest node -`;
                    break;
                case 'php':
                    command = `echo "${sanitizedCode}" | docker run -i --rm php:latest php -`;
                    break;
                case 'rust':
                    command = `echo "${sanitizedCode}" | docker run -i --rm rust:latest sh -c "rustc -o /tmp/a.out - && /tmp/a.out"`;
                    break;
                default:
                    return reject('Language not supported');
            }

            // Execute the command
            console.log(`Executing command: ${command}`);
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error executing command: ${error.message}`);
                    console.error(`stderr: ${stderr}`);
                    reject(`Error: ${stderr}`);
                } else {
                    console.log(`Command executed successfully. Output: ${stdout}`);
                    resolve(stdout);
                }
            });
        }
    });
};

// Define the endpoint to run the code
router.post('/execute', async (req, res) => {
    const { language, code, input = '', useFile = false } = req.body; // Accept input and useFile from request body

    try {
        const output = await runCodeInDocker(language, code, input, useFile);
        res.json({ output });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
