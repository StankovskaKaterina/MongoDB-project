db.movies_metadata.aggregate([
  {
    $match: {
      spoken_languages: { $exists: true, $ne: null }
    }
  },
  {
    $unwind: "$spoken_languages"
  },
  {
    $group: {
      _id: "$spoken_languages.name",
      count: { $sum: 1 }
    }
  },
  {
    $sort: {
      count: -1
    }
  }
]);