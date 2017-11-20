class Cache {
    constructor() {
        this.store = {};
        this.events = {};
    }
    set(key, value, ttl) {
        this.store[key] = value;
        if (ttl) {
            Cache.timerCheck(() => {
                this.events["expires"] && this.events["expires"](key, value);
                delete this.store[key];
            }, ttl);
        }
    }
    get(key) {
        return this.store[key];
    }
    del(key, cb) {
        let value = undefined;
        if (this.store[key]) {
            value = this.store[key];
            delete this.store[key];
        }
        return value;
    }
    on(eventType, handler) {
        this.events[eventType] = handler;
    }
    static timerCheck(cb, ttl) {
        let promise = Promise.resolve(true);
        return promise.then(() => {
            let start = Date.now();
            let end = Date.now() - start;
            while (end < ttl) {
                end = Date.now() - start;
            }
            if (end >= ttl) {
                cb();
            }
        });
    }
}

module.exports = Cache;