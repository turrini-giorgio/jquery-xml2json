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

	function parseXML(data) {
		var xml, tmp;
		if (!data || typeof data !== "string") {
			return null;
		}
		try {
			if (window.DOMParser) { // Standard
				tmp = new DOMParser();
				xml = tmp.parseFromString(data, "text/xml");
			} else { // IE
				xml = new ActiveXObject("Microsoft.XMLDOM");
				xml.async = "false";
				xml.loadXML(data);
			}
		} catch (e) {
			xml = undefined;
		}
		if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) {
			throw new Error("Invalid XML: " + data);
		}
		return xml;
	}

	/**w
	 * Converts an xml response object from a $.ajax() call to a JSON object.
	 *
	 * @param xml
	 */
	function xml2json(xml, options) {
		options = options || defaultOptions;

		if (typeof xml === 'string') {
			xml = parseXML(xml);
		}

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

	if (typeof jQuery !== 'undefined') {
		jQuery.extend({xml2json: xml2json});
	} else if (typeof module !== 'undefined') {
		module.exports = xml2json;
	} else if (typeof window !== 'undefined') {
		window.xml2json = xml2json;
	}
})();
