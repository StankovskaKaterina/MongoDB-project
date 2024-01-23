const result = db.movies_metadata.find({
  popularity: {
    $type: "number"
  }
}).sort({
  popularity: -1
}).limit(1).next();

const mostPopularGenre = result ? result.genres : null;
print(mostPopularGenre);
