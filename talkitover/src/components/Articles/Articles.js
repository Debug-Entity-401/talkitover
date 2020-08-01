import React from 'react';
import SavedArticle from './add-delete-article';
import './styles/articles.scss';

//a general class component that returns articles as list elements 

class Article extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        articles: this.props.articles,
        add: this.props.add,
        delete: this.props.delete,
      }
    }

    render() {
      if(this.state.articles) {
          return (
            this.state.articles.map((article, idx) => {
                return (
                  <>
                    <li key={idx} id={article._id} className="article-li">
                        <a href={article.url}> {article.title} </a>
                        <p> {article.text} </p>  
                        <SavedArticle id={article._id} add={this.state.add} delete={this.state.delete} />
                        <hr className="drop-shadow-hr"/>
                    </li>
                    </>
                )
              })
            ) 
        }
        return(
          <>
          </>
        )
    } 
  }


export default Article;
