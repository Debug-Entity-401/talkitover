import React,{useEffect, useState,useContext} from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import SideNav, { NavItem, NavIcon, NavText, } from '@trendmicro/react-sidenav';
import Badge from '@material-ui/core/Badge';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import './styles/sidebar.scss';
import { getPost} from '../../store/posts';
import axios from 'axios';
import axiosConfig from '../axios-config';
import { LoginContext } from '../auth/context';
import Article from '../Articles/Articles.js';

function Sidebar(props) {
    
    useEffect(() => {
        props.getPost();
    }, []);
    const [userArticles, setUserArticles] = useState([]);
    let url = "https://talkitover-staging.herokuapp.com/";

    const fetchUserArticles = async () => {
        const getUserArticles = await axios.get(url + "user-articles", axiosConfig);
        const articlesArr = await getUserArticles.data;
        setUserArticles(articlesArr.articles);
      };
    
      const getAllUserArticles = () => {
        fetchUserArticles();
      }

      useEffect(() => {
        getAllUserArticles();
      }, [])


   
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
                        <Badge badgeContent={props.posts.counter} color="primary">
                            <Link to='/posts'>

                            <i class="fa fa-comment" aria-hidden="true"></i>
                            </Link>
                            </Badge>
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
                            <Badge badgeContent={userArticles.length} color="primary">

                                <Link to='/myarticles'>
                                    <i className="fa fa-bookmark" aria-hidden="true"></i>
                                </Link>
                                </Badge>
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

const mapStateToProps = state => ({
    posts: state.posts,
});
const mapDispatchToProps = { getPost};
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
