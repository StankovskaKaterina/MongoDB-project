// repace <small_test_metadata> with your proper collection 
db.small_test_metadata.find({}).forEach(function(doc) {
  try {
    print("Processing document with _id: " + doc._id);
    printjson(doc);

    // Assuming the format is like "[{...}, {...}, ...]"
	// repace <spoken_languages> with the string field which you would like to parse into an array 
    var cleanedLanguages = doc.spoken_languages.replace(/'/g, '"');  // Replace single quotes with double quotes
    var parsedLanguages = JSON.parse(cleanedLanguages);
    
    // Check if it's an array
    if (Array.isArray(parsedLanguages)) {
	// repace <small_test_metadata> with your proper collection 	
      db.small_test_metadata.update(
        { _id: doc._id },
			// repace <spoken_languages> with the string field which you would like to parse into an array 
        { $set: { spoken_languages: parsedLanguages } }
      );
      print("Updated spoken_languages for document with _id: " + doc._id);
      printjson(parsedLanguages);
    } else {
      print("Skipping document with _id: " + doc._id + " - 'spoken_languages' is not an array.");
    }
  } catch (e) {
    print("Error parsing 'spoken_languages' for document with _id: " + doc._id + " - " + e.message);
  }
});
