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

	constructor(props) {
		super(props);
		this.isSameEvent = this.isSameEvent.bind(this);

	}

	isSameEvent(srcEvent, destEvent) {
		if(destEvent.device_id == srcEvent.device_id &&
			destEvent.timestamp == srcEvent.timestamp &&
			destEvent.type == srcEvent.type){
				return true;
		}

		return false;
	}

	render() {
		const that = this;
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
			id: "mapbox.dark",
			maxZoom: 18,
			minZoom: 11,
		};

		const marker_config = {
			radius: 4,
			fillColor: 'orange',
			color: '#fff',
			weight: 1,
			opacity: 0.4,
			fillOpacity: 0.4
		}

		const eventList = this.props.eventList;
		const currEvent = this.props.currentHover;
		const markers = eventList.map(function(event, index) {
			const position = {
				lat: parseFloat(event.lat),
				lon: parseFloat(event.lon)
			}
			if (that.isSameEvent(event, currEvent)) {
				marker_config.opacity = 1;
			}else{
				marker_config.opacity = 0.4;
			}

			return (
				<Marker
					key={index}
					position={position}
					{...marker_config}
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