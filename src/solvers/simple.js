module.exports = function(model) {
  model.demands.sort((a, b) =>
    b.requests_count - a.requests_count
  );

  for (let i = 0; i < model.info.endpoints_count; i++) {
    model.endpoints[i].connections.sort((a, b) =>
      a.latency - b.latency
    );
  }

  const caches = [];

  for (let i = 0; i < model.info.caches_count; i++) {
    caches.push({
      videos: [],
      free: model.info.cache_size
    });
  }

  for (let i = 0, dlen = model.demands.length; i < dlen; i++) {
    const demand = model.demands[i];
    const video_size = model.videos[demand.video_id];
    const endpoint = model.endpoints[demand.endpoint_id];

    for (let j = 0, clen = endpoint.connections.length; j < clen; j++) {
      const connection = endpoint.connections[j];
      if (connection.cache_id === undefined) {
        break;
      }

      const cache = caches[connection.cache_id];
      if (cache.free >= video_size) {
        cache.videos.push(demand.video_id);
        cache.free -= video_size;
        break;
      }
    }
  }

  return caches;
};
