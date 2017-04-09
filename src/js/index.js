/* Dependencies */
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import io from 'socket.io-client';

/* Components */
import EventList from './components/EventList.js';


let socket = io();

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventList: []
        };

        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    componentDidMount() {
        socket.on("chat message", function(msg) {
            console.log(msg);
            console.log(msg.name);
            $('#messages').append($('<li>').text(msg.name));
        });

        socket.on('new event', function(event) {
            console.log(event);
            let current = event;
            console.log(current);
            this.setState(function(prevState) {
                let current_event_list = prevState.eventList;
                current_event_list.push(current);
                return {
                    eventList: current_event_list
                };
            });
        });
    }

    onFormSubmit(e) {
        e.preventDefault();
        socket.emit('chat message', $('#m').val());
        socket.emit('new event', $('#m').val());
        $('#m').val('');
        return false;
    }

    render() {
        return (
            <div className="app">
                <div className="ui left vertical inverted very wide sidebar menu visible">
                  <EventList eventList={this.state.eventList}/>
                </div>
                <ul id="messages"></ul>

                <div className="pusher">
                <div className="ui container">
                    <form onSubmit={this.onFormSubmit} action="">
                    <input id="m" />
                        <button>Send</button>
                    </form>
                 </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
);