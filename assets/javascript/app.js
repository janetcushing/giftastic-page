//-------------------------//
// giphy search javascript
//-------------------------//

//-------------------------//
// global variables
//-------------------------//
var topics = ["disco", "hip hop", "macarena", "polka", "flash mob"];
var result = [];
var gifUrlStill = "";
var gifUrlAnimate = "";

//-------------------------//
// functions
//-------------------------//

//-------------------------------------------------------------//
// add the buttons to the dom
// dynamicaly generate a button for each dance in the array
//-------------------------------------------------------------//
function renderButtons() {
  $("#dance-view").empty();
  for (let i = 0; i < topics.length; i++) {
    let newButton = $("<button>");
    newButton.addClass("dance");
    newButton.attr("data-name", topics[i]);
    newButton.attr("value", topics[i]);
    newButton.text(topics[i]);
    // Adding the button to the HTML
    $("#dance-view").append(newButton);
    $("#dance-input").val("");
  }
}


//---------------------------------------------------------------//
// handle submit button click events 
// add the dance from the text field to the topics array
//---------------------------------------------------------------//
function addNewButton(dance) {
  // event.preventDefault() prevents the form from trying to submit itself.
  event.preventDefault();
  topics.push(dance);
  renderButtons();
}

//---------------------------------------------------------------//
// query the giphy api to bring back dance images
//---------------------------------------------------------------//
function queryGiphy(danceName) {
  let limit = 10;
  let rating = "g";
  let apiKey = "2fLgdLgXeV1kUnyRwYKej42K3Dtjue87";
  let queryURL = "https://api.giphy.com/v1/gifs/search";
  queryURL += '?' + $.param({
    'api_key': apiKey,
    'q': danceName,
    'limit': limit,
    'rating': rating
  });
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).done(function (response) {
    result = response.data;
    // console.log(result);
    $("#animateMsg").text("   Click on the image to turn animation on and off!");
    let rowDiv = $("<div>");
    rowDiv.addClass("row");
    rowDiv.attr("id", "gifReturnRow");
    $("#gifReturnDiv").append(rowDiv);

    for (let i = 0; i < result.length; i++) {
      gifUrlStill = result[i].images.fixed_height_still.url;
      gifUrlAnimate = result[i].images.fixed_height.url;
      let title = result[i].title;
      let state = "still";
      let rating1 = result[i].rating;
      let gifDiv = $("<div>");
      if (i === 0) {
        let marginDiv = $("<div>");
        marginDiv.addClass("col-md-3");
        $("#gifReturnRow").prepend(marginDiv);
      }
      gifDiv.addClass("col-md-3");
      let img1 = $("<img class=giphyGif>");
      img1.attr("data-still", gifUrlStill);
      img1.attr("data-animate", gifUrlAnimate);
      img1.attr("data-state", state);
      img1.attr("src", gifUrlStill);
      img1.attr("alt", title);
      let p2 = $("<p>");
      p2.text("Rating: " + rating1);
      gifDiv.append(img1);
      gifDiv.append(p2);
      $("#gifReturnRow").prepend(gifDiv);
      if (i === 1) {
        let marginDiv = $("<div>");
        marginDiv.addClass("col-md-3");
        $("#gifReturnRow").prepend(marginDiv);
      }
    }
  });
}



//----------------//
// main process
//----------------//
$(document).ready(function () {

  renderButtons();

  //------------------------------------------------//
  // when a dance button is clicked, execute the
  // queryGiphy function to call the giphy api
  //------------------------------------------------//
  $('#dance-view').on('click', '.dance', function () {
    var danceQuery = $(this).attr("data-name");
    queryGiphy(danceQuery);
  });

  //------------------------------------------------------//
  // Add dance buttons when the submit button is clicked
  //------------------------------------------------------//
  $("#add-dance").on("click", function (event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    event.preventDefault();
    var danceName = $("#dance-input").val().trim();
    if (danceName !== "") {
      addNewButton(danceName);
    }
  });

  //------------------------------------------------------//
  // Turn animation on and off by clicking the image
  //------------------------------------------------------//
  $('#gifReturnDiv').on('click', '.giphyGif', function () {
    var dataState = $(this).attr("data-state");
    if (dataState === 'still') {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else if (dataState === 'animate') {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }

  });

});