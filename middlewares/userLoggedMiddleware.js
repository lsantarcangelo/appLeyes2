const fs = require('fs');
const path = require('path');
const usersPath = path.join(__dirname, '../data/usersData.json');
const usersJson = fs.readFileSync(usersPath, 'utf-8');
const users = (usersJson != "") ? JSON.parse(usersJson) : [];

function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;
    
/*     let userEmail = req.cookies.rememberUser;
    let userCookie;
    if (userEmail) {
        userCookie = users.filter(user => user.email == userEmail);
    }

    if (userCookie) {
        req.session.loggedUser = userCookie;
    } */

    if (req.session.loggedUser) {
        res.locals.isLogged = true;
        res.locals.loggedUser = req.session.loggedUser;
    }

    next();
    
}

module.exports = userLoggedMiddleware;