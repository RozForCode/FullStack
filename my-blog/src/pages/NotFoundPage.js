// const NotFoundPage = () =>
// (
//     <h1>Not found Error 404</h1>
// );
import { useLocation } from "react-router-dom";
const NotFoundPage = () => {
    const location = useLocation();
    return (
        <>
            <h1>Not found Error 404</h1>
            <p>No article named <code>{(location.pathname).substring(1)}</code> exists</p>

        </>
    )
}
export default NotFoundPage;