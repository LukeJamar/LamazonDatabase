// Middleware for JWT authentication
// include express
const express = require('express');
const app = express();

// JWT inclusions
const jwt = require('jsonwebtoken');
const accessTokenSecret = 'TheviousRacoonus';

module.exports = app.use( async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            // Concat the string and grab the header key
            const jwtToken = authHeader.split(' ')[1];
            const user = jwt.verify(jwtToken, accessTokenSecret);

            req.user = user;
            next();
        } else {
            res.send(403);
        }
    } catch(err) {
        res.send(403);    // Failed to authenticate
    } 
})