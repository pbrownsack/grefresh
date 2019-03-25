# GRefresh
### An easy solution for Git synchronization.

## Requirements
1. NodeJS runtime and npm installed
2. A working Git installation
3. Your Git workspace should already be set up and authenticated with a working remote. This app will not do it for you.

## Configuration
1. Open src/config.js and add your details in there. The comments should explain everything
2. If you want an automatic service in *nix, open 'grefresh.service' and replace variables indicated by { } with your information.
3. Place grefresh.service into /lib/systemd/system then run the following commands
```bash
sudo systemctl daemon-reload
sudo systemctl enable grefresh
sudo systemctl start grefresh
```

4. If you want to check the status of GRefresh, you may run
```bash
sudo systemctl status grefresh
```