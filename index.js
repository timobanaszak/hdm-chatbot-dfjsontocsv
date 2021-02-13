const fs = require('fs');
const intentFolder = './intents/';

let csv = [];

let pairFiles = { data: [] };

/**
 * Build object with pairs
 */
let i = 1;
fs.readdirSync(intentFolder).forEach(file => {
  if (!file.includes('usersays')) {
    pairFiles.data.push([file.replace('.json', '') + '_usersays_de.json', file])
  }
  i++;
})

/**
 * iterate over each pair to build a csv row
 */
pairFiles.data.map((p) => {
  let row = []; // name, questions, answers
  let rowQuestions = '';
  let rowAnswers = '';
  let rowName = ''

  p.map((file) => {
    let jsonFile = JSON.parse(fs.readFileSync(intentFolder + file)); // read the file
    
    // get the questions
    if (file.includes('usersays')) {
      jsonFile.map((f) => {
        questions = f.data;
        questions.map((q) => {
          rowQuestions += q.text + '\n';
        })
      })
    } else { // get the name and answers
      jsonFile.responses.map((f) => {
        rowName = jsonFile.name
        f.messages.map((m) => {
          m.speech.map((t) => {
            rowAnswers += t + '\n';
          })
        })
      })
    }

    row.name = '"' + rowName + '"'
    row.question = '"' + rowQuestions + '"'
    row.answer = '"' + rowAnswers + '"'

  })
  csv.push(row);
})

/**
 * Create structure for final csv file
 */
let csvString = 'name,questions,answers\n';
csv.map((r) => {
  csvString += r.name + ',' + r.question + ',' + r.answer + '\n';
})

//create the file
fs.writeFile('intentTable.csv', (csvString), function(err) {
  console.log('CSV-File "intentTable.csv" successfully generated. Have fun :--)')
});
