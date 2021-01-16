import React, { Component } from 'react'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import '../media/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Home';
import MainApp from './MainApp';
import Sell from './Sell';
import '../media/myStyles.scss';

export default class Navigationbar extends Component {
    render() {
        return (
            <Router>
                <Nav variant="pills " defaultActiveKey="/home" className="navBar-sw">
                    <Nav.Item>
                        <Nav.Link href="/">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/app" eventKey="link-1">Buy Books</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/sell" eventKey="disabled">
                        Sell Books
                        </Nav.Link>
                    </Nav.Item>
                </Nav>

                <Switch>
                    <Route exact path="/" component={Home}/>  
                    <Route path="/app" component={MainApp} />
                    <Route path="/sell" component={Sell}/>
                </Switch>  
            </Router>

        )
    }
}
