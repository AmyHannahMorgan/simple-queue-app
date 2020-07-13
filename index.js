const FS = require('fs').promises;
const EXPRESS = require('express');
const { fstat } = require('fs');
const APP = EXPRESS();
const PORT = process.argv[2] || 3000
let DATA = getOrCreateData(process.argv[3] || './data.json');

APP.use(EXPRESS.static('./static'));

APP.get('/api/getqueue', (req, res) => {
    res.send('this endpoint is not implimented yet');
});

APP.post('/api/addtoqueue', (req, res) => {
    res.send('this endpoint is not implimented yet');
});

APP.delete('/api/removefromqueue', (req, res) => {
    res.send('this endpoint is not implimented yet');
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