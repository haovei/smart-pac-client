import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ErrorBlock, List, PullToRefresh, SpinLoading } from 'antd-mobile';
import { getConfig } from '@/utils/store';
import { getHostList } from '@/utils/api';
import './style.less';
import { Host } from '@/types';

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

    return (
        <PullToRefresh onRefresh={getList}>
            <div className="host-list-wrap">
                {data?.length > 0 && (
                    <List>
                        {data?.map((host) => (
                            <List.Item key={host.id} extra={host.host} onClick={() => {}}>
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
                    <div className='loading-box'>
                        <SpinLoading color='primary' />
                    </div>
                )}
            </div>
        </PullToRefresh>
    );
}
