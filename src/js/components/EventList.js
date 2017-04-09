import React from 'react';


class EventItem extends React.Component {
	render() {
		const device_id = this.props.device_id;
		const data = this.props.data;
		const timestamp = new Date(parseInt(this.props.timestamp));

		return (
			<li className="item">
                <h2 className="ui header inverted">
                  <i className="image icon"></i>
                  <div className="content">
                    {device_id}
                    <div className="sub header">{data}</div>
                  </div>
                </h2>
                <p>Date: {timestamp.toDateString()}</p>
                <p>Time: {timestamp.toTimeString().split(" ")[0]}</p>
            </li>
		);
	}
}


class EventList extends React.Component {
	render() {
		const eventList = this.props.eventList
			.map(function(event, index) {
				return (
					<EventItem
						key={index}
						device_id={event.device_id}
						data={event.data}
						timestamp={event.timestamp}
					/>
				);
			});

		return (
			<ul  className="eventList">
				{eventList}
			</ul>
		);
	}
}

export default EventList;