module.exports = {
    httpPort: 8000,
    dbInfo: {
        host: 'localhost',
        db: 'asq'
    },
    logLevel: process.env.LOG_LEVEL?.toLowerCase() || 'debug',
}