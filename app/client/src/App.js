import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './main.css';

class App extends Component {
  render() {
    return (
      <div className="Shoutbox">
        <div>
            <div className="row">
                <div className="col">
                    <header className="Shoutbox-header">
                        <h1 className="Shoutbox-title">Conversation</h1>
                    </header>
                </div>
            </div>
            <div className="row Shoutbox-messages">
                <div className="col align-self-end">
                    <div className="card" style={{"width": "25rem"}}>
                        <div className="card-body">
                            <h5 className="card-title">John Snow <small>3 days ago</small></h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                    <div className="card" style={{"width": "25rem"}}>
                        <div className="card-body">
                            <h5 className="card-title">John Snow <small>12:34</small></h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row no-gutters">
                <div className="col">
                    <div className="Shoutbox-form">
                        <form action="" className="form-inline">
                            <div class="form-group">
                                <input className={"form-control form-control-lg"} type="text" placeholder={"Type message …"} />
                                <button className={"btn btn-lg btn-primary"} type="submit">Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default App;
