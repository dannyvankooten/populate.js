js-populate-fields
================

Populates form elements from a JSON object.

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
var data = {
	"email": "john@doe.com",
	"name": "John Doe",
	"address": {
		"addr1": "Street name",
		"city": "City name",
		"state": "State"
	}
}

var formElement = document.getElementById('my-form');
populateFields(formElement, data);
```