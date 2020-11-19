const cron = require('node-cron')
const {dailyIndexesRec} = require('../scripts/indexes')
const {postDiscord} = require('../services/discord')

function setUpCron(){
  console.log('cron running')

  // @sch: Daily Sun - Sat 5:30am EST 10am UST;
  // @desc: 
  cron.schedule('30 10 * * *', async () => {
    try {
      const res = await dailyIndexesRec()
      postDiscord({text: res})
    } catch (error) {
      postDiscord({ text: `Error on daily indexes route: ${error}` });
    }
  });
}

module.exports = setUpCron
