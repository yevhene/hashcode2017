module.exports = function(model) {
  const caches = [];

  for (let i = 0; i < model.info.caches_count; i++) {
    const cache = { videos: [], free: model.info.cache_size };

    const ratings = [];

    for (let j = 0; j < model.info.videos_count; j++) {
      ratings.push({ video_id: j, rating: rateVideo(j, i, model) });
      if (j % 100 === 0) {
        console.log(`video: ${j}/${model.info.videos_count}`);
      }
    }

    ratings.sort((a, b) => b.rating - a.rating);

    for (let j = 0, len = ratings.length; j < len; j++) {
      const rating = ratings[j];
      const video_size = model.videos[rating.video_id];
      if (video_size <= cache.free) {
        cache.videos.push(rating.video_id);
        cache.free -= video_size;
      }
    }

    console.log(`cache: ${i}/${model.info.caches_count}`);
    caches.push(cache);
  }

  return caches;
};

function rateVideo(video_id, cache_id, model) {
  const videoSize = model.videos[video_id];
  let score = 0;

  const demands = model.demands.filter((d) => d.video_id === video_id);
  for (let i = 0, dlen = demands.length; i < dlen; i++) {
    const demand = model.demands[i];
    const endpoint = model.endpoints[demand.endpoint_id];
    const connection = endpoint.connections.find((c) =>
      c.cache_id === cache_id
    );

    if (connection) {
      score += demand.requests_count / connection.latency;
    }
  }

  return score / videoSize;
}
