type Handler = (val: any) => any;

class EventBus {
    private handlers: Handler[] = [];
    tag: string = '';

    constructor(tag: string = '') {
        this.tag = tag;
    }

    on(handler: Handler) {
        this.handlers.push(handler);
        return this;
    }

    off(handler: Handler) {
        for (let i = 0; i < this.handlers.length; i++) {
            if (handler === this.handlers[i]) {
                this.handlers.splice(i, 1);
            }
        }
        return this;
    }

    emit(val: any) {
        console.warn(this.tag, this.handlers.length)
        this.handlers.forEach(handle => handle(val));
    }
}

export default EventBus;