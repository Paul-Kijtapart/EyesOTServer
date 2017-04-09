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
            }, {
                'lat': '49.1895',
                'lon': '-122.8478',
                'timestamp': '1491701696832',
                'device_id': 'PPAP04',
                'type': 'Sound',
                'data': 'Gunshot',
                'confidence': 0.8
            }],
            current_search_text: "",
            isLoading: false,
            currentHover: {
                'device_id': "",
                'timestamp': "",
                'type': ""
            }
        };

        this.expectedCategorySet = new Set(["type", "data", "device_id"]);
        this.defaultExpectedCategoryList = ["type", "data", "device_id"];

        this.isEventMatchInput = this.isEventMatchInput.bind(this);
        this.getFilteredMatchedEventList = this.getFilteredMatchedEventList.bind(this);
        this.getTargetCategoryList = this.getTargetCategoryList.bind(this);
        this.getFilteredEventList = this.getFilteredEventList.bind(this);
        this.setSearchText = this.setSearchText.bind(this);
        this.removeEvent = this.removeEvent.bind(this);
        this.onCloseItemClick = this.onCloseItemClick.bind(this);
        this.OnInputTextChange = this.OnInputTextChange.bind(this);

        this.changeCurrentEvent = this.changeCurrentEvent.bind(this);
        this.hoverOnEvent = this.hoverOnEvent.bind(this);
    }

    setSearchText(text) {
        this.setState({
            current_search_text: text
        });
    }


    OnInputTextChange(current_text) {
        this.setSearchText(current_text);
    }

    changeCurrentEvent(event) {
        this.setState({
            currentHover: {
                'device_id': event.device_id,
                'timestamp': event.timestamp,
                'type': event.type
            }
        });
    }

    hoverOnEvent(event) {
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

    getTargetCategoryList(spec_text) {
        let wantedCategories = [];
        let textTokens = spec_text.split(" ");
        for (var i = textTokens.length - 1; i >= 0; i -= 1) {
            if (textTokens[i].length === 0) {
                continue;
            }

            if (this.expectedCategorySet.has(textTokens[i])) {
                wantedCategories.push(textTokens[i]);
                textTokens.splice(i, 1);
            }
        }
        return {
            wantedCategories: wantedCategories,
            inputTokens: textTokens
        };
    }

    isEventMatchInput(event, expected_data_list, compareFieldList) {
        for (let data of expected_data_list) {
            for (let field of compareFieldList) {
                if (event[field].toLocaleLowerCase().startsWith(data.toLocaleLowerCase())) {
                    return true;
                }
            }
        }
        return false;
    }

    getFilteredMatchedEventList(eventList, expected_data_list, compareFieldList) {
        let res = [];
        for (let event of eventList) {
            if (this.isEventMatchInput(event, expected_data_list, compareFieldList)) {
                res.push(event);
            }
        }
        return res;
    }

    getFilteredEventList(eventList, spec_text) {
        if (spec_text.length === 0) {
            return eventList;
        }

        let {
            wantedCategories,
            inputTokens
        } = this.getTargetCategoryList(spec_text);

        if (wantedCategories.length === 0) {
            return this.getFilteredMatchedEventList(eventList, inputTokens, this.defaultExpectedCategoryList);
        }
        return this.getFilteredMatchedEventList(eventList, inputTokens, wantedCategories);
    }

    render() {
        let filtered_event_list =
            this.getFilteredEventList(this.state.eventList, this.state.current_search_text);

        return (
            <div className="app">
                <div className="leftContainer">
                    <SearchBar 
                        isLoading={this.state.isLoading}
                        current_search_text={this.state.current_search_text}
                        OnInputTextChange={this.OnInputTextChange}
                    />
                    <EventList 
                        eventList={filtered_event_list}
                        onCloseItemClick={this.onCloseItemClick}
                        hoverOnEvent={this.hoverOnEvent}
                    />
                </div>
                <div className="rightContainer">
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