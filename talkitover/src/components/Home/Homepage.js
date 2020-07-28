import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import Article from '../Articles/Articles.js';
import Sidebar from '../Sidebar/Sidebar';
import './styles/home.scss';

let once = 0;

function Homepage(props) {
  const [articles, setArticles] = useState([]);
  const [username, setUsername] = useState("");  //NOTE: take the username from the global state
  let url = "https://talkitover-staging.herokuapp.com/";

  
  //add a useEffect hook
  //use an async function to hit the articles route and get the articles
  //use useEffect to render the Articles component on every refresh/reload 
  //render the Articles component after passing down the props

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
  
  const fetchArticles = async () => {
    const getArticles = await axios.get(url + "articles", axiosConfig);
    const articlesArr = await getArticles.data;
    setArticles(articlesArr);
    console.log('_FETCH_ :', articles);
  };

  const getAllArticles = () => {
    fetchArticles();
  }
  useEffect(() => {
    getAllArticles();
    console.log('_useEffect_ :', articles);
  }, [])

  async function fetchHome() {
    const getUsername = await axios.get(url + "home", axiosConfig);
    // const user_name = await getUsername.data;
    setUsername(getUsername.data);
    console.log(username);

  };
  if (once <= 1){
    fetchHome();
    once++;
  }
  // console.log('>>>>>>>>>', username);


  // async function fetchArticles() {
  //   let url = "https://talkitover-staging.herokuapp.com/"
  //   const getArticles = await axios.get(url + "articles", axiosConfig);
  //   const articles = getArticles.data;
  //   // setArticles(getArticles.data);
  //   console.log(articles);

  // };
  // fetchArticles();
  

if (articles.length > 0) {  
  return (
    <React.Fragment>
    <main id="home-body">
      <h1 id="home-welcome">Welcome To Homepage, {username}</h1>
      <h2 id="articles-heading">Selected Articles:</h2>
      <hr id="gradiant-trans-hr"/>
      <div className="articles">
        <Article articles={articles} />
      </div>
    </main>
      <Sidebar />
    </React.Fragment>
  )
} 
return (
  <React.Fragment>
  <h1>Welcome To Homepage, {username}</h1>
  </React.Fragment>
)
  
}

export default Homepage;
