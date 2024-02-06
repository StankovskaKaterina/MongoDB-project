var highlyRatedMoviesLast5Years = db.movies_metadata.aggregate([
  {
    $match: {
      vote_average: { $gt: 9 },
      release_date: { $gte: new Date("2017-01-01") }
    }
  },
  {
    $group: {
      _id: null,
      totalMovies: { $sum: 1 },
      titles: { $push: "$title" }
    }
  },
  {
    $project: {
      _id: 0,
      totalMovies: 1,
      titles: 1
    }
  }
]);
print("Број на филмови со рејтинг над 9 издадени во последните 5 години и нивните наслови:");
highlyRatedMoviesLast5Years.forEach(function (doc) {
  printjson(doc);
});