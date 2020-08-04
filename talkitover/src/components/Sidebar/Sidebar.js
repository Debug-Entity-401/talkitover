import React,{useEffect, useState,useContext} from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import './styles/sidebar.scss';
import { getPost} from '../../store/posts';
import axios from 'axios';
// import axiosConfig from '../axios-config';
import { LoginContext } from '../auth/context';
import cookie from 'react-cookies';

function Sidebar(props) {
    
    const context = useContext(LoginContext);
    useEffect(() => {
        props.getPost();
    }, [props.posts.counter]);

    const [userArticles, setUserArticles] = useState([]);

    let url = "https://talkitover-staging.herokuapp.com/";
    const axiosConfig = {
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'cookies': `${cookie.load('remember token')}`,
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
      };

    const fetchUserArticles = async () => {
        const getUserArticles = await axios.get(url + "user-articles", axiosConfig);
        const articlesArr = await getUserArticles.data;
        await setUserArticles(articlesArr.articles);
      };
    
      const getAllUserArticles = () => {
        fetchUserArticles();
      }

      useEffect(() => {
        getAllUserArticles();
      }, [userArticles])


   
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
                            <i className="fa fa-home" aria-hidden="true"></i>
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
                        <Badge badgeContent={props.posts.counter} color="primary">
                            <Link className="sidebar-link" to='/posts'>
                                <i className="fa fa-comments" aria-hidden="true"></i>
                            </Link>
                            </Badge>
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
                            <Badge badgeContent={userArticles.length} color="primary">

                                <Link className="sidebar-link" to='/myarticles'>
                                    <i className="fa fa-bookmark" aria-hidden="true"></i>
                                </Link>
                                </Badge>
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
                                    <i className="fa fa-power-off" aria-hidden="true"></i>
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

const mapStateToProps = state => ({
    posts: state.posts,
});
const mapDispatchToProps = { getPost};
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
