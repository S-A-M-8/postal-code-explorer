function GEBID(id) {
	return document.getElementById(id);
}

const postalCodeInputForm = GEBID('postal_code_input_form');
const inputPostalCode = GEBID('input_postal_code');

postalCodeInputForm.addEventListener('submit', explorePostalCodeData);

function explorePostalCodeData(evnt) {
	evnt.preventDefault();
	
	let zip = inputPostalCode.value;
	
	if(zip.length == 5) {
		getPostalCodeData('https://api.zippopotam.us/us/' + zip);
	} else {
		window.alert('Please Enter a Valid US 5 Digit Postal Code.');
	}
}

function getPostalCodeData(url) {
	const xhr = new XMLHttpRequest();
	
	console.log(xhr);
	
	xhr.open('GET', url, true);
	
	xhr.addEventListener('load', function() {
		inputPostalCode.setAttribute('disabled', true);
		
		if(this.status == 200) {
			let postalData = JSON.parse(this.response);
			
			showPlaceData(postalData);
		} else {
			window.alert('Please Enter a Valid US Postal Code.');
		}
		
		postalCodeInputForm.reset();
		
		inputPostalCode.removeAttribute('disabled');
		
		inputPostalCode.focus();
	});	
	
	xhr.send();
}

function showPlaceData(zipData) {
	let place = zipData.places[0];
	
	GEBID('state_data').innerText = place.state + ' (' + place['state abbreviation'] + ')';
	GEBID('place_data').innerText = place['place name'];
	GEBID('post_code_data').innerText = zipData['post code'];
	GEBID('lat_data').innerText = place.latitude;
	GEBID('lon_data').innerText = place.longitude;
	
	GEBID('dataTable').style.display = 'table';
}