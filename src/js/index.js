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
                'confidence': 0.21
            }, {
                'lat': '49.276875',
                'lon': '-123.118081',
                'timestamp': '1491701696832',
                'device_id': 'PPAP04',
                'type': 'Sound',
                'data': 'Gunshot',
                'confidence': 0.8
            }]
        };
    }

    componentDidMount() {
        socket.on('new event', function(event) {
            console.log(event);
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
                  <EventList eventList={this.state.eventList}/>
                </div>
                <div className="rightContainer">
                    <SearchBar />
                    <ContentWrapper> 
                        <MapView 
                            eventList={this.state.eventList}
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