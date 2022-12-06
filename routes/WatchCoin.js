const express = require('express');
const router = express.Router();
const FetchUser = require('../MiddleWare/FetchUser');
const WatchCoin = require('../models/WatchCoin');



router.get('/fetchallCoins', FetchUser, async (req, res) => {

    try {
        const coins = await WatchCoin.find({ user: req.user.id });

        res.json(coins);

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" })
    }

})



router.post('/addCoins', FetchUser, async (req, res) => {

    try {
        const { coinName } = req.body;

        const coins = new WatchCoin({
            coinName, user: req.user.id 
        })

        const saveCoin = await coins.save();

        res.json(saveCoin);


    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" })
    }
})




router.delete('/deleteCoins/:id', FetchUser, async (req, res) => {

    try {
        
        let coin = await WatchCoin.findById(req.params.id);

        if (!coin) {
            return res.status(404).json({error:"coin Not Found"})
        }
        //Allow delete only if user own this
        if (coin.user.toString() !== req.user.id) {
            return res.status(401).json({error:"not allowed to delete"});
        }

        coin = await WatchCoin.findByIdAndDelete(req.params.id)
        res.json({ "success": " coin is deleted from watchlist", coin: coin });

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" })
    }

})


module.exports = router