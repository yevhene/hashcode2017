const fs = require('fs');

module.exports = function(path) {
  const file = fs.readFileSync(path).toString();
  const lines = file.split('\n');
  const model = {};

  let index = 0;

  // init
  let line = lines[index++];
  const [
    videos_count, endpoints_count, demands_count,
    caches_count, cache_size
  ] = numbers(line);

  model.info = {
    videos_count, endpoints_count, demands_count,
    caches_count, cache_size
  }

  // videos
  line = lines[index++];
  model.videos = numbers(line);

  // endpoints
  model.endpoints = [];
  for (let i = 0; i < model.info.endpoints_count; i++) {
    line = lines[index++];
    const [datacenter_latency, endpoint_caches_count] = numbers(line);
    const endpoint = {
      connections: [{
        latency: datacenter_latency
      }]
    };

    for (let j = 0; j < endpoint_caches_count; j++) {
      line = lines[index++];
      const [cache_id, latency] = numbers(line);
      endpoint.connections.push({ cache_id, latency });
    }

    model.endpoints.push(endpoint);
  }

  // demands
  model.demands = [];
  for (let i = 0; i < model.info.demands_count; i++) {
    line = lines[index++];
    const [video_id, endpoint_id, requests_count] = numbers(line);
    model.demands.push({ video_id, endpoint_id, requests_count });
  }

  return model;
};

function numbers(line) {
  return line.match(/\d+/g).map((size) => parseInt(size, 10));
}
