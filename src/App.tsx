import enUS from 'antd-mobile/es/locales/en-US';
import { ConfigProvider } from 'antd-mobile';
import { Route, HashRouter, Routes } from 'react-router-dom';

import Home from '@/components/Home';
import Settings from '@/components/Settings';
import HostList from '@/components/HostList';
import RuleList from '@/components/RuleList';
import BottomTab from '@/components/BottomTab';

export default function App() {
    return (
        <ConfigProvider locale={enUS}>
            <HashRouter>
                <div className="main-app">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/hosts" element={<HostList />} />
                        <Route path="/rules" element={<RuleList />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>
                    <BottomTab />
                </div>
            </HashRouter>
        </ConfigProvider>
    );
}
