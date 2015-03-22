#!/bin/bash

export PATH="$PATH:/home/ubuntu/.rvm/bin"
. "/home/ubuntu/.rvm/scripts/rvm"

start_roar() {
    echo "Starting ROAR."
    cd /home/mockathon/roar
    bundle install
    rails s -b 0.0.0.0 -p 4000 -d
}

stop_roar() {
    echo "Stopping ROAR."
    killall ruby
}

case "$1" in
  start)
    start_roar
    ;;
  stop)
    stop_roar
    ;;
  restart)
    echo "Restarting ROAR."
    stop_roar
    start_roar
    ;;
  *)
    echo "Usage: $0 { start | stop }"
    ;;
esac

exit 0
