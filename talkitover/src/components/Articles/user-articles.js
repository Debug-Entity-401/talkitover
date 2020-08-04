import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';
import Article from '../Articles/Articles.js';
import {Row,Col} from 'react-bootstrap';
import Loader from 'react-loader-spinner';
import './styles/articles.scss';
import cookie from 'react-cookies';


//get all user articles
//delete selected article
function UserArticles() {

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
      }, [])

    const renderUserArticles = () => {
      if(userArticles.length > 0) { 
        return (
        <React.Fragment>
        <Row>
        <Col xs={6} sm={6} md={1}>
        <aside id="sidebar">
        <Sidebar />
      </aside>
      </Col>
      <Col xs={6} sm={6} md={11}>
        <main id="user-articles-body">
        <h2 id="user-articles-heading">Favourite Articles:</h2>
        <hr id="gradiant-trans-hr"/>
        <div className="articles">
            <ul>
            <Article articles={userArticles} add={false} delete={true} />
            </ul>
        </div>
        </main>
        </Col>
        </Row>
        </React.Fragment>
    )
    }
    else {
      return (
          <>
          <div className="saved-articles">
          <Row>
        <Col xs={6} sm={6} md={1}>
        <aside id="sidebar">
        <Sidebar />
      </aside>
      </Col>
      <Col xs={6} sm={6} md={11}>
        <div >
          <h2 id="user-articles-heading">Favourite Articles:</h2>
          <h3>No Articles Saved Yet..</h3>
        </div>
          </Col>
          </Row>
          </div>
          </>
      )
    }
  }

return (
  <>
  {/*<Loader
         type="Circles"
         color="#00BFFF"
         height={100}
         width={100}
         timeout={500} 
 
/>*/}
  {renderUserArticles()}
  </>
)
    
}


export default UserArticles;
