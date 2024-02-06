// Find top 10 movies by popularity
var topPopularityMovies = db.movies_metadata.find({ popularity: { $type: "number" } }).sort({ popularity: -1 }).limit(10).toArray();

// Aggregate top 10 movies by profit
var topProfitMovies = db.movies_metadata.aggregate([
  {
    $match: {
      budget: { $exists: true, $ne: null },
      revenue: { $exists: true, $ne: null }
    }
  },
  {
    $addFields: {
      profit: { $subtract: ["$revenue", "$budget"] }
    }
  },
  {
    $sort: {
      profit: -1
    }
  },
  {
    $limit: 10
  }
]).toArray();

// Find common movies based on the 'title' field
var commonMovies = topPopularityMovies.filter(popularityMovie =>
  topProfitMovies.some(profitMovie => profitMovie.title === popularityMovie.title)
);

// Print the common movies
printjson(commonMovies);