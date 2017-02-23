module.exports = function(caches) {
  let result = `${caches.length}\n`;

  for (let i = 0, len = caches.length; i < len; i++) {
    result += [i, ...caches[i].videos].join(' ');
    result += "\n";
  }

  return result;
}
