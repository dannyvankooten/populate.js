/*! populate.js v1.0.2 by @dannyvankooten | MIT license */
;(function(root) {

	/**
	 * Populate form fields from a JSON object.
	 *
	 * @param form object The form element containing your input fields.
	 * @param data array JSON data to populate the fields with.
	 * @param basename string Optional basename which is added to `name` attributes. Used to
	 *   deserialize object fields (i.e. {"foo": {"bar": 1}} will try to populate a field
	 *   named "foo[bar]" with the value 1).
	 * @param deserializeFields bool Optional flag. If false, {"foo": {"bar": 1}} would
	 *   instead try to populate a field named "foo" with (pretty-printed) JSON string
	 *  '{ "bar": 1 }'.
	 */
	var populate = function( form, data, basename, deserializeFields = true) {
		if ('undefined' === typeof form.elements) {
			throw new Error('populate.js can only fill a form when form.elements is defined.');
		}

		for(var key in data) {

			if( ! data.hasOwnProperty( key ) ) {
				continue;
			}

			var name = key;
			var value = data[key];

                        if ('undefined' === typeof value) {
                            value = '';
                        }

                        if (null === value) {
                            value = '';
                        }

			// handle array name attributes
			if(basename) {
				name = basename + "[" + key + "]";
			}

			if(value.constructor === Array) {
				name += '[]';
			} else if(typeof value == "object") {
				if (deserializeFields) {
					populate( form, value, name);
				}
				else {
					populate(form, {[name]: JSON.stringify(value, null, 2)});
				}
				continue;
			}

			// only proceed if element is set
			var element = form.elements.namedItem( name );
			if( ! element ) {
				continue;
			}

			var type = element.type || element[0].type;

			switch(type ) {
				default:
					element.value = value;
					break;

				case 'radio':
				case 'checkbox':
					if (element.length) {
						for( var j=0; j < element.length; j++ ) {
							element[j].checked = ( value.indexOf(element[j].value) > -1 );
						}
					}
					else {
						element.checked = value > 0;
					}
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
				case 'date':
          				element.value = new Date(value).toISOString().split('T')[0];
					break;
			}

		}

	};

	// Play nice with AMD, CommonJS or a plain global object.
	if ( typeof define == 'function' && typeof define.amd == 'object' && define.amd ) {
		define(function() {
			return populate;
		});
	}	else if ( typeof module !== 'undefined' && module.exports ) {
		module.exports = populate;
	} else {
		root.populate = populate;
	}

}(this));
