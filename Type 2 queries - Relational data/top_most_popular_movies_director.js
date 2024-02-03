var theMostPopularMovies = db.movies_metadata.find({ popularity: { $type: "number" } }).sort({ popularity: -1 }).limit(1).toArray();
var theMostPopularMovieIds = theMostPopularMovies.map(movie => movie.id);

var creditsForTheMostPopularMovies = db.credits.find({ 'id': { $in: theMostPopularMovieIds } }).toArray();
var extractedDirectors = [];

theMostPopularMovies.forEach(movie => {
  var correspondingCredit = creditsForTheMostPopularMovies.find(credit => credit.id === movie.id);

  if (correspondingCredit && correspondingCredit.crew) {
    try {
      var cleanedCrew = correspondingCredit.crew.replace(/None/g, 'null');

      var crewArray = JSON.parse(cleanedCrew.replace(/'/g, '"'));

      var directors = crewArray.filter(person => person.job === 'Director');

      extractedDirectors = directors.map(director => director.name);

      print(`The most popular movie is: ${movie.title}`);
      print(`Directors: ${extractedDirectors.join(', ')}`);
    } catch (error) {
      console.error('Error parsing JSON in cleaned crew field:', error.message);
    }
  }
});
