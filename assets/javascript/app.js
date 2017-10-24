// giphy javascript


// global variables
var topics = ["cow", "sheep", "moose", "bear"];
var result = [];


// functions

//this function adds the buttons to the dom
function renderButtons() {
  console.log("im in renderButtons");
  console.log("topics.length" + topics.length);
  $("#animal-view").empty();

  for (let i = 0; i < topics.length; i++) {
    console.log("im in the for loop");
    // Then dynamicaly generating buttons for each movie in the array.
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    let newButton = $("<button>");
    // let animal = topics[i];
    // Adding a class
    newButton.addClass("animal");
    // Adding a data-attribute with a value of the movie at index i
    newButton.attr("data-name", topics[i]);
    // Providing the button's text with a value of the movie at index i
    newButton.attr("value", topics[i]);
    newButton.text(topics[i]);
    // Adding the button to the HTML
    $("#animal-view").append(newButton);
    $("#animal-input").val("");
  }
}

// This function handles events where one button is clicked
$("#add-animal").on("click", function (event) {
  // event.preventDefault() prevents the form from trying to submit itself.
  // We're using a form so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();

  // This line will grab the text from the input box
  var animal = $("#animal-input").val().trim();
  // The movie from the textbox is then added to our array
  topics.push(animal);

  // calling renderButtons which handles the processing of our movie array
  renderButtons();
});



function queryGiphy(animalName) {
  console.log("i clicked an animal-view button");
  console.log("this " + this);
  // var animalQuery = $(".animal").data("name");
  // var animalQuery = "";
  // animalQuery = topics[$(this).attr("data-index")];
  var limit = 5;

  console.log("animalQuery " + animalName);
  var apiKey = "2fLgdLgXeV1kUnyRwYKej42K3Dtjue87";
  // var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=cats";

  var queryURL = "https://api.giphy.com/v1/gifs/search";
  queryURL += '?' + $.param({
    'api_key': apiKey,
    'q': animalName,
    // 'tag': animal,
    'limit': limit
  });

  console.log(queryURL);

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).done(function (response) {
    result = response.data;
    console.log(result[0]);
    console.log(result.length);

  console.log(result[0]);
  console.log("RESULT.LENGTH " + result.length);

  for (var i = 0; i < result.length; i++) {
    var gifURL = result[i].images.fixed_height.url;
    var rating1 = result[i].rating;
    console.log("GIFURL " + gifURL);
    console.log("RATING " + rating1);
    var gifDiv = $("<div>");
    var img1 = $("<img id=gifUrl>");
    img1.attr("src", gifURL);
    var p1 = $("<p>");
    p1.text("Rating: " + rating1);
    gifDiv.append(img1);
    gifDiv.append(p1);

    console.log(gifDiv);

    $("#gifReturnDiv").prepend(gifDiv);


  }
});
}
// main proecss
$(document).ready(function () {

  renderButtons();


  $(".animal").on("click", function () {
    var animalQuery = $(this).attr("data-name");
    console.log("i clicked the .animal button");
    queryGiphy(animalQuery);
  });


});