#!/usr/bin/env node

/* user auth middleware module */

const { JWT_SECRET_KEY } = require('../config/secrets.config');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

const tokenExtractor = (req, resp, next) => {
  try {
    const auth = req.get('authorization').replace('Bearer ', '');
    req.auth = auth;
    return next();
  } catch (error) {
    if (error instanceof TypeError) {
      return resp.status(403).json({ error: 'missing authorization' });
    }
  }
};

const userExtractor = async (req, resp, next) => {
  try {
    const decodedToken = jwt.verify(req.auth, JWT_SECRET_KEY);
    const user = await User.findById(decodedToken.userId);
    if (user) {
      req.user = user;
      return next();
    }
    return resp.status(403).json({ error: 'not logged in' });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return resp
        .status(401)
        .json({ error: 'invalid token, login and try again' });
    }
  }
};

module.exports = {
  tokenExtractor,
  userExtractor
};
