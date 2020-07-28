import React from 'react';
import './styles/articles.scss';
//a general functional component that returns an article as a list element 

function Article(props) {
    return (
        <>
        <ul>
        {
          props.articles.map((article, idx) => {
            return (
                <>
                <li key={idx}>
                    <a href={article.url}> {article.title} </a>
                    <p> {article.text} </p>    
                </li>
                <hr className="drop-shadow-hr"/>
                </>
            )
          })
        }
      </ul>
      </>
    )
}

export default Article;
