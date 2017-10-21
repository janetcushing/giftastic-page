// giphy javascript


// global variables
var topics = ["cow", "sheep", "llama", "emu"];


// functions
function renderButtons() {

    $("#animal-view").empty();

    for (let i = 0; i < topics.length; i++) {
        console.log("im in he for loop")
                  // Then dynamicaly generating buttons for each movie in the array.
                  // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
                  let newButton = $("<button>");
                  // Adding a class
                  newButton.addClass("animal");
                  // Adding a data-attribute with a value of the movie at index i
                  newButton.attr("data-name", topics[i]);
                  // Providing the button's text with a value of the movie at index i
                  newButton.text(topics[i]);
                  // Adding the button to the HTML
                  $("#animal-view").append(newButton);
                }
}



$("#add-animal").on("click", function(event) {
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


  function queryGiphy(){
    var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";
    
        $.ajax({
          url: queryURL,
          method: 'GET'
        }).done(function(response) {
          console.log(response.limit);
          console.log(response.rating); 
        
       
        });

  }

// main proecss
$(document).ready(function () {

    renderButtons();
    $(".animal").click(queryGiphy);


});