class Cache {
    constructor() {
        this.store = {};
        this.events = {};
    }
    set(key, value, ttl) {
        this.store[key] = value;
        if (ttl) {
            setTimeout(()=>{
                try{
                    delete this.store[key];
                    this.events["expired"] && this.events["expired"](key, value);
                }catch(err){}
            }, ttl*1000)
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

}

module.exports = Cache;