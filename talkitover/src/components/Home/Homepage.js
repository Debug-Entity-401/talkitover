import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import axiosConfig from '../axios-config';
import { LoginContext } from '../auth/context';
import Article from '../Articles/Articles.js';
import Sidebar from '../Sidebar/Sidebar';
import {Row,Col} from 'react-bootstrap';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
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
  
  // if (username) {
    const fetchArticles = async () => {
      try{
        const getArticles = await axios.get(`${url}articles`, axiosConfig);
        const articlesArr = await getArticles.data;
        setArticles(articlesArr);
      }
      catch(e){
        console.error();
      }
    };
  // }
  const getAllArticles = () => {
    // setTimeout(()=>{
      if(username) fetchArticles();
    // }, 1000)
  }
  //fetch the articles on every re-render
  useEffect(() => {
    console.log(document.querySelector('footer'));
    document.querySelector('footer').removeAttribute('class');
    getAllArticles();
  }, [username])


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
    <div className="waves">
    <svg  id="parent-wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
  <path fill="#6fc5ba" fill-opacity="1" d="M0,288L40,293.3C80,299,160,309,240,288C320,267,400,213,480,186.7C560,160,640,160,720,176C800,192,880,224,960,245.3C1040,267,1120,277,1200,261.3C1280,245,1360,203,1400,181.3L1440,160L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path>
</svg>
</div>
<main id="home-body">
      <h2 id="articles-heading">Selected Articles:</h2>
      <hr id="gradiant-trans-hr"/>
      <div className="articles">
        <ul className="articles-flexbox">
          <Row>
           <Article articles={articles} add={true} delete={false} />
          </Row>
        </ul>
      </div>
    </main>
    </Col>
    </Row>
    </div>
    </>
  )
} 
if(username) {
  return(
    <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />

 
    
  )
}
////for unsigned-in users
return (
  <React.Fragment>
  
  </React.Fragment>
)
  
}

export default Homepage;
