// This will allow our users to get access to the logged in users

// const user = useUser();
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
const useUser = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        //the function automatically triggers the callback function with the current user's authentication state as the argument.
        const unsubscribe = onAuthStateChanged(getAuth(), user => {
            setUser(user);
            setIsLoading(false);

        });
        return unsubscribe;
    }, [])
    return { user, isLoading }
}
export default useUser;