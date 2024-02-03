db.movies_metadata.aggregate([
  {
    $group: {
      _id: "$status",
      count: { $sum: 1 }
    }
  },
  {
    $replaceRoot: {
      newRoot: {
        Status: "$_id",
        Count: "$count"
      }
    }
  }
])