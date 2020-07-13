const FS = require('fs').promises;
const EXPRESS = require('express');
const APP = EXPRESS();
const PORT = process.argv[2] || 3000
let DATA = getOrCreateData(process.argv[3] || './data.json');

APP.use(EXPRESS.static('./static'));

APP.get('/api/getqueue', (req, res) => {
    res.send(JSON.stringify(DATA));
});

APP.post('/api/addtoqueue', (req, res) => {
    if(parseInt(req.params.number)) {
        DATA.push(parseInt(req.params.number));
        res.status(200).send('Number added to queue');
        //add write to file here
    }
    else {
        res.status(400).send('the supplied paramater is not a number or does not exist');
    }
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