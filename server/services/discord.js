const axios = require('axios')
const {dcordHook} = require('../config/creds')

// leasing bot hook
const hook = dcordHook;

const postDiscord = (record) => {
    const postBody = {content: record.text};
    axios({
      url: `https://discord.com/api/webhooks/${hook}`,
      method: 'post',
      data: postBody,
    });
}

module.exports = {postDiscord}


