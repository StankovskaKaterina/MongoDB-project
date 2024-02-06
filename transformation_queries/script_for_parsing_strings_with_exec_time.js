use your_database_name; // Replace with your actual database name

// Record the start time
var startTime = new Date();

db.small_test_metadata.find({}).forEach(function(doc) {
  try {
    print("Processing document with _id: " + doc._id);
    printjson(doc);

    // Assuming the format is like "[{...}, {...}, ...]"
    var cleanedLanguages = doc.spoken_languages.replace(/'/g, '"');  // Replace single quotes with double quotes
    var parsedLanguages = JSON.parse(cleanedLanguages);
    
    // Check if it's an array
    if (Array.isArray(parsedLanguages)) {
      db.small_test_metadata.update(
        { _id: doc._id },
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

// Record the end time
var endTime = new Date();

// Calculate and print the execution time
var executionTime = endTime - startTime;
print("Total execution time: " + executionTime + " milliseconds");
