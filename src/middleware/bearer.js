'use strict';

const { users } = require('../models/index');

// TODO: If this could return 401 on failure that would be great
module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      authError();
    }

    const token = req.headers.authorization.split(' ').pop();
    const validUser = await users.authenticateToken(token);
    req.user = validUser;
    req.token = validUser.token;
    next();
  } catch (e) {
    authError();
  }

  function authError() {
    next('Invalid Login for Bearer');
  }
};
