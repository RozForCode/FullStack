// localhost:3000/article/learn-node
//example of url - using hook useParams
import { useParams } from "react-router-dom";
import articles from "./article-content";

const ArticlePage = () => {
    const params = useParams();
    const articleId = params.articleId;
    const article = articles.find(article => article.name === articleId)
    // or const {articleId} = params
    // or const {articleId} = useParams;
    return (
        <>

            <h1>This is the Article page for article with id: {articleId}!</h1>
            {article.content.map(p => (
                <p>{p}</p>
            ))}
        </>
    )
}

export default ArticlePage;