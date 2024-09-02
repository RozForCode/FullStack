
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const CreateAccountPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState('');

    const Navigate = useNavigate();
    const createAccount = async () => {
        try {
            if (password != confirm) {
                setError('Password and confirm password do not match');
                return;
            }
            await createUserWithEmailAndPassword(getAuth(), email, password);
            Navigate('/articles');
        } catch (e) {
            setError(e.message);
        }
    }


    return (
        <>
            <h1>Login In</h1>
            {error && <p className='error'>{error}</p>}
            <input type='text' value={email} onChange={e => setEmail(e.target.value)} />
            <input type='password' placeholder='Enter password' value={password} onChange={e => setPassword(e.target.value)} />
            <input type='password' placeholder='Re-enter to confirm password' value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={createAccount}>Create Account</button>
            <Link className="login-link" to="/login">Already have an account? Log In here</Link>
        </>
    )

}
export default CreateAccountPage;