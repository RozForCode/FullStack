// localhost:3000/article/learn-node
//example of url - using hook useParams
import { useParams } from "react-router-dom";
import articles from "./article-content";
import NotFoundPage from "./NotFoundPage";
import { useState, useEffect } from "react";
import axios from 'axios';



const ArticlePage = () => {
    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] })
    const { articleId } = useParams();


    useEffect(() => {
        const loadArticleInfo = async () => {
            const response = await axios.get(`/api/articles/${articleId}`)
            const newArticleInfo = response.data;
            console.log(newArticleInfo);
            setArticleInfo(newArticleInfo)

        }
        loadArticleInfo();
    }, [])
    const article = articles.find(article => article.name === articleId)

    // or const {articleId} = params
    // or const {articleId} = useParams;
    if (!article) {
        return (<NotFoundPage />)
    }
    return (
        <>

            <h1>This is the Article page for article with id: {articleId}!</h1>
            <h2>This is article has {articleInfo.upvotes} upvotes!</h2>
            <h3>Comments</h3>
            <ul>
                {articleInfo.comments.map(
                    p => (
                        <li key={p.postedBy}>{p.postedBy} says {p.text}</li>
                    )
                )}
            </ul>
            <h2>Article Content</h2>
            {article.content.map(p => (
                <p key={p}>{p}</p>
            ))}
        </>
    )
}

export default ArticlePage;