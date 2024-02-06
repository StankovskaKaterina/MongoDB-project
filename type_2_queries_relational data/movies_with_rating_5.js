var result = db.ratings_small.aggregate([
  {
    $match: { rating: 5 }
  },
  {
    $group: {
      _id: "$movieId",
      count: { $sum: 1 }
    }
  },
  {
    $lookup: {
      from: "movies_metadata", 
      localField: "_id",
      foreignField: "id",
      as: "movie_info"
    }
  },
  {
    $unwind: "$movie_info"
  },
  {
    $project: {
      _id: 0,
      title: "$movie_info.title",
      count: 1
    }
  }
]).toArray();

var movieTitles = result.map(item => item.title);
var totalCount = result.reduce((acc, item) => acc + item.count, 0);

printjson({
  ["Movies with rating 5"]: totalCount,
  ["Movies"]: movieTitles
});
