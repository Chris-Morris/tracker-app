const express = require("express");
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth.js');

const Track = mongoose.model('Track');

const router = express.Router();

router.use(requireAuth);

router.get('/tracks', async (req, res) => {
    const tracks = await Track.find({userId: req.user._id});

    res.status(200).send(tracks);
});
module.exports = router;