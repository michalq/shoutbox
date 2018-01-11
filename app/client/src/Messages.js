import React, { Component } from 'react';
import Message from "./Message";

/**
 * Container for all messages.
 */
class Messages extends Component {
    render() {
        return (
            <div id="shoutbox-messages" className="shoutbox-messages fixed-bottom">
                {
                    Object.keys(this.props.messages).map(key => {
                        const msg = this.props.messages[key];
                        return <Message
                            key={msg.postedAt + msg.username}
                            message={msg.message}
                            postedAt={msg.postedAt}
                            username={msg.username} />
                    })
                }
            </div>
        );
    }
}

export default Messages;