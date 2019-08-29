type Handler = (val: any) => any;

class EventBus {
    private handlers: Handler[] = [];

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
        this.handlers.forEach(handle => handle(val));
    }
}

export default EventBus;