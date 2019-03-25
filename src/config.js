module.exports = {
    // Webhook secret from GitHub Webhooks page
    secret: 'your_webhook_secret',

    // Unix filepath to Git repository
    path: '/your/file/path',

    // Git branch you want to keep in sync with
    branch: 'master',

    // Port to run this application on
    port: 8080
};