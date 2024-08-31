import { Link } from 'react-router-dom';

const ArticlesList = ({ articles }) => {
    return (
        <>
            {articles.map(article => (
                <Link className='article-list-item' to={`/articles/${article.name}`}>
                    <h3 key={article.name}>{article.title}</h3>
                    <p key={article.name}>{article.content[0].substring(0, 100)}...</p>
                </Link>
            ))}
        </>
    )
}

export default ArticlesList;