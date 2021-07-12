import React, { Component } from 'react';
import Web3 from 'web3';

const apiEndpoint = "http://localhost:3000";
class Login extends Component {
    state = {
        loading: false
    };

    getJwt = async (address, signature, nonce) => {
        const header = { 'Content-Type': 'application/json' };
        const payload = JSON.stringify({ address, signature, nonce });

        return await fetch(`${apiEndpoint}/auth`, {
            method: 'POST',
            headers: header,
            body: payload
        });
    }

    handleClick = async () => {
        const { onLoggedIn } = this.props;

        try{
            this.setState({ loading: true });

            if (!window.ethereum) {
                throw('Please install MetaMask first.');
             }

            const web3 = new Web3(Web3.givenProvider);
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log(process.env.REACT_APP_API_ENDPOINT);
            const response = await fetch(`${apiEndpoint}/token`);
            const nonce = await response.json();

            const strNonce = nonce.toString();
            const signature = await web3.eth.personal.sign(strNonce, accounts[0]);
            const jwtResponse = await this.getJwt(accounts[0], signature, strNonce);
            const jwtPayload = await jwtResponse.json();

            onLoggedIn(jwtPayload.jwt);
        }
        catch(ex){
            alert(ex.message);
        }
        finally{
            this.setState({ loading: false });
        }

    }
      
    render() {
        const { loading } = this.state;

        return (
            <button className="Login-button" onClick={this.handleClick}>
            {loading ? 'Loading...' : 'Login with MetaMask'}
            </button>
        );
    }
}

export default Login;