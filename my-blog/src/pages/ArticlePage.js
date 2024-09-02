// localhost:3000/article/learn-node
//example of url - using hook useParams
import { useParams } from "react-router-dom";
import articles from "./article-content";
import NotFoundPage from "./NotFoundPage";
import { useState, useEffect } from "react";
import axios from 'axios';
import AddCommentForm from "../components/AddCommentForm";




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
    const addUpvote = async () => {
        const response = await axios.put(`/api/articles/${articleId}/upvote`);
        const updatedArticle = response.data;
        setArticleInfo(updatedArticle);
    }
    // or const {articleId} = params
    // or const {articleId} = useParams;
    if (!article) {
        return (<NotFoundPage />)
    }
    return (
        <>

            <h1>This is the Article page for article with id: {articleId}!</h1>
            <div className="upvotes-section">
                <h3>This is article has {articleInfo.upvotes} upvotes!</h3>
                <button onClick={addUpvote}>Upvote</button>
            </div>

            <h2>Article Content</h2>
            {article.content.map(p => (
                <p key={p}>{p}</p>
            ))}
            <h3>Comments</h3>
            <AddCommentForm articleName={articleId} onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)} />

            {articleInfo.comments.map(
                p => (
                    <div className='comment' key={p.postedBy}>User - {p.postedBy} Posted <br /> {p.text}</div>
                )
            )}
        </>
    )
}

export default ArticlePage;