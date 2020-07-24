import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Article from '../Articles/Articles.js';

function Homepage(props) {
    const [articles, setArticles] = useState([]);

    //add a useEffect hook
    //use an async function to hit the articles route and get the articles
   //use useEffect to render the Articles component on every refresh/reload 
  //render the Articles component after passing down the props
  
  let axiosConfig = {
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Cookie':document.cookie,  
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  }

// const axiosConfig = {
//     mode: 'cors',
//     headers: {
//     'content-Type': 'application/json',
//     "Accept": "/",
//     "Cache-Control": "no-cache",
//     "Cookie": document.cookie
//     },
//     credentials: "same-origin"
//     };
    // axios.defaults.withCredentials = true;
    // axios.get('/url',
    // axiosConfig)
    // .then((res) => {
    // // Some result here
    // })
    // .catch((err) => {
    // console.log(':(');
    // });

  function fetchArticles(){
    document.cookie="remember token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJidXNocmFiaWxhbCIsImNhcGFiaWxpdGllcyI6WyJSRUFEIiwiQ1JFQVRFIiwiUE9TVCJdLCJyb2xlIjoidmVudG9yIiwiaWF0IjoxNTk1NTkyNTk1fQ.3Ko60QDqUwRFCUogSbnWPDjC1l4XRNEE8ZQ8FWZQve8;expires=session;domain=talkitover-staging.herokuapp.com";
    console.log('__Cookie__: ', document.cookie);
    var cookieToken = document.cookie; //// here must send the cookie responsed from login
    //////XMLHTTPREQUEST////
    var xmlHttp = new XMLHttpRequest;
    var results;
    var params = 'cookie=' + cookieToken;
    xmlHttp.open('GET','https://talkitover-staging.herokuapp.com/home?' + params, true);
    xmlHttp.send();
    xmlHttp.onreadystatechange = function(){
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
            results = xmlHttp.responseText;
        }
    }

    ////END XMLHTTPREQUEST///
    //const results = await fetch("https://talkitover-staging.herokuapp.com/home"); 
    // setArticles(results.data);
   console.log(results);
    //const data = await results.json();
    
   };  
   fetchArticles();
//    useEffect( () => {
//        const fetchArticles = async () => {
//         const results = await fetch("https://swapi.dev/api/people/"); 
//         // setArticles(results.data);
//         const data = await results.json();
//         console.log(data);
//        };
//        fetchArticles();
//        console.log(articles);
//    }, [])
   
   return (
       <>
       <h1>Welcome To Homepage!</h1>
       <div>
            {articles}
       </div>
       </>
   )
}

export default Homepage;
