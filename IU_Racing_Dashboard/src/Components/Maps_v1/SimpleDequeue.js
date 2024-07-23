export default class SimpleDeque {
    constructor() {
        this.items = [];
    }

    pushFront(item) {
        this.items.unshift(item);
    }

    pushBack(item) {
        this.items.push(item);
    }

    popFront() {
        return this.items.shift();
    }

    popBack() {
        return this.items.pop();
    }

    front() {
        return this.items[0];
    }

    back() {
        return this.items[this.items.length - 1];
    }

    size() {
        return this.items.length;
    }

    toArray() {
        return [...this.items];
    }

    clone() {
        const newDeque = new SimpleDeque();
        newDeque.items = [...this.items];
        return newDeque;
    }

    equals(dequeue){
        return this.items === dequeue.toArray();
    }

    isEmpty(){
        return this.items.length === 0;
    }

    clear(){
        this.items = [];
    }

}