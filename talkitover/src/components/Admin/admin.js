import React,{useEffect} from 'react';
import {connect } from 'react-redux';
import {getArticles, addArticle, deleteArticle, updateArticle} from '../../store/admin';


const Admin = (props) =>{
    const handelSubmit=(e)=>{
        e.preventDefault();
        console.log(e.target.name);
        let title= e.target.title.value;
        let url = e.target.url.value;
        let status = e.target.status.value;
        let text = e.target.text.value;
        // console.log('from admin page=> ',`${title} ${url} ${status} ${text}`);
        let obj = {title,url,status,text}
        props.addArticle(obj);
    }

    function renderArticleForm(){
        return <div>
            <form onSubmit={handelSubmit}>
                <p>title</p>
            <input type='text' name='title'/>
            <p>url</p>

            <input type='text' name='url'/>
            <div>
                <p>new</p>
                <input type='radio' name='status' value='new'/>
                <p>old</p>
                <input type='radio' name='status' value='old'/>
            </div>
            <p>text</p>
            <textarea name='text'/>
            <button type='submit'>OK</button>
            </form>
        </div>
    }

    return(
        <>
{renderArticleForm()}
        </>
    )
}
const mapToProps = state =>({
    admin : state.admin,
});
const mapToDispatch = {addArticle};

export default connect(mapToProps,mapToDispatch) (Admin);
