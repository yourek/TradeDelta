const express = require('express');
const blockchainRouter = require('./routers/blockchainRouter');

const app = express();

app.listen(3000);

// app.use((req, res, next) => {
//     res.locals.path = req.path;
//     next();
// });

app.use('/blockchain', blockchainRouter)

// 404 page
app.use((req, res) => {
    res.write('404');
    res.end();
});