#!/bin/sh
chown -R node:node /app/node_modules || true
exec "$@"
