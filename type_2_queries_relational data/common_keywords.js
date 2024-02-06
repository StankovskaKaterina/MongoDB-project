var top10Movies = db.movies_metadata.find({ popularity: { $type: "number" } }).sort({ popularity: -1 }).limit(10).toArray();

var top10MovieIds = top10Movies.map(movie => movie.id);

var keywordsForTop10Movies = db.keywords.find({ 'id': { $in: top10MovieIds } }).toArray();

var extractedKeywords = keywordsForTop10Movies.map(keyword => {
  // Parse the 'keywords' field as JSON
  var keywordsArray = JSON.parse(keyword.keywords.replace(/'/g, '"'));

  // Extract the 'name' property from each keyword object
  return keywordsArray.map(k => k.name);
});

printjson(extractedKeywords);