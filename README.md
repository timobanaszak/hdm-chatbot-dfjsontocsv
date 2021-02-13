# hdm-chatbot-dfjsontocsv
A **very quick and dirty** node.js script, that generates csv files from a Google Dialogflow JSON-Export.

This isn't ready for production use at all, it was simply used to create a csv table. Errors may occur.

## Getting started

1. Run `npm install`
2. Paste the exported json-files into `/intents`. Make sure all pairs exist (example.json with example_usersays_de.json)
3. Remove the two dummy json files (or keep them for testing)
4. Run `node index.js`
5. CSV-File `intentTable.csv` should be generated
6. Import the File into Google Sheets or any other tool (tested with google sheets, worked like charm)
