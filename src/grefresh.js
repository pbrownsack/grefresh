/*
*   GRefresh v1.0
*   pbrownsack
*   You should be using a secret with your webhooks.
*   Make sure you are running this with the correct user.
*/

var express = require('express');
var crypto = require('crypto');
var path = require('path');
var exec = require('child_process').exec;
var fs = require('fs');
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var config = {};
fs.readFile(path.join(__dirname, '/config.json'), 'utf8', (err, data) => {
    if (err) throw err;
    config = JSON.parse(data);
})

app.post("/", (req, res) => {
    if (!config.secret || !config.path) {
        res.end()
        return
    }

    if (req.header('x-hub-signature')) {
        if (config.branch && req.body.ref) {
            let ourBranch = "refs/heads/" + config.branch
            if (ourBranch != req.body.ref) {
                res.end()
                return
            }
        }

        console.log("[GRefresh] Received GitHub webhook...")

        let gitSig = req.header('x-hub-signature')
        let ourSig = "sha1=" + crypto.createHmac('sha1', config.secret).update(JSON.stringify(req.body)).digest('hex')

        if (gitSig == ourSig) {
            console.log("[GRefresh] Authenticated; updating " + config.path + ".")
            exec('cd ' + config.path + ' && git fetch origin && git pull')

            const result = req.body

            if (result.commits) {
                console.log("[GRefresh] Done! Fetched " + (result.commits.length || 0) + " new commit(s).")
            }
        } else {
            console.log("[GRefresh] Secret does not match! Aborting...")
        }
    } else {
        console.log("[GRefresh] Received unknown POST request from " + req.host)
    }

    res.end()
})

const port = config.port || 8080

app.listen(port, () => {
    console.log("[GRefresh] Running on port " + port + ".")
})

module.exports = app;
