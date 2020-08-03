import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import Tooltip from '@material-ui/core/Tooltip';
import { LoginContext } from '../auth/context';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import './styles/sidebar.scss';

function Sidebar() {
    const context = useContext(LoginContext);
    return (
        <React.Fragment>
            <SideNav
                onSelect={(selected) => {

                }}
            >
                <SideNav.Toggle />
                <SideNav.Nav>

                <NavItem eventKey="home">
                <NavIcon>
                <Tooltip title="Homepage">
                    <div className="icon">
                        <Link to='/home'>
                            <i class="fa fa-home" aria-hidden="true"></i>
                        </Link>
                    </div>
                </Tooltip>
                </NavIcon>
                <NavText>
                    <div className="label">
                        <Link to='/home'>
                            <span>Homepage</span>
                        </Link>
                    </div>
                </NavText>
            </NavItem>

                    <NavItem eventKey="profile">
                        <NavIcon>
                        <Tooltip title="Profile">
                            <div className="icon">
                                <Link to='/profile'>
                                    <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                                </Link>
                            </div>
                        </Tooltip>
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
                    <Tooltip title="Chat">
                        <div className="icon">
                            <Link to='/posts'>
                                <i class="fa fa-comments" aria-hidden="true"></i>
                            </Link>
                        </div>
                        </Tooltip>
                    </NavIcon>
                    <NavText>
                        <div className="label">
                            <Link to='/posts'>
                                <span>Chat</span>
                            </Link>
                        </div>
                    </NavText>
                </NavItem>

                    <NavItem eventKey="articles">
                        <NavIcon>
                        <Tooltip title="Saved Articles">
                            <div className="icon">
                                <Link to='/myarticles'>
                                    <i className="fa fa-bookmark" aria-hidden="true"></i>
                                </Link>
                            </div>
                            </Tooltip>
                        </NavIcon>
                        <NavText>
                            <div className="label">
                                <Link to='/myarticles'>
                                    <span>Saved Articles</span>
                                </Link>
                            </div>
                        </NavText>
                    </NavItem>
                   
                    <NavItem eventKey="logout">
                        <NavIcon>
                        <Tooltip title="Log Out">
                            <div className="icon" onClick={context.logout}>
                                <Link to='/'>
                                    <i class="fa fa-power-off" aria-hidden="true"></i>
                                </Link>
                            </div>
                            </Tooltip>
                        </NavIcon>
                        <NavText>
                            <div className="label" onClick={context.logout}>
                                <Link to='/'>
                                    <span>Log Out</span>
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
