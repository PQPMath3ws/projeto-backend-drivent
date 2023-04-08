#!/bin/bash

# CREATE THE .env FILE BEFORE STARTS THE CONTAINER

DEVCONTAINER_STARTED="SUCCESSFULLY_STARTED"
if [ ! -e /workspace/$DEVCONTAINER_STARTED ]; then
    touch /workspace/$DEVCONTAINER_STARTED
    cd /workspace
    npm install
    npm run migration:run
    npm run dev:seed
    npm run test:migration:run
    npm run dev:migration:run
fi