import { useCallback, useEffect, useState } from 'react';
import { ErrorBlock, List, NavBar, Popup, PullToRefresh, Space, SpinLoading } from 'antd-mobile';
import { AddCircleOutline } from 'antd-mobile-icons';
import { getHostList } from '@/utils/api';
import { Host } from '@/types';
import HostInfo from '../HostInfo';
import './style.less';

export default function () {
    const [isLoading, setIsLoading] = useState(false);

    const [data, setData] = useState<Host[]>([]);
    const getList = useCallback(async () => {
        setIsLoading(true);
        const res = await getHostList();
        setData(res);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        getList();
    }, []);

    const [currentHost, setCurrentHost] = useState<Host>();

    return (
        <>
            <NavBar
                back={null}
                right={
                    <AddCircleOutline
                        fontSize={24}
                        onClick={() => {
                            setCurrentHost({} as Host);
                        }}
                    />
                }
                className="top-nav-bar"
            >
                <Space align="center">
                    {isLoading && <SpinLoading color="default" style={{ '--size': '18px' }} />}
                    <span>Host List</span>
                </Space>
            </NavBar>
            <div className="body">
                <PullToRefresh onRefresh={getList}>
                    <div className="host-list-wrap">
                        {data?.length > 0 && (
                            <List>
                                {data?.map((host) => (
                                    <List.Item
                                        key={host.id}
                                        extra={host.host}
                                        onClick={() => {
                                            setCurrentHost(host);
                                        }}
                                    >
                                        {host.name}
                                    </List.Item>
                                ))}
                            </List>
                        )}
                        {data?.length === 0 && (
                            <ErrorBlock
                                status="empty"
                                title="Hmm, couldn't find data..."
                                description={null}
                                fullPage
                            />
                        )}
                    </div>
                </PullToRefresh>
            </div>
            <Popup
                visible={!!currentHost}
                onMaskClick={() => {
                    setCurrentHost(undefined);
                }}
                position="right"
                bodyStyle={{ width: '80vw' }}
            >
                <HostInfo
                    host={currentHost!}
                    onSave={() => {
                        setCurrentHost(undefined);
                        getList();
                    }}
                    onRemove={() => {
                        setCurrentHost(undefined);
                        getList();
                    }}
                />
            </Popup>
        </>
    );
}
