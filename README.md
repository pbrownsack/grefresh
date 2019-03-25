# GRefresh
### An easy solution for Git synchronization.

Mostly meant for keeping production servers up-to-date without FTP'ing or SSH'ing, this NodeJS app should do the job. Any time you push to the specified branch, the server in which this app resides will immediately cd to that folder and git fetch and git pull. No questions asked. You must have Git correctly configured with authentication setup.

This application will only pull when a change has been made to the specified repository in the config. If you do not wish for this behavior, entirely remove the line named 'branch' in src/config.js.

## Requirements
1. NodeJS runtime and npm installed
https://nodejs.org/en/download/package-manager/
2. A working Git installation
https://git-scm.com/downloads
3. Your Git workspace should already be set up and authenticated with a working remote. This app will not do it for you.
4. In your repository settings, you should go to Webhooks and create one that points to your URL and port. Set the type to application/json and set the secret to whatever you want. Leave everything else default and select 'Create webhook'.
5. Be sure to allow the port you specified through your firewall.

## Configuration
1. Download and place this in a folder that your desired user has permissions on. Open a command line there and run
```
npm install
```
2. Open src/config.js and add your details in there. The comments should explain everything
3. To run GRefresh manually, use
```
npm start
```

## Unix Service
1. If you want an automatic service in *nix, open 'grefresh.service' and replace variables indicated by { } with your information.
2. Place grefresh.service into /lib/systemd/system then run the following commands
```bash
sudo systemctl daemon-reload
sudo systemctl enable grefresh
sudo systemctl start grefresh
```

3. If you want to check the status of GRefresh, you may run
```bash
sudo systemctl status grefresh
```
GRefresh will now run 24/7 and reinitialize upon system restarts. If GRefresh fails, it will also restart itself.