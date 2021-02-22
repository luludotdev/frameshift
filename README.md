# 🚀 Frameshift
> Client and Server implementations of Mixer's FTL Streaming Protocol

## ❓ Usage
Both [client](https://github.com/lolPants/frameshift/packages/617209) and [server](https://github.com/lolPants/frameshift/packages/617214) are available as Docker Images. You are expected to have at least a moderate working knowledge of [Docker](https://docs.docker.com/get-started/overview/) and [Docker Compose](https://docs.docker.com/compose/). A sample Docker Compose file has been provided to help you get started. **Please note that this is just an example, and not intended to be used verbatim.**

## 🎥 Ingest Server
The ingest server used is [Glimesh](https://github.com/Glimesh)'s [Janus FTL Plugin](https://github.com/Glimesh/janus-ftl-plugin). For all documentation please refer to their repo. We only provide automatic Docker builds for convenience sake.

## 🖥️ Web Client
The web client is written in TypeScript using [Next.js](https://github.com/vercel/next.js). To view an active stream, navigate to `/live/[channelID]` on your hosted server.

You can set the ingest server URL using the `FTL_CLIENT_INGEST_SERVER` environment variable on the server or using the `?serverURI=` query param in the browser.
