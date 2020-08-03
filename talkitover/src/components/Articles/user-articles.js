import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosConfig from '../axios-config';
import Article from '../Articles/Articles.js';
import './styles/articles.scss';


//get all user articles
//delete selected article
function UserArticles() {

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


    if(userArticles.length > 0) { 
            return (
            <React.Fragment>
            <main id="user-articles-body">
            <h2 id="user-articles-heading">Favourite Articles:</h2>
            <hr id="gradiant-trans-hr"/>
            <div className="articles">
                <ul>
                <Article articles={userArticles} add={false} delete={true} />
                </ul>
            </div>
            </main>
            </React.Fragment>
        )
    }
    return (
        <>
        <div className="saved-articles">
        <h2 id="user-articles-heading">Favourite Articles:</h2>
        <h3>No Articles Saved Yet..</h3>
        </div>
        </>
    )
    
}


export default UserArticles;
