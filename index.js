const FS = require('fs').promises;
const EXPRESS = require('express');
const { write } = require('fs');
const APP = EXPRESS();
const PORT = process.argv[2] || 3000
const PATH = process.argv[3] || './data.json';
let DATA = getOrCreateData(PATH);

APP.use(EXPRESS.static('./static'));

APP.get('/api/getqueue', (req, res) => {
    res.send(JSON.stringify(DATA));
});

APP.post('/api/addtoqueue', (req, res) => {
    console.log(req.query.number)
    if(parseInt(req.query.number)) {
        DATA.push(parseInt(req.query.number));
        res.status(200).send('Number added to queue');
        writeDataToFile(PATH);
    }
    else {
        res.status(400).send('the supplied paramater is not a number or does not exist');
    }
});

APP.delete('/api/removefromqueue', (req, res) => {
    let number = parseInt(req.query.number)
    if(number) {
        if(DATA.indexOf(number) !== -1) {
            DATA.splice(DATA.indexOf(number), 1);
            res.status(200).send('number was removed successfully');
            writeDataToFile(PATH);
        }
        else {
            res.status(400).send('the supplied number does not exist within the queue');
        }
    }
    else {
        res.status(400).send('the supplied paramater is not a number or does not exist');
    }
});

APP.listen(PORT);

function getOrCreateData(path) {
    FS.open(path, 'r+')
    .then(file => {
        file.readFile({ encoding: 'utf-8' }).then(fileString => {
            return JSON.parse(fileString);
        })
    })
    .catch(err => {
        FS.open(path, 'w+').then(file => {
            FS.writeFile(file, JSON.stringify([])).then(() => {
                file.close();
                return []
            })
        })
    })
}

function writeDataToFile(path) {
    FS.open(path, 'w+')
    .then(file => {
        file.writeFile(JSON.stringify(DATA))
        .then(() => {
            file.close();
        })
    })
}