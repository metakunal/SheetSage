# SheetSage 🧙‍♂️

SheetSage is a web application that transforms layman terms into executable Excel/Google Sheets actions using AI-powered agents.

## Features

- Provide prompts for tasks related to the spreadsheet.
- Maintain a history of embedded spreadsheets with options to rename or delete.
- History is persisted in the browser's local storage.
- Stylish and responsive UI with gradient backgrounds and icons.

## Technologies Used

### Frontend

- **React**: For building the user interface.
- **TailwindCSS**: For styling.
- **React Icons**: For the icons used in the application.

### Backend

- **Flask**: For handling API requests.
- **Flask-CORS**: To manage cross-origin requests.

---

## Architecture

![architecture](https://github.com/user-attachments/assets/5a4d6f3d-be44-411f-bfc7-0a9d4cc0fefe)


---

### Demo Video

To see a demonstration of the application in action, check out the [demo video](https://youtu.be/PEG-G3RJuaw).

---

## Getting Started

Follow these steps to set up and run the project locally:

### Prerequisites

- **Node.js**: [Download and install Node.js](https://nodejs.org/).
- **Python 3.x**: Ensure Python is installed on your system.
- **pip**: Python package manager (comes with Python).

---

### Frontend Setup

1. **Navigate to the frontend directory:**

   ```bash
   cd frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. Open your browser and visit:
   ```
   http://localhost:5173
   ```

---

### Backend Setup

1. **Navigate to the backend directory:**

   ```bash
   cd backend
   ```

2. **Create a virtual environment (optional but recommended):**

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows, use venv\Scripts\activate
   ```

3. **Install dependencies:**

   ```bash
   pip install flask flask-cors
   ```

   ```bash
   pip install gspread oauth2client matplotlib pandas transformers[agents] google-api-python-client -qU
   ```

4. **Run the Flask server:**

   ```bash
   python server.py
   ```

5. The backend will be running at:
   ```
   http://localhost:5000
   ```

---

### Troubleshooting

#### CORS Error

If you encounter a CORS error when trying to fetch from the backend, ensure the Flask server has `Flask-CORS` properly installed and configured:

```python
from flask_cors import CORS
CORS(app)
```

#### Dependencies Issues

If a dependency is missing, run the following command in the appropriate directory:

- For frontend:
  ```bash
  npm install <package-name>
  ```
- For backend:
  ```bash
  pip install <package-name>
  ```

---

### Future Enhancements

- Add user authentication.
- Allow for sharing of spreadsheet history across devices.
- Integrate AI-based prompt suggestions.

---

### License

This project is licensed under the MIT License.
