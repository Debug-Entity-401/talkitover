import React from 'react';
import UserArticles from './user-articles';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import BookmarkIcon from '@material-ui/icons/Bookmark';
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
        let color = document.querySelector('.bookmark-icon').style.color;
        color = 'rgb(111, 197, 186)';
        console.log(color);
        }

    deleteArticle = async (e) => {
        let url = `http://localhost:3031/user-articles/${this.props.id}`;
        axiosConfig['method'] = 'DELETE';
        const response = await fetch(url, axiosConfig);
        document.getElementById(this.state.id).remove();
    }
    
    render() {
        if (this.state.add === true)
            // return <span onClick={this.saveArticle} ><i className="fa fa-bookmark" aria-hidden="true"></i></span>
            return (
                <Tooltip title="Save Article">
                    <IconButton aria-label="add to favorites" >
                      <BookmarkIcon className="bookmark-icon" style={{ color: '#b7b7b7'}} onClick={this.saveArticle}/>
                    </IconButton>
               </Tooltip>
            )
        
        if (this.state.delete === true)
            return (
                <Tooltip title="Remove Article">
                   <IconButton aria-label="add to favorites" >
                      <BookmarkIcon style={{ color: '#b7b7b7'}} onClick={this.deleteArticle}/>
                   </IconButton>
               </Tooltip>
            )
    }
}

export default SavedArticle;
