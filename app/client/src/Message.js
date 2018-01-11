import React, { Component } from 'react';
import moment from 'moment'

/**
 * Single message.
 */
class Message extends Component {
    getFormattedTimestamp() {
        const date = moment.unix(this.props.postedAt);
        return date.format('YYYY-MM-DD HH:mm:ss');
    }

    getMessage() {
        return (
            this.props.message.replace(
                /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/gi,
                match => '<a href="' + match + '">' + match + '</a>'
            )
        );
    }

    render() {
        return (
            <div className="card message">
                <div className="card-body">
                    <h5 className="card-title">{this.props.username} <small className={"align-left"}>{this.getFormattedTimestamp()}</small></h5>
                    <p className="card-text" dangerouslySetInnerHTML={{__html: this.getMessage()}}/>
                </div>
            </div>
        );
    }
}

export default Message;