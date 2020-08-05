import React from 'react';
import UserArticles from './user-articles';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import cookie from 'react-cookies';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
// import axiosConfig from '../axios-config';

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
        // if (document.getElementById(this.state.id)) this.deleteArticle();
        // else {

        let url = `https://talkitover-staging.herokuapp.com/user-articles/${this.props.id}`;
        let url1 = `https://talkitover-staging.herokuapp.com/user-articles/`;
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
        const response1 = await axios.get(url1, axiosConfig);
        console.log(response1.data.articles);
        if (response1.data.articles.length > 0) {
            let articlesArr = response1.data.articles.filter(article => {
                if (article._id === this.props.id) return article;
            });
            if (articlesArr.length > 0) {
                return
            }
            else {
                console.log('else')
                const save = async () => {
                    const axiosConfig = {
                        mode: 'cors',
                        cache: 'no-cache',
                        credentials: 'same-origin',
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'cookies': `${cookie.load('remember token')}`,
                        },
                        redirect: 'follow',
                        referrerPolicy: 'no-referrer',
                    };
                    // axiosConfig['method'] = 'POST';
                    const response = await fetch(url, axiosConfig);
                    console.log(response);
                }
                save();
            }
        }
        else {
            const axiosConfig = {
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'cookies': `${cookie.load('remember token')}`,
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
            };
            const response = await fetch(url, axiosConfig);
        }
        // console.log(response);
        // document.querySelector('.bookmark-icon').style.color='rgb(111, 197, 186)';
        // }
    }

    deleteArticle = async (e) => {
        let url = `https://talkitover-staging.herokuapp.com/user-articles/${this.props.id}`;
        const axiosConfig = {
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'cookies': `${cookie.load('remember token')}`,
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        };
        const response = await fetch(url, axiosConfig);
        console.log(response);
        document.getElementById(this.state.id).remove();
    }

    render() {
        
        if (this.state.add === true)
            // return <span onClick={this.saveArticle} ><i className="fa fa-bookmark" aria-hidden="true"></i></span>
            return (
                <Tooltip title="Save Article">
                    <IconButton aria-label="add to favorites" >
                        <BookmarkIcon className="bookmark-icon " style={{ color: '#b7b7b7' }} onClick={this.saveArticle} />
                    </IconButton>
                </Tooltip>
            )

        if (this.state.delete === true)
            return (
                <Tooltip title="Remove Article">
                    <IconButton aria-label="add to favorites" >
                        <BookmarkIcon style={{ color: 'rgb(111, 197, 186)' }} onClick={this.deleteArticle} />
                    </IconButton>
                </Tooltip>
            )
    }
}

export default SavedArticle;
