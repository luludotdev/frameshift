# 🚀 Frameshift
> Ingest and Viewing stack for deploying Mixer's FTL streaming protocol.

## 🌠 Why?
The Frameshift stack is designed for low-latency streaming for small scale systems. An example of this would be aggregating multiple remote camera perspectives in broadcasting software such as OBS to be restreamed out to the public. This allows for near-realtime multi-camera setups running over a local network, or even via the internet.

By using Mixer's FTL protocol for ingest and WebRTC for display, we can achieve sub-second latency on good connections, allowing for maximum interactivity on your broadcasts.

## ❓ Usage
The Frameshift stack is deployed using [Docker](https://docs.docker.com/get-started/overview/), as such you are expected to have a good working knowledge of both Docker and [Docker Compose](https://docs.docker.com/compose/). It can also be deployed using [Kubernetes](https://k8s.io), but no samples are provided for that.

Both [web client](https://github.com/lolPants/frameshift/packages/633173) and [ingest server](https://github.com/lolPants/frameshift/packages/633178) are available as Docker Images. A sample [Docker Compose file](https://github.com/lolPants/frameshift/blob/master/docker-compose.yml) has been provided to help you get started. **Please note that this is just an example, and not intended to be used verbatim.**

You are expected to reverse proxy both the ingest server and the web client to the same hostname. A sample [Caddyfile](https://github.com/lolPants/frameshift/blob/master/Caddyfile) has been provided to show what needs proxying and where. **Note that Caddy is not required, just recommended. You are free to use any HTTP reverse proxy instead.** In addition to this, you will need to open the required ports that aren't being proxied via HTTP, as these are used for ingest and playback.

## 🎥 Ingest Server
The ingest server is Glimesh's [Janus FTL Plugin](https://github.com/Glimesh/janus-ftl-plugin). Automatic Docker builds are provided for convenience sake. It must be configured to operate using the REST Service Connection mode, see the sample Compose file for the required environment variables.

For an explanation of what each environment variable does and their accepted values, please refer to their repo.

## 🖥️ Web Client
The web client is written in TypeScript using [Next.js](https://github.com/vercel/next.js). It serves a dual purpose as both a web-based stream player, as well as a backend for the ingest server.

### Viewing Streams
To view an active stream, navigate to `/live/[channelID]` on your hosted server.

You can set the ingest server URL using the `FTL_CLIENT_INGEST_SERVER` environment variable on the server or using the `?serverURI=` query param in the browser.

### Ingest Backend
The ingest server is configured to communicate via an HTTP REST API to coordinate incoming streams and handle authentication etc. The web client serves this, and can be configured via environment variables. Again, refer to the sample Compose file for a list of variables and their uses.

## 📡 Streaming to a Frameshift Instance
See the dedicated [docs page](https://github.com/lolPants/frameshift/blob/master/STREAMING.md).

## 🤔 What's with the name?
The [Frame-Shift Drive](https://elite-dangerous.fandom.com/wiki/Frame_Shift_Drive) is a fictional device from the [Elite Dangerous](https://www.elitedangerous.com/) universe which propels ships to faster-than-light speeds. I also think the name just sounds cool and fits with the theme of the project.
