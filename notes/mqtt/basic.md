# MQTT

MQTT - Message Queuing Telemetry Transport

It’s a lightweight communication protocol used in IoT.

## Core Idea

There are 3 main parts:

### Publisher (Sender)

- Sends data
- Example: your Pico 2W gas sensor

### Subscriber (Receiver)

- Receives data
- Example: your Django app

### Broker (Middleman)

- Handles messages
- Example: Mosquitto (running on your PC/server)
