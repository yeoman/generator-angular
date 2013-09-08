#!/bin/bash

kill $(ps aux | grep Sauce-Connect.jar | grep -v grep | awk '{ print $2 }') | true