const request = require('request');

const BASE_PATH = 'https://blockchain.info/rawaddr/';

const apiGetCall = (req, res) => {
    const wallet = req.params.wallet;
    const limit = req.params.limit;

    let uri = BASE_PATH+wallet+'?limit='+limit

    console.log(wallet);
    console.log(limit)

    console.log('api call')
    request({
        uri: uri,
        json: true
    }, (err, res2, body) => {
        if (err) {
            res.json('404');
        }
    }).pipe(res);
}

module.exports = {
    apiGetCall
}
