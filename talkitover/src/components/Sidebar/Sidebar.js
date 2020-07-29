import React from 'react';
import { Route, Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { fa } from '@fortawesome/free-brands-svg-icons';
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
                                <Link to='/profile'>
                                    <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                                </Link>
                            </div>
                        </NavIcon>
                        <NavText>
                            <div className="label">
                                <Link to='/profile'>
                                    <span>Profile</span>
                                </Link>
                            </div>
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="articles">
                        <NavIcon>
                            <div className="icon">
                                <Link to='/myarticles'>
                                    <i className="fa fa-bookmark" aria-hidden="true"></i>
                                </Link>
                            </div>
                        </NavIcon>
                        <NavText>
                            <div className="label">
                                <Link to='/myarticles'>
                                    <span>Saved Articles</span>
                                </Link>
                            </div>
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="reviews">
                        <NavIcon>
                            <div className="icon">
                                <Link to='/profile'>
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                </Link>
                            </div>
                        </NavIcon>
                        <NavText>
                            <div className="label">
                                <Link to='/profile'>
                                    <span>Reviews</span>
                                </Link>
                            </div>
                        </NavText>
                    </NavItem>

                </SideNav.Nav>
            </SideNav>

        </React.Fragment>
    )
}


export default Sidebar;
