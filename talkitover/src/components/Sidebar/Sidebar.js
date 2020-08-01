import React from 'react';
import { Link } from 'react-router-dom';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
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
                    
                    <NavItem eventKey="posts">
                    <NavIcon>
                        <div className="icon">
                            <Link to='/posts'>
                            <i class="fa fa-comment" aria-hidden="true"></i>
                            </Link>
                        </div>
                    </NavIcon>
                    <NavText>
                        <div className="label">
                            <Link to='/posts'>
                                <span>Posts</span>
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
                   

                </SideNav.Nav>
            </SideNav>

        </React.Fragment>
    )            
}

export default Sidebar;
