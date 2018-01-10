import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './main.css';
import Form from "./Form";
import Messages from "./Messages";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: this.getMessages()
        };

        this.wsConnection = new WebSocket("ws://localhost:3000");

        this.wsConnection.onmessage = event => {
            // const msg = JSON.parse(event.data);
            console.log('test', event.data);
        };

        this.wsConnection.onopen = event => {
            console.log('Connected.');
        };
    }

    /**
     * Get initial messages from api.
     * @returns {object[]}
     */
    getMessages() {
        return [
            {
                key: "1",
                username: "John Snow",
                timestamp: "12:23",
                message: "Lorem ipsum dolor sit amet."
            },
            {
                key: "2",
                username: "John Snow2",
                timestamp: "3 days ago",
                message: "Lorem ipsum dolor sit amet2."
            }
        ];
    }

    sendMessage(msg) {
        console.log('another callback', msg.message, msg.username);
    }

    /**
     * Append new message.
     *
     * @param {object} message
     */
    appendMessage(message) {
        this.state.messages.push(message);
        this.setState({messages: this.state.messages});
    }

    render() {
        return (
            <div className="shoutbox">
                <header className="shoutbox-header">
                    <h1 className="shoutbox-title">Conversation</h1>
                </header>
                <Messages messages={this.state.messages}/>
                <div className="fixed-bottom">
                    <div className="shoutbox-form">
                        <Form sendMessageCallback={this.sendMessage}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
