/* Dependencies */
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import io from 'socket.io-client';

let socket = io();
// let socket = io('http://localhost:3000');
// let socket = io('https://eyesofthethings.herokuapp.com/');

// $(function() {
//     var socket = io();
//     $('form').submit(function() {
//         socket.emit('chat message', $('#m').val());
//         $('#m').val('');
//         return false;
//     });
//     socket.on('chat message', function(msg) {
//         $('#messages').append($('<li>').text(msg));
//     });
// });


class App extends React.Component {
    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    componentDidMount() {
        socket.on("chat message", function(msg) {
            $('#messages').append($('<li>').text(msg));
        });

        socket.on('new event', function(event) {
            console.log(event);
        });
    }

    onFormSubmit(e) {
        e.preventDefault();
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
    }

    render() {
        return (
            <div className="app">
                <div className="ui left vertical inverted very wide sidebar menu visible">
                    <a className="item">
                        <h2 className="ui header inverted">
                          <i className="image icon"></i>
                          <div className="content">
                            Device PPAP01
                            <div className="sub header">Firearm detected</div>
                          </div>
                        </h2>
                        <p>Date: Apr 14, 2017</p>
                        <p>Time: 09:20:43</p>
                    </a>
                    <a className="item">
                        <h2 className="ui header inverted">
                          <i className="signal icon"></i>
                          <div className="content">
                            Device PPAP02
                            <div className="sub header">Gunshot detected</div>
                          </div>
                        </h2>
                        <p>Date: Apr 14, 2017</p>
                        <p>Time: 09:24:43</p>
                    </a>
                    <ul id="messages"></ul>
                </div>

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
