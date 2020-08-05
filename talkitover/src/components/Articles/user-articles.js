import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';
import Article from '../Articles/Articles.js';
import {Row,Col} from 'react-bootstrap';
import Loader from 'react-loader-spinner';
import './styles/articles.scss';
import cookie from 'react-cookies';
// import { Redirect } from 'react-router-dom';


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
      <div className="waves">
      <svg  id="parent-wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
    <path fill="#6fc5ba" fill-opacity="1" d="M0,288L40,293.3C80,299,160,309,240,288C320,267,400,213,480,186.7C560,160,640,160,720,176C800,192,880,224,960,245.3C1040,267,1120,277,1200,261.3C1280,245,1360,203,1400,181.3L1440,160L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path>
  </svg>
  </div>
        <main id="user-articles-body">
        <h2 id="user-articles-heading">Favourite Articles:</h2>
        <hr id="gradiant-trans-hr"/>
        <div className="articles">
        <ul>
        <Row>
            <Article articles={userArticles} add={false} delete={true} />
            </Row>
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
          <div className="loader-div">
          <Loader className="loader" type="Circles" color="#00BFFF" height={100} width={100} />
          </div>
          {/* <div className="saved-articles">
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
          </div> */}
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
