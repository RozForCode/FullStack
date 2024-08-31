import articles from "./article-content";
import ArticlesList from "../components/ArticlesList";
const ArticleList = () => {
    return (
        //all lists in react should have a key prop
        // if list doesn't change just use index
        <>
            <h1>This is the Article List page!</h1>
            <ArticlesList articles={articles} />
        </>
    )
}

export default ArticleList;