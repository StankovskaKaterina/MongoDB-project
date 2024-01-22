db.movies_metadata.aggregate([
  {
    $match: {
      spoken_languages: { $exists: true, $ne: null }
    }
  },
  {
    $group: {
      _id: "$spoken_languages.name",
      count: { $sum: 1 }
    }
  }
]);
