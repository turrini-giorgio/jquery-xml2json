/**
 * Load data/text.xml and test converted data against the original.
 */
asyncTest("xml2json", function(){
    var json = null;

    $.ajax({
        url: 'data/test.xml',
        dataType: 'xml',
        success: function(response) {
            json = $.xml2json(response);

            ok(json != null, "Result is not null.");
            ok(typeof(json) == 'object', 'Result is of type, object.');

            var expected = {
                test: {
                    '@attributes': {
                        library: 'jquery.xml2json',
                        version: '0.1'
                    },
                    lorem: {
                        '@attributes': {
                            sticky: 'true'
                        },
                        value: 'Lorem ipsum...'
                    },
                    cdata: {
                        value: 'Some cdata block...'
                    }
                }
            };

            deepEqual(json, expected, "Parsed object is as expected.")

            start();
        }
    });

});
