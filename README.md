populate.js
================

A simple JavaScript `populate( form, data )` function which will populate form fields from a JSON object.

Input types (text, email, select, multiple select, etc) are taken into account but not validated.

## Usage

*HTML*
```html
<form id="my-form">
	<input type="text" name="name" />
	<input type="email" name="email" />

	<input type="text" name="address[addr1]" />
	<input type="text" name="address[city]" />
	<input type="text" name="address[state]" />
</form>
````

*JavaScript*
```javascript

// your JSON object
// keys have to match input names
var data = {
	"email": "john@doe.com",
	"name": "John Doe",
	"address": {
		"addr1": "Street name",
		"city": "City name",
		"state": "State"
	}
}

// your containing element
var formElement = document.getElementById('my-form');

// populate the form with our JSON object
populate(formElement, data);
```

## License
MIT licensed.