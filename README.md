# 🖥️ Online Code Compiler and Editor

An online code compiler and editor that allows users to write and execute code in multiple programming languages such as Python, C++, Java, and JavaScript. This project is built with a frontend interface for writing code, a backend to execute the code inside Docker containers, and support for multiple languages through Dockerized environments.

## Features

- 🌐 **Multi-language Support**: Run code written in Python, C++, Java, and JavaScript.
- 🚀 **Dockerized Execution**: Each code snippet is executed securely in isolated Docker containers.
- 🎨 **VS Code-Like UI**: A familiar interface with a dark theme for writing and running code.
- 💻 **Real-Time Code Execution**: Immediate feedback on code execution with output displayed on the frontend.
- 🔐 **Secure Execution Environment**: Code execution is sandboxed within Docker containers to ensure security.

## Project Structure

```bash
code-compiler-editor/
├── backend/                # Backend code for running Dockerized code execution
│   ├── src/
│   │   ├── routes/
│   │   └── services/
│   ├── Dockerfile           # Docker setup for backend services
│   └── ...
├── frontend/               # Frontend code for the code editor and UI
│   ├── public/
│   ├── src/
│   ├── Dockerfile           # Docker setup for frontend services
│   └── ...
└── README.md               # Project documentation
```

## Tech Stack

- **Frontend**: React, HTML, CSS
- **Backend**: Node.js, Express.js
- **Containerization**: Docker
- **Languages Supported**: Python, C++, Java, JavaScript

## Setup and Installation

### Prerequisites

- **Docker**: Ensure that Docker is installed on your machine. [Download Docker](https://www.docker.com/get-started)
- **Node.js**: Make sure Node.js (v18+) is installed. [Download Node.js](https://nodejs.org)

### Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/code-compiler.git
   cd code-compiler
   ```

2. **Set up the backend**:

   ```bash
   cd backend
   npm install
   npm run start
   ```

   The backend will start on `http://localhost:5000`.

3. **Set up the frontend**:

   ```bash
   cd frontend
   npm install
   npm run start
   ```

   The frontend will start on `http://localhost:4000`.

4. **Testing the API**:

   You can test the API directly via Postman or any HTTP client:

   - URL: `POST http://localhost:5000/api/execute`
   - Body:

     ```json
     {
         "language": "python",
         "code": "print('Hello, World!')"
     }
     ```

## How It Works

1. Users write code in the editor provided on the frontend.
2. When they click **Run**, the code is sent to the backend via an API call.
3. The backend spins up a Docker container for the selected language, runs the code inside the container, and returns the output to the frontend.
4. The output is then displayed to the user in real-time.


## Contributing

Contributions are welcome! Please fork this repository, create a new branch, and submit a pull request for any improvements or bug fixes.

1. Fork the repo
2. Create a new branch (`git checkout -b feature-branch`)
3. Make changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature-branch`)
6. Create a pull request
