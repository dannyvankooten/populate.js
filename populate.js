
/**
 * Populate form fields from a JSON object.
 *
 * @param form object The form element containing your input fields.
 * @param data array JSON data to populate the fields with.
 * @param basename string Optional basename which is added to `name` attributes
 */
function populate(form, data, basename) {
	for (var key in data) {
		if (! data.hasOwnProperty(key)) {
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
		if (typeof(basename) !== "undefined") {
			name = basename + "[" + key + "]";
		}

		if (value.constructor === Array) {
			name += '[]';
		} else if(typeof value == "object") {
			populate(form, value, name);
			continue;
		}

		// only proceed if element is set
		var element = form.elements.namedItem(name);
		if (! element) {
			continue;
		}

		var type = element.type || element[0].type;

		switch(type ) {
			default:
				element.value = value;
				break;

			case 'radio':
			case 'checkbox':
				var values = value.constructor === Array ? value : [value];
				for (var j=0; j < element.length; j++) {
					element[j].checked = values.indexOf(element[j].value) > -1;
				}
				break;

			case 'select-multiple':
				var values = value.constructor === Array ? value : [value];
				for(var k = 0; k < element.options.length; k++) {
					element.options[k].selected = (values.indexOf(element.options[k].value) > -1 );
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

if (typeof module !== 'undefined' && module.exports) {
	module.exports = populate;
} 