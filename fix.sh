#!/bin/bash

# Run yarn build
yarn build
if [ $? -ne 0 ]; then
  echo "Build failed. Press any key to exit."
  read
  exit 1
fi

# Run yarn lint:fix
yarn lint:fix
if [ $? -ne 0 ]; then
  echo "Linting fix failed. Exiting."
fi

# Run yarn format:fix
yarn format:fix
if [ $? -ne 0 ]; then
  echo "Formatting fix failed. Exiting."
fi

echo "All tasks completed successfully."
