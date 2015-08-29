/*! populate.js v1.0 by @dannyvankooten | MIT license */
;(function(root) {

	/**
	 * Populate form fields from a JSON object.
	 *
	 * @param container object The element containing your input fields.
	 * @param data array JSON data to populate the fields with.
	 * @param basename string Optional basename which is added to `name` attributes
	 */
	var populate = function(container, data, basename) {

		for(var key in data) {

			if( ! data.hasOwnProperty( key ) ) {
				continue;
			}

			var name = key;
			var value = data[key];

			// handle array name attributes
			if(typeof(basename) !== "undefined") {
				name = basename + "[" + key + "]";
			}

			if(value.constructor === Array) {
				name += '[]';
			} else if(typeof value == "object") {
				populate(container, value, name);
				continue;
			}

			// find field element
			var elements = container.querySelectorAll('input[name="'+ name +'"], select[name="'+ name +'"], textarea[name="'+ name +'"]');

			// loop through elements to set their values
			for(var i = 0; i < elements.length; i++) {

				var element = elements[i];

				// check element type
				switch(element.type || element.tagName) {
					default:
						element.value = value;
						break;

					case 'radio':
						element.checked = (element.value === value);
						break;

					case 'checkbox':
						element.checked = ( value.indexOf(element.value) > -1 );
						break;

					case 'select-multiple':
						var values = value.constructor == Array ? value : [value];

						for(var k = 0; k < element.options.length; k++) {
							element.options[k].selected |= (values.indexOf(element.options[k].value) > -1 );
						}
						break;

					case 'select':
					case 'select-one':
						element.value = value.toString() || value;
						break;
				}
			}


		}

	};

	// Play nice with AMD, CommonJS or a plain global object.
	if ( typeof define == 'function' && typeof define.amd == 'object' && define.amd ) {
		define(function() {
			return populate;
		});
	}	else if ( typeof exports === 'object' ) {
		module.exports = populate;
	} else {
		root.populate = populate;
	}

}(this));