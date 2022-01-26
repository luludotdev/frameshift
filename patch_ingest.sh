#!/usr/bin/env bash

sed -i 's#https://github.com/meetecho/janus-gateway/archive/${JANUSGATEWAY_VERSION}.tar.gz#https://github.com/danstiner/janus-gateway/tarball/rtp-playout-delay-extension#' ingest/Dockerfile
sed -i "s/option('janus_playout_delay_support', type : 'boolean', value: false)/option('janus_playout_delay_support', type : 'boolean', value: true)/" ingest/meson_options.txt
