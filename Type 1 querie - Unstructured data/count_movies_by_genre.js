db.movies_metadata.aggregate([
  {
    $unwind: "$genres"
  },
  {
    $group: {
      _id: "$genres.name",
      count: { $sum: 1 }
    }
  },
  {
    $sort: { count: -1 }
  },
  {
    $replaceRoot: {
      newRoot: {
        Genre: "$_id",
        Count: "$count"
      }
    }
  }
]);
