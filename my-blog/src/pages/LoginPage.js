
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const Navigate = useNavigate();
    const logIn = async () => {
        try {
            await signInWithEmailAndPassword(getAuth(), email, password);
            Navigate('/articles');
        }
        catch (error) {
            setError(error.message)
        }
    }

    return (
        <>
            <h1>Login In</h1>
            {error && <p className='error'>{error}</p>}
            <input type='text' value={email} onChange={e => setEmail(e.target.value)} />
            <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={logIn}>Log In</button>
            <Link className="login-link" to="/create-account">Don't have an account? Create one here</Link>
        </>
    )
}
export default LoginPage;