import React from 'react';
import {Link, withRouter} from 'react-router-dom';

const NavBar = (props) => {

    function login() {
        props.auth.login();
    }
    
    function logout() {
        props.auth.logout();
        props.history.replace('/');
    }

    const { isAuthenticated } = props.auth;

    return (
        <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
            <a class="navbar-brand" href="#">PizzaShack</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarsExampleDefault">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    { 
                        isAuthenticated() &&
                        <li class="nav-item">
                            <Link className="nav-link" to="/menu">Menu</Link>
                        </li>
                    }
                </ul>
                {
                    !isAuthenticated() ?
                    ( <button class="btn btn-outline-success my-2 my-sm-0" type="button" onClick={login.bind(this)}>Sign In</button>)
                    :(<button class="btn btn-outline-success my-2 my-sm-0" type="button" onClick={logout.bind(this)}>Sign Out</button>)
                }
            </div>
        </nav>
    );
}

export default withRouter(NavBar);