const express = require('express');
const router = express.Router();
const { createProxyMiddleware } = require('http-proxy-middleware');
const {
    RIOT_TOKEN
} = process.env;

const options = {
    target: 'https://kr.api.riotgames.com',
    changeOrigin: true,
    headers: {
        'X-Riot-Token': process.env.RIOT_TOKEN,
    },
    router: req => {
        const { division, region, tierPage } = req.query;
        console.log('diamond router')
        return region ? `https://${region}.api.riotgames.com/lol/league-exp/v4/entries/RANKED_SOLO_5x5/DIAMOND/${division}?page=${tierPage}&${RIOT_TOKEN}` : `https://kr.api.riotgames.com/lol/league-exp/v4/entries/RANKED_SOLO_5x5/DIAMOND/${division}?page=${tierPage}&${RIOT_TOKEN}`;
    }
}

const lolProxy = createProxyMiddleware(options);

router.use('/data', lolProxy);

router.use('/test', () => {
    console.log('DIAMOND ROUTER test');
})


// router.get('/getDiamond', (req, res) => {
//     res.send('getDiamond server');
// })

module.exports = router;