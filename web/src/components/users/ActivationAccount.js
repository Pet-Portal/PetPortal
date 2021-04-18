
import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import service from '../../services/users-service';
const ActivationAccount = () => {

    const history = useHistory()
    const search = useLocation().search;
    const token = new URLSearchParams(search).get('token');
    useEffect(() => {
        async function ActivateAccount () {   
            await service.activateAccount(token)
            history.push('/login')
        }
        ActivateAccount();
    }, [token, history])

    return (
        <div>
            Your Account is now activated!
        </div>
    )
}

export default ActivationAccount
