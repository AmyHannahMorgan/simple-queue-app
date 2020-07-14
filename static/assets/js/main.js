class QueueItemHandler {
    constructor(elementTemplate, outputElement, queueNumber) {
        this.element = outputElement.appendChild(elementTemplate.cloneNode(true));
        this.number = queueNumber;

        this.element.innerHTML = this.element.innerHTML.replace(/{{queueNumber}}/, this.number);

        this.element.querySelector('.queueRemoveButton').addEventListener('click', () => {
            this.remove();
        })
    }

    remove() {
        this.element.parentNode.removeChild(this.element);
        fetch(`/api/removefromqueue?number=${this.number}`, { method: 'DELETE' });
    }
}

const QUEUE_HOLDER = document.querySelector('#queueHolder');
const QUEUE_ITEM_TEMPLATE = document.querySelector('#queueItemTemplate').content.firstElementChild;
const QUEUE_NUMBER_ENTRY = document.querySelector('#queueAdderNumber')
const QUEUE_NUMBER_SUBMIT = document.querySelector('#queueAdderAddButton');
const QUEUE_ITEM_HANDLERS = [];

fetch('/api/getqueue')
.then(res => res.json())
.then(json => {
    json.forEach(queueItem => {
        QUEUE_ITEM_HANDLERS.push(new QueueItemHandler(QUEUE_ITEM_TEMPLATE, QUEUE_HOLDER, queueItem));
    });
})
.catch(err => console.log(err));

QUEUE_NUMBER_SUBMIT.addEventListener('click', () => {
    let test = /[0-9]{1,}/i;

    if(test.test(QUEUE_NUMBER_ENTRY.value)) {
        fetch(`/api/addtoqueue?number=${QUEUE_NUMBER_ENTRY.value}`, { method: 'POST' })
        .then(res => {
            QUEUE_ITEM_HANDLERS.push(new QueueItemHandler(QUEUE_ITEM_TEMPLATE, QUEUE_HOLDER, QUEUE_NUMBER_ENTRY.value));
            QUEUE_NUMBER_ENTRY.value = '';
        })
    }
    else {
        alert('The entered queue number is not valid');
    }
})

