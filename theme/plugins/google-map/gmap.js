window.marker = null;
var map;

async function initialize() {
	const { Map } = await google.maps.importLibrary("maps");
	const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

	var latitude = document.getElementById('map').getAttribute('data-latitude');
	var longitude = document.getElementById('map').getAttribute('data-longitude');
	var mapMarker = document.getElementById('map').getAttribute('data-marker');
	var mapMarkerName = document.getElementById('map').getAttribute('data-marker-name');
	var universityPlace = new google.maps.LatLng(latitude, longitude);
	var style = [
		{ elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
		{ elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
		{ elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
		{
			featureType: 'administrative.locality',
			elementType: 'labels.text.fill',
			stylers: [{ color: '#d59563' }]
		},
		{
			featureType: 'poi',
			elementType: 'labels.text.fill',
			stylers: [{ color: '#d59563' }]
		},
		{
			featureType: 'poi.park',
			elementType: 'geometry',
			stylers: [{ color: '#263c3f' }]
		},
		{
			featureType: 'poi.park',
			elementType: 'labels.text.fill',
			stylers: [{ color: '#6b9a76' }]
		},
		{
			featureType: 'road',
			elementType: 'geometry',
			stylers: [{ color: '#38414e' }]
		},
		{
			featureType: 'road',
			elementType: 'geometry.stroke',
			stylers: [{ color: '#212a37' }]
		},
		{
			featureType: 'road',
			elementType: 'labels.text.fill',
			stylers: [{ color: '#9ca5b3' }]
		},
		{
			featureType: 'road.highway',
			elementType: 'geometry',
			stylers: [{ color: '#746855' }]
		},
		{
			featureType: 'road.highway',
			elementType: 'geometry.stroke',
			stylers: [{ color: '#1f2835' }]
		},
		{
			featureType: 'road.highway',
			elementType: 'labels.text.fill',
			stylers: [{ color: '#f3d19c' }]
		},
		{
			featureType: 'transit',
			elementType: 'geometry',
			stylers: [{ color: '#2f3948' }]
		},
		{
			featureType: 'transit.station',
			elementType: 'labels.text.fill',
			stylers: [{ color: '#d59563' }]
		},
		{
			featureType: 'water',
			elementType: 'geometry',
			stylers: [{ color: '#17263c' }]
		},
		{
			featureType: 'water',
			elementType: 'labels.text.fill',
			stylers: [{ color: '#515c6d' }]
		},
		{
			featureType: 'water',
			elementType: 'labels.text.stroke',
			stylers: [{ color: '#17263c' }]
		}
	];
	var mapOptions = {
		mapId: "DEMO_MAP_ID",
		center: universityPlace,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		backgroundColor: "#000",
		zoom: 12,
		panControl: false,
		zoomControl: true,
		mapTypeControl: false,
		scaleControl: false,
		streetViewControl: false,
		overviewMapControl: false,
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.LARGE
		}
	};
	map = new Map(document.getElementById('map'), mapOptions);
	var mapType = new google.maps.StyledMapType(style, {
		name: "Grayscale"
	});
	map.mapTypes.set('grey', mapType);
	map.setMapTypeId('grey');
	var marker_image = mapMarker;

	// Create marker options
	const markerOptions = {
		position: universityPlace,
		map: map,
		title: mapMarkerName
	};

	// Create the marker
	marker = new AdvancedMarkerElement({
		...markerOptions,
		content: document.createElement('div')
	});

	// Set the icon image if provided
	if (marker_image) {
		const iconElement = document.createElement('img');
		iconElement.src = marker_image;
		iconElement.style.width = '56px';
		iconElement.style.height = '50px';
		marker.content.appendChild(iconElement);
	} else {
		marker.content.textContent = mapMarkerName;
	}

	marker.map = map; // Add marker to map
}

var mapElement = document.getElementById('map');
if (mapElement) {
	window.addEventListener('load', initialize);
}