// localhost:3000/article/learn-node
//example of url - using hook useParams
import { useParams } from "react-router-dom";
import articles from "./article-content";
import NotFoundPage from "./NotFoundPage";
import { useState, useEffect } from "react";
import axios from 'axios';
import AddCommentForm from "../components/AddCommentForm";
import useUser from "../hooks/useUser";
import { Link } from 'react-router-dom';


const ArticlePage = () => {
    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [], canUpvote: false })
    const { canUpvote } = articleInfo;
    const { articleId } = useParams();
    const { user, isLoading } = useUser();

    useEffect(() => {
        const loadArticleInfo = async () => {
            const token = user && await user.getIdToken();
            const headers = token ? { authToken: token } : {};
            const response = await axios.get(`/api/articles/${articleId}`, {
                headers,
            })
            const newArticleInfo = response.data;
            console.log(newArticleInfo);
            setArticleInfo(newArticleInfo)

        }
        if (isLoading) {
            loadArticleInfo();
        }
    }, [isLoading, user])
    const article = articles.find(article => article.name === articleId)


    const addUpvote = async () => {
        const token = user && await user.getIdToken();
        const headers = token ? { authToken: token } : {};
        const response = await axios.put(`/api/articles/${articleId}/upvote`, null, { headers });
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
                {user ?
                    <button onClick={addUpvote}>{canUpvote ? 'UpVote' : 'Already Upvoted'}</button> :
                    <Link to='/login'>
                        <button>Log In to upvote</button>
                    </Link>}

            </div>

            <h2>Article Content</h2>
            {article.content.map(p => (
                <p key={p}>{p}</p>
            ))}
            <h3>Comments</h3>
            {user ?
                <AddCommentForm articleName={articleId} onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)} /> :
                <Link to='/login'>
                    <button >Log In to comment</button>
                </Link>
            }

            {articleInfo.comments.map(
                p => (
                    <div className='comment' key={p.postedBy}>User - {p.postedBy} Posted <br /> {p.text}</div>
                )
            )}
        </>
    )
}

export default ArticlePage;