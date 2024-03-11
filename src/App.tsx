import { NavBar, TabBar } from 'antd-mobile';
import { Route, BrowserRouter, useNavigate, Routes, useLocation } from 'react-router-dom';
import { UnorderedListOutline, FilterOutline, SetOutline } from 'antd-mobile-icons';
import Settings from './components/Settings';
import HostList from './components/HostList';
import RuleList from './components/RuleList';
import { FC } from 'react';

const Bottom: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;

    const setRouteActive = (value: string) => {
        navigate(value);
    };

    const tabs = [
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
    ];

    return (
        <TabBar activeKey={pathname} onChange={(value) => setRouteActive(value)}>
            {tabs.map((item) => (
                <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
            ))}
        </TabBar>
    );
};

export default function App() {
    return (
        <BrowserRouter>
            <div className="main-app">
                <div className="top">
                    <NavBar back={null}>Smart PAC</NavBar>
                </div>
                <div className="body">
                    <Routes>
                        <Route path="/hosts" element={<HostList />}></Route>
                        <Route path="/rules" element={<RuleList />}></Route>
                        <Route path="/settings" element={<Settings />}></Route>
                    </Routes>
                </div>
                <div className="bottom">
                    <Bottom />
                </div>
            </div>
        </BrowserRouter>
    );
}
