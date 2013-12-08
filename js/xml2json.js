/**
 * jQuery plugin to convert a given $.ajax response xml object to json.
 *
 * @example var json = $.xml2json(response);
 */
(function() {

	// default options based on https://github.com/Leonidas-from-XIV/node-xml2js
	var defaultOptions = {
		attrkey: '$',
		charkey: '_'
	};

	jQuery.extend({

		/**w
		 * Converts an xml response object from a $.ajax() call to a JSON object.
		 *
		 * @param xml
		 */
		xml2json: function xml2json(xml, options) {
			options = options || defaultOptions;

			var result = {};

			for (var i in xml.childNodes) {
				var node = xml.childNodes[i];
				if (node.nodeType === 1) {
					var child = node.hasChildNodes() ? xml2json(node, options) : node.nodevalue;
					child = child === null ? {} : child;

					if (result.hasOwnProperty(node.nodeName)) {
						// For repeating elements, cast/promote the node to array
						if (!(result[node.nodeName] instanceof Array)) {
							var tmp = result[node.nodeName];
							result[node.nodeName] = [];
							result[node.nodeName].push(tmp);
						}
						result[node.nodeName].push(child);
					} else {
						result[node.nodeName] = child;
					}

					// Add attributes if any
					if (node.attributes.length > 0) {
						result[node.nodeName][options.attrkey] = {};
						child[options.attrkey] = {};
						for (var j in node.attributes) {
							var attribute = node.attributes.item(j);
							child[options.attrkey][attribute.nodeName] = attribute.value;
						}
					}

					// Add element value
					if (node.childElementCount === 0 && node.textContent !== null && node.textContent !== "") {
						child[options.charkey] = node.textContent.trim();
					}
				}
			}

			return result;
		}

	});
})();
