#jQuery xml2json

A simple jQuery plugin that converts XML data, typically from $.ajax requests, to a valid JSON object.

Here's a simple usage example:

    $.ajax({
        url: 'data/test.xml',
        dataType: 'xml',
        success: function(response) {
            json = $.xml2json(response);
        }
    });

