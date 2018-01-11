import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './main.css';
import Form from "./Form";
import Messages from "./Messages";
import MessageService from "./services/messageService";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };

        MessageService.getMessages()
            .then(msgs => {
                this.state = {
                    messages: msgs.data.reverse()
                };

                this.setState({messages: this.state.messages});
            });

        this.wsConnection = new WebSocket("ws://localhost:5000/shoutbox");

        this.wsConnection.onmessage = event => {
            try {
                const msg = JSON.parse(event.data);
                this.manageWsActions(msg);
            } catch (err) {
                console.error(err);
            }
        };
    }

    /**
     * Manages web socket actions.
     * @param msg
     */
    manageWsActions(msg) {
        switch (msg.state) {
            case "new_msg":
                this.appendMessage(msg);
                break;
            case "closing":
                break;
            case "connected":
                break;
            case "received":
                break;
            default:
                console.error("Unknown state.", msg.state);
        }
    }

    /**
     * @param {object} msg
     */
    sendMessage(msg) {
        this.wsConnection.send(JSON.stringify({
            message: msg.message,
            username: msg.username
        }));
    }

    /**
     * Append new message.
     *
     * @param {object} message
     */
    appendMessage(message) {
        message.key = message.username + message.timestamp;
        this.state.messages.push(message);
        this.setState({messages: this.state.messages});
    }

    render() {
        return (
            <div className="shoutbox">
                <Messages messages={this.state.messages}/>
                <div className="fixed-bottom">
                    <div className="shoutbox-form">
                        <Form sendMessageCallback={msg => this.sendMessage(msg)}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
