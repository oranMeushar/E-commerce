const mongoose = require('mongoose');
const redis = require('redis');
const {promisify} = require('util');

const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);

client.on("error", function (err) {
    console.log("Connection to redis failed please try again to reconnect\n" + err);
});

client.hget = promisify(client.hget);
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function(options = {}){
    this.useCache = true;
    this.topKey = JSON.stringify(options.key || ''); 
    return this;
}

mongoose.Query.prototype.exec = async function(){
    // console.log(this.getQuery());
    // console.log(mongoose.modelNames());
    if (!this.useCache) {
        return  exec.apply(this, arguments);
    }
    const uniqueKey = JSON.stringify(
        Object.assign({}, this.getQuery(), {collection:this.mongooseCollection.name})
    )
    let modelPlural = this.mongooseCollection.name.toCapitalSingular();

    const chacheValue = await client.hget(this.topKey, uniqueKey);

    if (chacheValue) {
        const doc = JSON.parse(chacheValue);
        return Array.isArray(doc)
        ?doc.map((d)=>mongoose.model(modelPlural).hydrate(d))
        :mongoose.model(modelPlural).hydrate(doc)

        //! Another option
        //return Array.isArray(doc)
        //?doc.map((doc) =>new this.model(doc))
        //:new this.model(doc) 
    }

    const result = await exec.apply(this, arguments);
    
    if (typeof result !== 'number') {
        client.hmset(this.topKey, uniqueKey, JSON.stringify(result), 'EX', 10*60);
    }
    return result;
}

const clearCache = (topKey) => {
    client.del(JSON.stringify(topKey));
}

module.exports.clearCache = clearCache;
