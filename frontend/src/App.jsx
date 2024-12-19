import React, { useState, useEffect } from "react";

function App() {
  const [spreadsheetLink, setSpreadsheetLink] = useState("");
  const [promptInput, setPromptInput] = useState("");
  const [embedLink, setEmbedLink] = useState("");
  const [history, setHistory] = useState(() => {
    // Load history from localStorage when the component is first mounted
    const savedHistory = localStorage.getItem("sheetHistory");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  // Save history to localStorage whenever it changes
  useEffect(() => {
    // Make sure we only save to localStorage when history changes
    localStorage.setItem("sheetHistory", JSON.stringify(history));
  }, [history]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (spreadsheetLink.includes("docs.google.com/spreadsheets")) {
      const embedUrl = spreadsheetLink.replace("/edit", "/pubhtml");
      const sheetName = promptInput || `Sheet ${history.length + 1}`;

      setEmbedLink(embedUrl);

      const newHistory = [
        ...history,
        { id: Date.now(), name: sheetName, link: embedUrl },
      ];

      // Update the history state and localStorage
      setHistory(newHistory);

      setSpreadsheetLink("");
      setPromptInput("");
    } else {
      alert("Please enter a valid Google Sheets link.");
    }
  };

  const handleSheetClick = (link) => {
    setEmbedLink(link);
  };

  const handleDelete = (id) => {
    const updatedHistory = history.filter((sheet) => sheet.id !== id);
    setHistory(updatedHistory);
  };

  const handleRename = (id) => {
    const newName = window.prompt("Enter new name for the sheet:");
    if (newName) {
      const updatedHistory = history.map((sheet) =>
        sheet.id === id ? { ...sheet, name: newName } : sheet
      );
      setHistory(updatedHistory);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-4">Sheets History</h2>
        <ul>
          {history.map((sheet) => (
            <li
              key={sheet.id}
              className="p-2 mb-2 bg-gray-100 rounded flex justify-between items-center"
            >
              <span
                className="cursor-pointer flex-grow"
                onClick={() => handleSheetClick(sheet.link)}
              >
                {sheet.name}
              </span>
              <button
                className="text-blue-500 mr-2"
                onClick={() => handleRename(sheet.id)}
              >
                Rename
              </button>
              <button
                className="text-red-500"
                onClick={() => handleDelete(sheet.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-4">Embed a Spreadsheet</h2>
          <div className="mb-4">
            <label htmlFor="spreadsheetLink" className="block font-medium mb-1">
              Spreadsheet Link
            </label>
            <input
              id="spreadsheetLink"
              type="text"
              placeholder="Enter Google Sheets link"
              className="w-full border-gray-300 rounded p-2"
              value={spreadsheetLink}
              onChange={(e) => setSpreadsheetLink(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="promptInput" className="block font-medium mb-1">
              Prompt (Optional - Sheet Name)
            </label>
            <input
              id="promptInput"
              type="text"
              placeholder="Enter a name for the sheet"
              className="w-full border-gray-300 rounded p-2"
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Embed Spreadsheet
          </button>
        </form>

        {embedLink && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Embedded Spreadsheet</h3>
            <iframe
              src={embedLink}
              width="100%"
              height="600px"
              className="border rounded"
              title="Embedded Google Sheet"
            ></iframe>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
