import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getConfig } from '../../store';

export default function () {
    const navigate = useNavigate();
    useEffect(() => {
        if (!getConfig()) {
            navigate('/settings');
        }
    }, []);

    return <div>HostList</div>;
}
