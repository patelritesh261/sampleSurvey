import express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', (req: express.Request, res: express.Response, next: any) => {
    res.render('index', { 
        title: 'Home', 
        displayName: req.user ? req.user.displayName : '' });
});

module.exports = router;
