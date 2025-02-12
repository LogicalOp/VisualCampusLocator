const { Queue } = require("bullmq");
const Redis = require("ioredis");

const connection = new Redis({
    maxRetriesPerRequest: null,
});

const imageQueue = new Queue("image-processing", { connection });

module.exports = imageQueue;