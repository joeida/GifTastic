// Existing TV shows and Movies
var topic = ['walking dead', 'silicon valley', 'game of thrones', 'batman', 'star wars', 'avengers', 'ant man'];

var compute = {

    // Add new topic button to existing topic list and render button
    addTopic: function(e) {
        e.preventDefault();
        var newTopic = $('#topicInput').val().trim().toLowerCase();
        topic.push(newTopic);
        output.renderButtons();
        $('#topicInput').val('');
    },

    // Get Gif from Giphy API based on topic with limit 10 and rating of PG-13
    // Display resulting Gif stills
    getGif: function() {
        var animateGif;
        var stillGif;
        var query = $(this).data('name').replace(/\s+/g, '+');
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + query + "&limit=10&rating=pg-13&api_key=dc6zaTOxFJmzC";
        $.ajax({url: queryURL, method: 'GET'})
        .done(function(response) {
            output.clearGif();
            for (var i = 0; i < response.data.length; i++) {
                animateGif = response.data[i].images.fixed_height.url;
                stillGif = response.data[i].images.fixed_height_still.url;
                output.displayGif(animateGif, stillGif);
            }
        });
    }
};
var output = {

    // Display topic buttons
    renderButtons: function() {
        $('#topicButton').empty();
        for (var i = 0; i < topic.length; i++) {
           var tb = $('<button>');
           tb.addClass('movie btn btn-success');
           tb.attr('data-name', topic[i]);
           tb.text(topic[i]);
           $('#topicButton').append(tb); 
        }
    },

    // Display Gif image with data attributes of still and animated images
    displayGif: function(animateGif, stillGif) {
        var imgGif = $('<img>');
        imgGif.attr('src', stillGif);
        imgGif.attr('data-still', stillGif);
        imgGif.attr('data-animate', animateGif);
        imgGif.attr('data-state', 'still');
        imgGif.addClass('gifImage');
        $('#topicGifOutput').append(imgGif);
    },

    // Clear Gif image output to be used when choosing a new topic
    clearGif: function() {
        $('#topicGifOutput').empty();
    },

    // Set image to animated Gif image to animate image
    animate: function(obj) {
        var animate = $(obj).data('animate');
        $(obj).attr('src', animate);
        $(obj).attr('data-state', 'animate');
    },

    // Set image to still Gif image to stop image
    still: function(obj) {
        var still = $(obj).data('still');
        $(obj).attr('src', still);
        $(obj).attr('data-state', 'still');
    }

};
$(document).ready(function() {

    // Display topic buttons for existing topic in default list
    output.renderButtons();

    // Get Gif images for button topic and output to page
    $('#topicButton').on('click', '.movie', compute.getGif);

    // Add topic to topic list and display topic buttons for updated list
    $('#addInput').on('click', compute.addTopic);

    // Animate Gif image when clicked and stop Gif image when clicked again
    $('#topicGifOutput').on('click', '.gifImage', function() {
        var state = $(this).attr('data-state');
        if (state === 'still') {
            output.animate(this);
        } else {
            output.still(this);
        }
    });
});