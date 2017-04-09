import React from 'react';
import {
	Header,
	Icon,
	Label,
	List,
	Segment
} from 'semantic-ui-react';


class EventItem extends React.Component {
	constructor(props) {
		super(props);
		this.handleOnCloseItemClick = this.handleOnCloseItemClick.bind(this);
	}

	handleOnCloseItemClick(e) {
		console.log("removed " + JSON.stringify(this.event));
		e.preventDefault();
		this.props.onCloseItemClick(this.event);
	}

	getSeverity(confidence) {
		if (confidence > 0.3) {
			return ['red', 'high'];
		} else if (confidence > 0.2) {
			return ['orange', 'medium'];
		} else {
			return ['yellow', 'low'];
		}
	}

	getIcon(type) {
		if (type === 'Image') {
			return 'camera retro';
		} else {
			return 'microphone';
		}
	}

	render() {
		const event = this.props.event;
		this.event = event;
		const device_id = this.props.device_id;
		const data = this.props.data;
		const type = this.props.type;
		const icon = this.getIcon(type);
		const timestamp = new Date(parseInt(this.props.timestamp));
		const confidence = this.getSeverity(this.props.confidence);
		return (
			<div className="item">
				<i 
					onClick={this.handleOnCloseItemClick}
					className="close icon dismiss"
				/>
				<List.Content>
			    	<Header as='h3'>
			    		<Icon name={icon} />
			    		<Header.Content>
			    		{type+'_'+device_id}
			    		</Header.Content>
			    	</Header>
  						<h4>
  							Date: {timestamp.toDateString()} <br />
      		  				Time: {timestamp.toTimeString().split(" ")[0]}
      					</h4>
      				<Label color={confidence[0]} key={confidence[0]}>{confidence[1]}</Label>
        		</List.Content>
        		<div className='approveButtonDiv'>
      				<Icon className="approve" name="check square" color="green" size='big' />
      			</div>
			</div>
		);
	}
}

class EventList extends React.Component {
	render() {
		const onCloseItemClick = this.props.onCloseItemClick;
		const eventList = this.props.eventList
			.map(function(event, index) {
				return (
					<EventItem
						key={index}
						event={event}
						device_id={event.device_id}
						data={event.data}
						timestamp={event.timestamp}
						type={event.type}
						confidence={event.confidence}
						onCloseItemClick={onCloseItemClick}
					/>
				);
			});

		return (
			<Segment  className="eventList" inverted>
				<List
					divided inverted relaxed
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