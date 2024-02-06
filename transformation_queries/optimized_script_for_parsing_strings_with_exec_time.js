// Record the start time
var startTime = new Date();
db.movies_metadata.find({}).forEach(function(doc) {
    try {
        // Assuming the format is like "[{...}, {...}, ...]"
        var cleanedLanguages = doc.spoken_languages.replace(/'/g, '"');  // Replace single quotes with double quotes
        var parsedLanguages = JSON.parse(cleanedLanguages);

        // Check if it's an array
        if (Array.isArray(parsedLanguages)) {
            db.movies_metadata.update(
                { _id: doc._id },
                { $set: { spoken_languages: parsedLanguages } }
            );
        } else {
            // Do nothing or handle the case where 'spoken_languages' is not an array
        }
    } catch (e) {
        // Handle the error or do nothing
    }
});

// Record the end time
var endTime = new Date();

// Calculate and print the execution time
var executionTime = endTime - startTime;
print("Total execution time: " + executionTime + " minutes " +
    "or " + (executionTime/60000).toFixed(2) + " minutes");
