import React from 'react';
import SavedArticle from './add-delete-article';
import './styles/articles.scss';
////////////////////////////////
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
 
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    // paddingTop: '56.25%', // 16:9
  },
}));

// const classes = useStyles();

function Article(props) {
  const classes = useStyles();
  // const [articles, setArticles] = React.useState([]);
  // setArticles(props.articles);
  let articles = props.articles;
  const _add = props.add;
  const _delete = props.delete;

  if(articles) {
    return (
      articles.map((article, idx) => {
          return (
            <>
              <li key={idx} id={article._id} className="article-li">
                  {/*<a href={article.url}> {article.title} </a>
          <p> {article.text} </p>  */}

                  <Card className={classes.root}>
                  <CardHeader
                    title={article.title}
                  />
                  <CardMedia
                    className={classes.media}
                    title={article.title}
                  />
                  <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {article.text}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <SavedArticle id={article._id} add={_add} delete={_delete} />
                    <Tooltip title="Read More">
                     <IconButton aria-label="open in a new tab" >
                        <a href={article.url}><OpenInNewIcon /></a>
                    </IconButton>
                  </Tooltip>
                  </CardActions>
                </Card>


                  {/*<SavedArticle id={article._id} add={this.state.add} delete={this.state.delete} />
        <hr className="drop-shadow-hr"/>*/}
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
  };


export default Article;
