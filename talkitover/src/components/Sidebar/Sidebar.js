import React from 'react';
import { Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fa } from '@fortawesome/free-brands-svg-icons';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import './styles/sidebar.scss';

function Sidebar() {
    return (
        <React.Fragment>
        <SideNav
    onSelect={(selected) => {
        
    }}
>
    <SideNav.Toggle />
    <SideNav.Nav>
        <NavItem eventKey="profile">
            <NavIcon>
                <div className="icon">
                    <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                </div>
            </NavIcon>
            <NavText>
                <div className="label">
                    <Route path='/profile'>
                        <span>Profile</span>
                    </Route>
                </div>
            </NavText>
        </NavItem>
        <NavItem eventKey="articles">
            <NavIcon>
                <div className="icon">
                <i className="fa fa-bookmark" aria-hidden="true"></i>
                </div>
            </NavIcon>
            <NavText>
                <div className="label">
                    <Route path='/myarticles'>
                        <span>Saved Articles</span>
                    </Route>
                </div>
            </NavText>
            </NavItem>
            <NavItem eventKey="reviews">
                <NavIcon>
                    <div className="icon">
                        <i className="fa fa-star" aria-hidden="true"></i>
                       
                    </div>
                </NavIcon>
                <NavText>
                    <div className="label">
                        <Route path='/reviews'>
                            <span>Reviews</span>
                        </Route>
                    </div>
                </NavText> 
            </NavItem>

    </SideNav.Nav>
</SideNav>

</React.Fragment>
    )}


export default Sidebar;
