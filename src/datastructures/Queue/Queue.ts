
class Queue {
    head: any;
    tail: any;

    constructor() {
        this.head = null;
        this.tail = null;
    }

    isEmpty() {
        if(this.head) {
            return false;
        }
        return true;
    }

    //returns head
    getHead() {
        if(this.head) {
            return this.head;
        } else {
            console.log("underflow");
        }
    }

    //put element at end of queue
    enqueue(x: any) {
        const element = {
            key: x,
            next: null,
            prev: this.tail
        }

        if(this.head === null) {
            this.head = element;
        }

        if(this.tail) {
            this.tail.next = element
        }
        this.tail = element;
    }

    //returns head and deletes it
    dequeue() {
        if(this.head) {
            const x = this.head;
            //queue has more than one element
            if(this.head.next) {
                this.head.next.prev = null;
            }

            this.head = this.head.next;

            return x;
        } else {
            console.log("underflow");
        }
    }
}


export default Queue; 