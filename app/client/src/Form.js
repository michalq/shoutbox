import React, { Component } from 'react';

class Form extends Component {
    sendMessage(event) {
        event.preventDefault();

        const message = this.refs.message.value;
        const username = "test";
        this.refs.message.value = '';

        this.props.sendMessageCallback({
            message: message,
            username: username
        });
    }

    render() {
        return (
            <form action="" className="form-inline" onSubmit={e => { this.sendMessage(e) }}>
                <div className="form-group">
                    <input className={"form-control form-control-lg"} type="text" ref="message" placeholder={"Type message …"} />
                    <button className={"btn btn-lg btn-primary"} type="submit">Send</button>
                </div>
            </form>
        );
    }
}

export default Form;