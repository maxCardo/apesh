const cron = require('node-cron')
const {dailyIndexesRec, dailyIdxRec} = require('../scripts/indexes')
const {topGainers, topLosers} = require('../scripts/search')
const {firstScan, shortScan} = require('../scripts/scan')
const {postDiscord} = require('../services/discord')

function setUpCron(){
  console.log('cron running')

  // @sch: Daily Sun - Sat 5:30am EST 10am UST;
  // @desc: 
  cron.schedule('35 12 * * 1-5', async () => {
    try {
      const res = await dailyIndexesRec()
      postDiscord({text: res})
    } catch (error) {
      postDiscord({ text: `Error on daily indexes route: ${error}` });
    }

    try {
      const res = await dailyIdxRec()
      postDiscord({ text: res })
    } catch (error) {
      postDiscord({ text: `Error on daily indexes route: ${error}` });
    }
  });

  // @sch: Daily Sun - Sat 4:10pm EST 10am UST;
  // @desc: run first scan on 200 top loosers after market close
  cron.schedule('13 12 * * 1-5', async () => {
    try {
      const losers = await topLosers()

      try {
        const scan = await firstScan(losers)
        postDiscord({ text: `First scan ran on losers ${scan.length} records added` });  
      } catch (error) {
        postDiscord({ text: `Error on daily first scan losers route: ${error}` });
      }

    } catch (error) {
      postDiscord({ text: `Error aquiring gainers/losers: ${error}` });
    }

  });

  // @sch: Daily Sun - Sat 4:20pm EST 10am UST;
  // @desc: run first scan on gainers at market close
  cron.schedule('20 12 * * 1-5', async () => {
    try {
      const gainers = await topGainers()

      try {
        const scan = await firstScan(gainers)
        postDiscord({ text: `First scan ran on gainers ${scan.length} records added` });
      } catch (error) {
        postDiscord({ text: `Error on daily first scan gainers route: ${error}` });
      }

    } catch (error) {
      postDiscord({ text: `Error aquiring gainers/losers: ${error}` });
    }

  });

  // @sch: Daily Sun - Sat 4:20pm EST 10am UST;
  // @desc: run short scan on market losers after market close
  cron.schedule('30 12 * * 1-5', async () => {
    try {
      const losers = await topLosers()
    
      try {
        const scan = await shortScan(losers)
        postDiscord({ text: `Short scan ran on losers ${scan.length} records added` });
      } catch (error) {
        postDiscord({ text: `Error on daily first scan losers route: ${error}` });
      }

    } catch (error) {
      postDiscord({ text: `Error aquiring gainers/losers: ${error}` });
    }

  });

  // @sch: Daily Sun - Sat 4:20pm EST 10am UST;
  // @desc: run short scan on market gainers after market close
  cron.schedule('25 12 * * 1-5', async () => {
    try {
      const gainers = await topGainers()

      try {
        const scan = await shortScan(gainers)
        postDiscord({ text: `Short scan ran on gainers ${scan.length} records added` });
      } catch (error) {
        postDiscord({ text: `Error on daily first scan gainers route: ${error}` });
      }

    } catch (error) {
      postDiscord({ text: `Error aquiring gainers/losers: ${error}` });
    }

  });

}




module.exports = setUpCron
