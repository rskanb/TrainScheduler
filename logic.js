var config = {
    apiKey: "AIzaSyDGFTvHcONgdHF4oYo1fl6U8rRrVLT_tbI",
    authDomain: "train-d2681.firebaseapp.com",
    databaseURL: "https://train-d2681.firebaseio.com",
    projectId: "train-d2681",
    storageBucket: "train-d2681.appspot.com",
    messagingSenderId: "831000367893"
  };
  firebase.initializeApp(config);


  var database = firebase.database();

  var trainName = '';
  var trainDest = '';
  var trainTime;
  var trainFreq;

$("#add-train").on("click", function(event){
    event.preventDefault();
    console.log("ran click");
    var trainName = $("#train-name-form").val().trim();
    var trainDest = $("#train-dest-form").val().trim();
    var trainTime = $("#train-time-form").val().trim();
    var trainFreq = $("#train-freq-form").val().trim();

    var newtrain = {
        name: trainName,
        destination: trainDest,
        time: trainTime,
        freq: trainFreq
    };
    console.log(trainName);
    console.log(trainDest);
    console.log(trainTime);
    console.log(trainFreq);
    alert("Train successfully added");
    
    database.ref().push(newtrain);
    trainName = $("#train-name-form").val('');
    trainDest = $("#train-dest-form").val('');
    trainTime = $("#train-time-form").val('');
    trainFreq = $("#train-freq-form").val('');
});

// $("#train-name").text(trainName);
// $("#train-destination").text(trainDest);
// $("#train-frequency")
// $("#arrival-time")
// $("#minute-away")

database.ref().on('child_added', function(childSnapshot){
    console.log(childSnapshot.val());
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFreq = parseInt(childSnapshot.val().freq);

    console.log(trainName);
    console.log(trainDest);
    console.log(trainTime);
    console.log(trainFreq);

    // First Time (pushed back 1 year to make sure it comes before current time)
    var trainTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
    console.log(trainTimeConverted);

    // Difference between the times
    var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var trainRemainder = diffTime % trainFreq;
    console.log(trainRemainder);

    // Minute Until Train
    var tMinutesAway = trainFreq - trainRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesAway);

    // Next Train
    var nextTrainTime = moment().add(tMinutesAway, "minutes");
    var nextTrain = moment(nextTrainTime).format("hh:mm A")
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm A"));

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDest),
        $("<td>").text(trainFreq),
        $("<td>").text(nextTrain),
        $("<td>").text(tMinutesAway)
    );


    $("#train-table").append(newRow);

});
    
    
    