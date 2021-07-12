import React, { Component } from 'react';

class Authorized extends Component {

    render() {
        const { onLoggedOut } = this.props;
        const { token } = this.props;
        return (
            <div>
                <div>Jwt <input type="text" value={token} /></div>
                <button onClick={onLoggedOut}>Logout</button>
            </div>
        );
    }
}

export default Authorized;
