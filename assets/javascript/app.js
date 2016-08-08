var topic = ['walking dead', 'silicon valley', 'game of thrones', 'homeland', 'batman', 'star wars', 'the avengers', 'ant man'];

var compute = {
    addTopic: function(e) {
        e.preventDefault();
        var newTopic = $('#topicInput').val().trim().toLowerCase();
        topic.push(newTopic);
        output.renderButtons();
        $('#topicInput').val('');
    },
    getGiphy: function() {

    }
};
var output = {
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
    displayGiphy: function(response) {

    },
};
$(document).ready(function() {

    output.renderButtons();

    $('#topicButton').on('click', '.movie', output.displayGiphy);

    $('#addInput').on('click', compute.addTopic);

});