import { useCallback, useMemo } from 'react';
import { TabBar, Toast } from 'antd-mobile';
import { useNavigate, useLocation } from 'react-router-dom';
import { UnorderedListOutline, FilterOutline, SetOutline } from 'antd-mobile-icons';
import { getConfig } from '@/utils/store';

export default () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;

    const setRouteActive = useCallback((value: string) => {
        if (getConfig()) {
            navigate(value, { replace: true });
        } else {
            Toast.show('Please set up the configuration first');
        }
    }, []);

    const tabs = useMemo(
        () => [
            {
                key: '/hosts',
                title: 'Hosts',
                icon: <UnorderedListOutline />,
            },
            {
                key: '/rules',
                title: 'Rules',
                icon: <FilterOutline />,
            },
            {
                key: '/settings',
                title: 'Settings',
                icon: <SetOutline />,
            },
        ],
        []
    );

    return (
        <div className="bottom">
            <TabBar activeKey={pathname} onChange={(value) => setRouteActive(value)}>
                {tabs.map((item) => (
                    <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                ))}
            </TabBar>
        </div>
    );
};
