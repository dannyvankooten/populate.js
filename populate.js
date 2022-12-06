
/**
 * Populate form fields from a JSON object.
 *
 * @param {HTMLFormElement} form The form element containing your input fields.
 * @param {object} data JSON data to populate the fields with.
 * @param {string} basename Optional basename which is added to `name` attributes, eg basename[fieldname]
 */
function populate(form, data, basename) {
	for (const key in data) {
		if (!data.hasOwnProperty(key)) {
			continue;
		}

		const name = key;
		let value = data[key];

		if ('undefined' === typeof value) {
			value = '';
		}

		if (null === value) {
			value = '';
		}

		// handle array name attributes
		if (typeof (basename) !== "undefined") {
			name = basename + "[" + key + "]";
		}

		if (value.constructor === Array) {
			name += '[]';
		} else if (typeof value == "object") {
			populate(form, value, name);
			continue;
		}


		// only proceed if form has element with the given name attribute
		const element = form.elements.namedItem(name);
		if (!element) {
			continue;
		}

		// set element value
		const type = element.type || element[0].type;
		switch (type) {
			default:
				element.value = value;
				break;

			case 'radio':
			case 'checkbox': {
				const values = value.constructor === Array ? value : [value];
				for (let j = 0; j < element.length; j++) {
					element[j].checked = values.indexOf(element[j].value) > -1;
				}
			}
				break;

			case 'select-multiple': {
				const values = value.constructor === Array ? value : [value];
				for (let k = 0; k < element.options.length; k++) {
					element.options[k].selected = (values.indexOf(element.options[k].value) > -1);
				}
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

		// fire change event on element
		const changeEvent = new Event('change', { bubbles: true });
		switch (type) {
			default:
				element.dispatchEvent(changeEvent);
				break;
			case 'radio':
			case 'checkbox':
				for (let j = 0; j < element.length; j++) {
					if (element[j].checked) {
						element[j].dispatchEvent(changeEvent);
					}
				}
				break;
		}

	}
};

if (typeof module !== 'undefined' && module.exports) {
	module.exports = populate;
} 