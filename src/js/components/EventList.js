import React from 'react';
import {
	List,
	Segment
} from 'semantic-ui-react';


class EventItem extends React.Component {
	render() {
		const device_id = this.props.device_id;
		const data = this.props.data;
		const timestamp = new Date(parseInt(this.props.timestamp));

		return (
			<List.Item>
				<List.Content>
          			<List.Header> {data} </List.Header>
          				<p>Device id: {device_id}</p>
          				<p>Date: {timestamp.toDateString()}</p>
                		<p>Time: {timestamp.toTimeString().split(" ")[0]}</p>
        		</List.Content>
			</List.Item>
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
			<Segment  className="eventList" inverted>
				<List 
					divided inverted relaxed animated 
					verticalAlign='middle'
					size="large"
				>
				{eventList}
				</List>
			</Segment>
		);
	}
}

export default EventList;