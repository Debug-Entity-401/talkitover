import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import axiosConfig from '../axios-config';
import { LoginContext } from '../auth/context';
import Article from '../Articles/Articles.js';
import Sidebar from '../Sidebar/Sidebar';
import {Row,Col,Container} from 'react-bootstrap';
import './styles/home.scss';


//Homepage functional component:
/**
 ** renders the articles and the sidebar
 * -> fetch the articles and store them in a state
 * -> pass the fetched articles to the Articles component and render it in a list
 * -> render the Sidebar component
 */
function Homepage() {

  const [articles, setArticles] = useState([]);  //store the fetched articles
  const contextValue = useContext(LoginContext);  // use the context api to get the username of the signed-in user
  const username = contextValue.user.user_name;
  let url = "https://talkitover-staging.herokuapp.com/";
  
  const fetchArticles = async () => {
    const getArticles = await axios.get(url + "articles", axiosConfig);
    const articlesArr = await getArticles.data;
    setArticles(articlesArr);
  };

  const getAllArticles = () => {
    fetchArticles();
  }
  //fetch the articles on every re-render
  useEffect(() => {
    getAllArticles();
  }, [])

//control rendering according to whether the user is signed-in or not
////for signed-in users
if (username && articles.length > 0) {  
  return (
    <>

    <div id="home">
    <Row>
    <Col xs={6} sm={6} md={1}>

    <aside id="sidebar">
    <Sidebar />
  </aside>
  </Col>
  <Col xs={6} sm={6} md={11}>
    <main id="home-body">
      <h1 id="home-welcome">Welcome To Homepage, {username}.</h1>
      <h2 id="articles-heading">Selected Articles:</h2>
      <hr id="gradiant-trans-hr"/>
      <div className="articles">
        <ul>
          <Article articles={articles} add={true} delete={false} />
        </ul>
      </div>
    </main>
    </Col>
    </Row>
    </div>
    </>
  )
} 
////for unsigned-in users
return (
  <React.Fragment>
  
  </React.Fragment>
)
  
}

export default Homepage;
