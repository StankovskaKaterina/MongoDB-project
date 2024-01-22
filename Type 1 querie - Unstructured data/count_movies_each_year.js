var result = db.movies_metadata.aggregate([
  {
    $match: {
      $and: [
        { release_date: { $type: "date" } },
        { release_date: { $ne: null } }
      ]
    }
  },
  {
    $group: {
      _id: { $year: "$release_date" },
      count: { $sum: 1 }
    }
  },
  {
    $sort: { _id: 1 }
  }
]);

result.forEach(function(doc) {
  printjson(doc);
});