# Raspberry pi

## Restart a service

`sudo systemctl restart ai-rover.service`

## Stop a service

`sudo systemctl stop ai-rover.service`

## Log a service

`journalctl -u ai-rover.service -f`

## Enable SSH

```bash
sudo raspi-config
```

Navigate to:

```md
Interface Options
    SSH
        Enable
```

Or simply:

```bash
sudo systemctl enable ssh
sudo systemctl start ssh
```

Check:

`systemctl status ssh`
