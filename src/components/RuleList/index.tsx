import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ErrorBlock, List, PullToRefresh, SpinLoading } from 'antd-mobile';
import { getConfig } from '@/utils/store';
import { getHostList, getRuleList } from '@/utils/api';
import './style.less';

export default function () {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (!getConfig()) {
            navigate('/settings');
        }
    }, []);

    const [data, setData] = useState<any[]>([]);
    const getList = useCallback(async () => {
        setIsLoading(true);
        const res = await getRuleList();
        const hostRes = await getHostList();
        setIsLoading(false);

        const hostMap = hostRes.reduce((acc, cur) => {
            acc[cur.id] = cur;
            return acc;
        }, {});

        const ruleList = res.map((rule) => {
            return {
                domain: rule[0],
                host: rule[1].map((hostId) => hostMap[hostId]),
            };
        });

        setData(ruleList);
    }, []);

    useEffect(() => {
        getList();
    }, []);

    return (
        <PullToRefresh onRefresh={getList}>
            <div className="rule-list-wrap">
                {data?.length > 0 && (
                    <List>
                        {data?.map((rule) => (
                            <List.Item
                                key={rule.domain}
                                extra={rule.host.map((h) => h.name).join(',')}
                                onClick={() => {}}
                            >
                                {rule.domain}
                            </List.Item>
                        ))}
                    </List>
                )}
                {data?.length === 0 && (
                    <ErrorBlock
                        status="empty"
                        title="Hmm, couldn't find data..."
                        description={
                            <Button color="primary" size="mini" onClick={getList}>
                                Add Rule
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
    );
}
