// Initialize Firebase
    var config = {
        apiKey: "AIzaSyC1aEaeYxFx8hV_4uIRj3CFTxYoZX73alk",
        authDomain: "traingame-4d492.firebaseapp.com",
        databaseURL: "https://traingame-4d492.firebaseio.com",
        projectId: "traingame-4d492",
        storageBucket: "traingame-4d492.appspot.com",
        messagingSenderId: "82527339865"
      };
      firebase.initializeApp(config);
      
  console.log(firebase);

  var database = firebase.database();

  //  Button for adding Trains
  $("#submit").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var tName = $("#tName").val().trim();
    var destination = $("#destination").val().trim();
    var fTrain = moment($("#fTrain").val().trim(), "HH:mm").format("X");
    var frequency = $("#frequency").val().trim();
  
    var newTrain = {
      tName: tName,
      destination: destination,
      fTrain: fTrain,
      frequency: frequency
    };
  
    
    database.ref().push(newTrain);
  
    // Logs everything to console
  //  console.log(newTrain.tName);
  //   console.log(newTrain.destination);
  //   console.log(newTrain.fTrain); 
  //   console.log(newTrain.frequency);
  
    alert("New Train successfully added");
  
    // Clears-boxes
    $("#tName").val("");
    $("#destination").val("");
    $("#fTrain").val("");
    $("#frequency").val("");
  });
  
  // 3. Create Firebase event for when a user adds an entry
  var traingame = document.getElementById('trainGame');
  var dbRef = firebase.database().ref().child("text");
  dbRef.on('value',snap => traingame.innerText = snap.val());
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Variables.
    var tName = childSnapshot.val().tName;
    var destination = childSnapshot.val().destination;
    var fTrain = childSnapshot.val().fTrain;
    var frequency = childSnapshot.val().frequency;
  
    // TrainsInfo
    console.log(tName);
    console.log(destination);
    console.log(fTrain);
    console.log(frequency);
  
    // math for next arrival
    var timeConversion = moment(fTrain, "HH:mm").subtract(1, "years");
    console.log(timeConversion);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(timeConversion), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime)

    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Calculate the traveling time
    var minsAway = frequency - tRemainder;
    console.log("MINUTES UNTIL NEXT TRAIN: " + minsAway)

     var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    var nextArrival = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
      
  
    // Create the new row
    // var newRow = $("<tr>").append(
    //   $("<td>").text(tName),
    //   $("<td>").text(destination),
    //   $("<td>").text(frequency),
    //   $("<td>").text(nextArrival),
    // );