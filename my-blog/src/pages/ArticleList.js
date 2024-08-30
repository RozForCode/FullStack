import articles from "./article-content";
import { Link } from 'react-router-dom';

const ArticleList = () => {
    return (
        //all lists in react should have a key prop
        // if list doesn't change just use index
        <>
            <h1>This is the Article List page!</h1>
            {articles.map(article => (
                <Link className='article-list-item' to={`/articles/${article.name}`}>
                    <h3 key={article.name}>{article.title}</h3>
                    <p key={article.name}>{article.content[0].substring(0, 100)}...</p>
                </Link>
            ))}
        </>
    )
}

export default ArticleList;