function populateFields(container, data, basename) {

	for(var key in data) {

		var name = key;
		var value = data[key];

		// no need to set empty values
		if(value == "") {
			continue;
		}

		// handle array name attributes
		if(typeof(basename) !== "undefined") {
			name = basename + "[" + key + "]";
		}

		if(value.constructor == Array) {
			name += '[]';
		} else if(typeof value == "object") {
			populateFields(container, value, name);
			continue;
		}

		// populate field
		var elements = container.querySelectorAll('input[name="'+ name +'"], select[name="'+ name +'"], textarea[name="'+ name +'"]');
		
		// Dirty: abandon if we did not find the element
		if(!elements) { 
			return; 
		}

		// loop through found elements to set their values
		for(var i = 0; i < elements.length; i++) {

			var element = elements[i];

			// check element type
			switch(element.type || element.tagName) {
				case 'text':
				case 'email':
				case 'date':
				case 'tel':
					element.value = value;
					break;

				case 'radio':
					element.checked = (element.value === value);
					break;

				case 'checkbox':
					for(var j = 0; j < value.length; j++) {
						element.checked = (element.value === value[j]);
					}
					break;

				case 'select-multiple':
					var values = value.constructor == Array ? value : [value];

					for(var k = 0; k < element.options.length; k++)
					{
						for(var l = 0; l < values.length; l++)
						{
							element.options[k].selected |= (element.options[k].value == values[l]);
						}
					}
					break;

				case 'select':
				case 'select-one':
					element.value = value.toString() || value;
					break;
			}
		}
			
		
	}

}