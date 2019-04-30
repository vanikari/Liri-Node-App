
console.log('this is loaded');
console.log("\n----------\n");

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.omdb = {
  api: process.env.OMDB_API
}