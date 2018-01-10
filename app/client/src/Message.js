import React, { Component } from 'react';

/**
 * Single message.
 */
class Message extends Component {
    render() {
        return (
            <div className="card message">
                <div className="card-body">
                    <h5 className="card-title">{this.props.username} <small>{this.props.timestamp}</small></h5>
                    <p className="card-text">{this.props.message}</p>
                </div>
            </div>
        );
    }
}

export default Message;