require('dotenv').config()


module.exports = {
    fmpKey: process.env.FMP_KEY,
    mongoURI: process.env.MONGO_DB_URI,
    dcordHook: process.env.DISCORD_HOOK
}


