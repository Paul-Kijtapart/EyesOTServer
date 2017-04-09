/* Dependencies */
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import io from 'socket.io-client';

/* Components */
import EventList from './components/EventList.js';
import ContentWrapper from './components/ContentWrapper.js';
import MapView from './components/MapView.js';
import SearchBar from './components/SearchBar.js';

/* Socket IO */
let socket = io();

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventList: [{
                'lat': '49.262778',
                'lon': '-123.114444',
                'timestamp': '1491700696872',
                'device_id': 'PPAP01',
                'type': 'Image',
                'data': 'Firearm',
                'confidence': 0.21,
            },{
                'lat': '49.1895',
                'lon': '-122.8478',
                'timestamp': '1491701696832',
                'device_id': 'PPAP04',
                'type': 'Sound',
                'data': 'Gunshot',
                'confidence': 0.8,
            }],
            currentHover : {
                'device_id': "",
                'timestamp': "",
                'type': ""
            }
        };

        this.removeEvent = this.removeEvent.bind(this);
        this.onCloseItemClick = this.onCloseItemClick.bind(this);
        this.changeCurrentEvent = this.changeCurrentEvent.bind(this);
        this.hoverOnEvent = this.hoverOnEvent.bind(this);

    }

    changeCurrentEvent(event){
        this.setState({
            currentHover: {
                'device_id': event.device_id,
                'timestamp': event.timestamp,
                'type': event.type
            }
        });
    }

    hoverOnEvent(event){
        this.changeCurrentEvent(event);
    }

    removeEvent(event) {
        let current_event_list = this.state.eventList;
        let index = current_event_list.indexOf(event);

        if (index === -1) {
            return;
        }
        current_event_list.splice(index, 1)
        this.setState({
            eventList: current_event_list
        });
    }

    onCloseItemClick(event) {
        this.removeEvent(event);
    }

    componentDidMount() {
        socket.on('new event', function(event) {
            let current = event;
            this.setState((prevState, props) => {
                let current_event_list = prevState.eventList;
                current_event_list.push(current);
                return {
                    eventList: current_event_list
                };
            });
        }.bind(this));
    }

    render() {
        return (
            <div className="app">
                <div className="leftContainer">
                    <EventList 
                        eventList={this.state.eventList}
                        onCloseItemClick={this.onCloseItemClick}
                        hoverOnEvent={this.hoverOnEvent}
                    />
                </div>
                <div className="rightContainer">
                    <SearchBar />
                    <ContentWrapper> 
                        <MapView 
                            eventList={this.state.eventList}
                            currentHover={this.state.currentHover}
                        />
                    </ContentWrapper>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
);