db.movies_metadata.aggregate([
  {
    $sort: { "vote_count": -1 }
  },
  {
    $limit: 5
  },
  {
    $project: {
      _id: 0, 
      movie: "$title", 
      vote_count: 1
    }
  }
]);
