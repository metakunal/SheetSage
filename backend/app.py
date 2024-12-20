from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/extract-id', methods=['POST'])
def extract_id():
    try:
        data = request.json
        sheet_url = data.get('url')
        
        # Ensure a URL is provided
        if not sheet_url:
            return jsonify({'error': 'URL not provided'}), 400

        # Extract the spreadsheet ID
        if "docs.google.com/spreadsheets" in sheet_url:
            parts = sheet_url.split("/")
            if len(parts) > 5:
                spreadsheet_id = parts[5]
                return jsonify({'spreadsheet_id': spreadsheet_id}), 200
            else:
                return jsonify({'error': 'Invalid URL format'}), 400
        else:
            return jsonify({'error': 'Not a valid Google Sheets URL'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
