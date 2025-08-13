#!/bin/bash

# Define paths
SERVER_DIR="$HOME/Code/note-tacking-app/backend"
CLIENT_DIR="$HOME/Code/note-tacking-app/frontend"

# Function to start the development environment
start_dev() {
  if [ -z "$TMUX" ]; then
    # Not in a tmux session, create one
    tmux new-session -d -s note-tacking-app
    
    # Split window horizontally
    tmux split-window -h
    
    # Select first pane and start server
    tmux select-pane -t 0
    tmux send-keys "cd $SERVER_DIR && echo 'Starting server...' && npm run dev" C-m
    
    # Select second pane and start client
    tmux select-pane -t 1
    tmux send-keys "cd $CLIENT_DIR && echo 'Starting client...' && npm run dev" C-m
    
    # Attach to the tmux session
    tmux attach-session -t note-tacking-app
  else
    # Already in tmux, just create a new window with splits
    tmux new-window -n "note-tacking-app"
    tmux split-window -h
    
    # Start server in first pane
    tmux select-pane -t 0
    tmux send-keys "cd $SERVER_DIR && echo 'Starting server...' && npm run dev" C-m
    
    # Start client in second pane
    tmux select-pane -t 1
    tmux send-keys "cd $CLIENT_DIR && echo 'Starting client...' && npm run dev" C-m
  fi
}

# Check if tmux is installed
if ! command -v tmux &> /dev/null; then
  echo "tmux is not installed. Please install it first."
  echo "You can install it with: sudo apt-get install tmux"
  exit 1
fi

# Start development environment
start_dev
