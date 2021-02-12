const cron = require('node-cron')
const {dailyIndexesRec, dailyIdxRec} = require('../scripts/indexes')
const {topGainers, topLosers} = require('../scripts/search')
const {firstScan, shortScan} = require('../scripts/scan')
const {marketDailyUpdate} = require('../scripts/company')
const {postDiscord} = require('../services/discord')

function setUpCron(){
  console.log('cron running')
  
  // @sch: Daily Sun - Sat 4:00am EST;
  // @desc: daily updates for company data
  cron.schedule('00 9 * * 1-5', async () => {
    try {
      marketDailyUpdate()
      postDiscord({ text: `running market daily updates` });

    } catch (error) {
      postDiscord({ text: `Error on daily updates: ${error}` });
    }

  });

  // @sch: Daily Mon - Fri 5:00am;
  // @desc: Update Daily Indexes
  cron.schedule('40 21 * * 1-5', async () => {
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
  cron.schedule('10 21 * * 1-5', async () => {
    try {
      const losers = await topLosers()

      try {
        const scan = await firstScan(losers, {name: 'first_losers', upside: .6})
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
  cron.schedule('20 21 * * 1-5', async () => {
    try {
      const gainers = await topGainers()

      try {
        const scan = await firstScan(gainers, { name: 'first_gainers', upside: .6 })
        postDiscord({ text: `First scan ran on gainers ${scan.length} records added` });
      } catch (error) {
        postDiscord({ text: `Error on daily first scan gainers route: ${error}` });
      }

    } catch (error) {
      postDiscord({ text: `Error aquiring gainers/losers: ${error}` });
    }

  });

  // @sch: Daily Sun - Sat 4:30pm EST 10am UST;
  // @desc: run short scan on market losers after market close
  cron.schedule('30 21 * * 1-5', async () => {
    try {
      const losers = await topLosers()
    
      try {
        const scan = await shortScan(losers, { name: 'short_losers', upside: .6 })
        postDiscord({ text: `Short scan ran on losers ${scan.length} records added` });
      } catch (error) {
        postDiscord({ text: `Error on daily first scan losers route: ${error}` });
      }

    } catch (error) {
      postDiscord({ text: `Error aquiring gainers/losers: ${error}` });
    }

  });

  // @sch: Daily Sun - Sat 4:25pm EST 10am UST;
  // @desc: run short scan on market gainers after market close
  cron.schedule('25 21 * * 1-5', async () => {
    try {
      const gainers = await topGainers()

      try {
        const scan = await shortScan(gainers, { name: 'short_gainers', upside: .6 })
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
