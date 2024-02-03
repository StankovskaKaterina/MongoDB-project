var longestMovies = db.movies_metadata.find().sort({ "runtime": -1 }).limit(5);

print("Најдолги филмови:");
longestMovies.forEach(function (doc) {
  print("Наслов: " + doc.title + ", Времетраење: " + doc.runtime);
});