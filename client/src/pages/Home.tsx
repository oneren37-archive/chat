import React from 'react';
import useAuth from '../hooks/useAuth';

const Home = () => {
    const auth = useAuth();

    return (
        <div>
            <p>
                Hello there. This is Home page. U are logged as{' '}
                {auth.userData &&
                    auth.userData.data &&
                    auth.userData.data.login}
            </p>
            <button onClick={() => auth.onLogout()}>Разлогиниться</button>
        </div>
    );
};

export default Home;
