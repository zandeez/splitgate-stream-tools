# Splitgate Stream Tools

A set of tools for streaming Splitgate, written in SvelteKit.

## Features

* OBS Overlay which displays rank separately for each playlist (data from tracker.gg)

## Usage - Source

  git clone https://github.com/zandeez/splitgate-stream-tools.git
  cd splitgate-stream-tools
  npm install
  npm run build
  VITE_TRACKER_PLAYER_ID=<tracker.gg player id> VITE_TRACKER_PLATFORM=<tracker.gg player platform> VITE_TRACKER_API_KEY=<tracker.gg API Key> npm run preview 

Then add a new Browser source in OBS with the address http://localhost:3000/

### Updating

  git pull
  npm installl
  npm run build
  
### Running

  VITE_TRACKER_PLAYER_ID=<tracker.gg player id> VITE_TRACKER_PLATFORM=<tracker.gg player platform> VITE_TRACKER_API_KEY=<tracker.gg API Key> npm run preview
  
## Usage - Docker

  git clone https://github.com/zandeez/splitgate-stream-tools.git
  cd splitgate-stream-tools
  docker build . -t splitgate-stream-tools
  VITE_TRACKER_PLAYER_ID=<tracker.gg player id> VITE_TRACKER_PLATFORM=<tracker.gg player platform> VITE_TRACKER_API_KEY=<tracker.gg API Key> docker run -it -p 3000:3000 --rm  splitgate-stream-tools:latest
