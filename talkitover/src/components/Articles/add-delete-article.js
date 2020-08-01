import React from 'react';
import UserArticles from './user-articles';
import axiosConfig from '../axios-config';

class SavedArticle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            add: this.props.add,
            delete: this.props.delete,
            id: this.props.id,
        };
    }
    
    saveArticle = async (e) => { 
        let url = `https://talkitover-staging.herokuapp.com/user-articles/${this.props.id}`;
        axiosConfig['method'] = 'POST';
        const response = await fetch(url, axiosConfig);
        }

    deleteArticle = async (e) => {
        let url = `http://localhost:3031/user-articles/${this.props.id}`;
        axiosConfig['method'] = 'DELETE';
        const response = await fetch(url, axiosConfig);
        document.getElementById(this.state.id).remove();
    }
    
    render() {
        if (this.state.add === true)
            return <span onClick={this.saveArticle} ><i className="fa fa-bookmark" aria-hidden="true"></i></span>
        
        if (this.state.delete === true)
            return <span onClick={this.deleteArticle} ><i className="fa fa-bookmark" aria-hidden="true"></i></span>
    }
}

export default SavedArticle;
