//-------------------------//
// giphy search javascript
//-------------------------//

//-------------------------//
// global variables
//-------------------------//
var dances = ["disco", "hip hop", "macarena", "polka", "flash mob"];
var result = [];

//-------------------------//
// functions
//-------------------------//

//-------------------------------------------------------------//
// add the buttons to the dom
 // dynamicaly generate a button for each dance in the array
//-------------------------------------------------------------//
function renderButtons() {
  $("#dance-view").empty();
  for (let i = 0; i < dances.length; i++) {
    let newButton = $("<button>");
    newButton.addClass("dance");
    newButton.attr("data-name", dances[i]);
    newButton.attr("value", dances[i]);
    newButton.text(dances[i]);
    // Adding the button to the HTML
    $("#dance-view").append(newButton);
    $("#dance-input").val("");
  }
}


//---------------------------------------------------------------//
// handle submit button click events 
// add the dance from the text field to the dances array
//---------------------------------------------------------------//
function addNewButton(dance) {
  // event.preventDefault() prevents the form from trying to submit itself.
  event.preventDefault();
  dances.push(dance);
  renderButtons();
}

//---------------------------------------------------------------//
// query the giphy api to bring back dance images
//---------------------------------------------------------------//
function queryGiphy(danceName) {
  let limit = 4;
  let rating = "g";
  let apiKey = "2fLgdLgXeV1kUnyRwYKej42K3Dtjue87";
  // let queryURL = "https://api.giphy.com/v1/gifs/search";
  let queryURL = "http://api.giphy.com/v1/gifs/search";
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
    let rowDiv = $("<div>");
    rowDiv.addClass("row");
    rowDiv.attr("id", "gifReturnRow");
    $("#gifReturnDiv").append(rowDiv);

    for (let i = 0; i < result.length; i++) {
      let gifUrl = result[i].images.fixed_height.url;
      let rating1 = result[i].rating;
      let gifDiv = $("<div>");
      gifDiv.addClass("col-md-3");
      let img1 = $("<img class=giphyGif>");
      img1.attr("src", gifUrl);
      let p1 = $("<p>");
      p1.text("Rating: " + rating1);
      gifDiv.append(img1);
      gifDiv.append(p1);
      $("#gifReturnRow").prepend(gifDiv);
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





});