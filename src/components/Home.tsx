import { useEffect } from 'react';
import { getConfig } from '@/utils/store';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
    useEffect(() => {
        const config = getConfig();
        if (config) {
            navigate('/hosts', { replace: true });
        } else {
            navigate('/settings', { replace: true });
        }
    }, []);

    return null;
}
