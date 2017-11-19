# simple-cache
Caches data locally
This is a very naive solution, just a showcase how things could be implemented

## usage:-
```
const Cache = require("simple-cache");
let localCache = new Cache();

localCache.set(key, value, [TTL in ms]); //set value
localCache.set(key, value, 3000); //set value and expires on specified TTL
localCache.get(key); //get the value
localCache.del(key); //delete the value, returns deleted value
localCache.on("expires", (key, value)=>{
    //when key expires, this event will get called
});
```



