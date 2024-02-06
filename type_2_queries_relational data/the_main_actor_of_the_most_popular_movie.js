var theMostPopularMovies = db.movies_metadata.find({ popularity: { $type: "number" } }).sort({ popularity: -1 }).limit(1).toArray();
var theMostPopularMovieIds = theMostPopularMovies.map(movie => movie.id);

var creditsForTheMostPopularMovies = db.credits.find({ 'id': { $in: theMostPopularMovieIds } }).toArray();

theMostPopularMovies.forEach(movie => {
  var correspondingCredit = creditsForTheMostPopularMovies.find(credit => credit.id === movie.id);

  if (correspondingCredit && correspondingCredit.cast) {
    try {
      var cleanedCast = correspondingCredit.cast.replace(/None/g, 'null');
      var castArray = JSON.parse(cleanedCast.replace(/'/g, '"'));
      var firstNameOfFirstCast = castArray[0] ? castArray[0].name : '';
      print(`The most popular movie is: ${movie.title}`);
      print(`First name of the cast: ${firstNameOfFirstCast}`);
    } catch (error) {
      console.error('Error parsing JSON in cleaned cast field:', error.message);
    }
  }
});