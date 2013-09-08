#!/bin/bash


# Wait for Connect to be ready before exiting
while [ ! -f .sauce-connect/sauce-connect-ready ]; do
  sleep .5
done
