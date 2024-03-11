import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ErrorBlock, List, Popup, PullToRefresh, SpinLoading } from 'antd-mobile';
import { getConfig } from '@/utils/store';
import { getHostList } from '@/utils/api';
import './style.less';
import { Host } from '@/types';
import HostInfo from '../HostInfo';
import TopNavBar from '../TopNavBar';

export default function () {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (!getConfig()) {
            navigate('/settings');
        }
    }, []);

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
            <TopNavBar title="Host List" />
            <div className="body">
                <PullToRefresh onRefresh={getList}>
                    <div className="host-list-wrap">
                        {data?.length > 0 && !isLoading && (
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
                        {data?.length === 0 && !isLoading && (
                            <ErrorBlock
                                status="empty"
                                title="Hmm, couldn't find data..."
                                description={
                                    <Button color="primary" size="mini" onClick={getList}>
                                        Add Host
                                    </Button>
                                }
                                fullPage
                            />
                        )}
                        {isLoading && (
                            <div className="loading-box">
                                <SpinLoading color="primary" />
                            </div>
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
                    }}
                />
            </Popup>
        </>
    );
}
