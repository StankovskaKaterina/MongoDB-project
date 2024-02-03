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
    $limit: 1
  },
  {
    $project: {
      _id: 0,
      result: {
        $concat: [
          "The most popular genre is ",
          "$_id",
          "."
        ]
      }
    }
  }
]);
