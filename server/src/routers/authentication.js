const { Router } = require('express');

const router = Router();

const passport = require('../strategy');

router.get('/discord/', passport.authenticate('discord'));

router.get('/discord/redirect/', passport.authenticate('discord'), (req, res) => {
  req.session.user = req.user;
  res.redirect('/dashboard');
});

router.get('/', async (req, res) => {
  req.user = req.session.user;
  if (!req.user) return res.sendStatus(401);
  res.send({ guilds: req.user.guilds, userId: req.user.userId, discordTag: req.user.discordTag });
});

// eslint-disable-next-line eol-last
module.exports = router;