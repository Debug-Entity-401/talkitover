import React from 'react';

//a general functional component that returns an article as a list element 

function Article(props) {
    return (
        <li>
            <a href={props.url}> {props.title} </a>
            <p> {props.text} </p>    
        </li>
    )
}

export default Article;
