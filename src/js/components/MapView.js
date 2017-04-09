import React from 'react';

import {
	Map,
	Marker,
	Popup,
	TileLayer
} from 'react-leaflet';


// [lat, lo]
const VANCOUVER_POSITION = {
	lat: 49.246292,
	lon: -123.116226
};


class EventInfoBox extends React.Component {

	render() {
		const data = this.props.data;
		const timeStamp = this.props.timeStamp;

		return (
			<div className="eventInfoBox">
				<p> {data} </p>
				<p> {timeStamp} </p>
			</div>
		);
	}
}


class MapView extends React.Component {

	componentDidMount() {

	}

	render() {
		const map_config = {
			center: VANCOUVER_POSITION,
			zoomControl: false,
			zoom: 13,
			maxZoom: 19,
			minZoom: 11,
			scrollwheel: false,
			legends: true,
			infoControl: false,
			attributionControl: true
		};

		const mapboxAccessToken = 'pk.eyJ1IjoibmFwb24iLCJhIjoiY2l6MzdneThwMDUwbjJ3bjE0a2QxanB1NyJ9.2zlCnkvfXLp5AAfoMbeQSQ';
		const tileLayer_config = {
			url: 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken,
			id: "mapbox.light",
			maxZoom: 18,
			minZoom: 11,
		};

		const marker_config = {
			radius: 4,
			fillColor: 'orange',
			color: '#fff',
			weight: 1,
			opacity: 0.5,
			fillOpacity: 0.8
		}

		const eventList = this.props.eventList;
		const markers = eventList.map(function(event, index) {
			const position = {
				lat: parseFloat(event.lat),
				lon: parseFloat(event.lon)
			}

			return (
				<Marker
					key={index}
					position={position}
				>
					<Popup>
						<EventInfoBox {...event}/>
					</Popup>
				</Marker>
			);
		});

		const map = (
			<Map 
				id="map"
				{...map_config}
			>
				<TileLayer
				{...tileLayer_config}
				/>
				{markers}
			</Map>
		);

		return (
			<div className="mapView">
				{map}
			</div>
		);
	}
};


export default MapView;