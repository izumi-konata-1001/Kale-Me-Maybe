import { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import { getCookie } from './getCookie';

export default function LoginSuccess() {
    const navigate = useNavigate();
    const location = useLocation();

    const { login } = useContext(AuthContext);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const username = queryParams.get('username');
        const useravatar = queryParams.get('useravatar');
        const userid = queryParams.get('userid');
        const authToken = getCookie('authToken');

        if (authToken && username && useravatar && userid){
            login(authToken, username, useravatar, userid);
            navigate('/');
        } else {
            navigate('/log-in');
        }
    }, [navigate, location]);

    return <div>Redirecting...</div>;
}
