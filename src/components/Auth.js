import queryString from 'query-string';
import { AUTH_CONFIG } from '../Config';

export default class Auth {
    accessToken;
    idToken;
    expiresAt;

    constructor() {
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.login = this.login.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.logout = this.logout.bind(this);
    }

    login() {
        var url = AUTH_CONFIG.authUrl + "?response_type=id_token token&client_id=" + AUTH_CONFIG.clientId + "&scope=openid&nonce=13e2312637dg136e1&";
        var redirectUrl = "redirect_uri=" + AUTH_CONFIG.callbackUrl;
        url = url + redirectUrl;
        window.location.href = url;
    }

    handleAuthentication() {
        console.log("handling the response received from APIM");
        const authResult = queryString.parse(window.location.hash);
        console.log(authResult);
        if(authResult && authResult.access_token && authResult.id_token) {
            // Set isLoggedIn flag in localStorage
            localStorage.setItem('isLoggedIn', 'true');

            // Set the time that the access token will expire at
            let expiresAt = (authResult.expires_in * 1000) + new Date().getTime();
            this.accessToken = authResult.access_token;
            this.idToken = authResult.id_token;
            this.expiresAt = expiresAt;

            localStorage.setItem('accessToken', this.accessToken);
        } else {
            console.log("An error occurred while authentication.");
            alert(`Error: Check the console for further details.`);
        }
    }

    logout() {
        // Remove tokens and expiry time
        this.accessToken = null;
        this.idToken = null;
        this.expiresAt = 0;
    
        // Remove isLoggedIn flag and other token flags from localStorage
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('idToken');
    }

    isAuthenticated() {
        // Check whether the current time is past the
        // access token's expiry time
        let expiresAt = this.expiresAt;
        return new Date().getTime() < expiresAt;
    }

    getAccessToken() {
        return localStorage.getItem("accessToken");
    }

}
