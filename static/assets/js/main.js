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

