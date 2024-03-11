import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { NavBar } from 'antd-mobile';
import { AddCircleOutline } from 'antd-mobile-icons';

type Props = {
    title?: string;
};

export default function ({ title }: Props) {
    const location = useLocation();
    const { pathname } = location;

    const RightButton = useCallback(() => {
        if (!['/hosts', '/rules'].includes(pathname)) {
            return null;
        }
        return <AddCircleOutline fontSize={24} />;
    }, [pathname]);

    return (
        <NavBar back={null} right={<RightButton />} className="top-nav-bar">
            {title ?? 'Smart PAC'}
        </NavBar>
    );
}
