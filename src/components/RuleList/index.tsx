import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ErrorBlock, List, NavBar, Popup, PullToRefresh, SpinLoading } from 'antd-mobile';
import { getConfig } from '@/utils/store';
import { Rule } from '@/types';
import { getHostList, getRuleList } from '@/utils/api';
import TopNavBar from '../TopNavBar';
import RuleInfo from '../RuleInfo';
import './style.less';
import { AddCircleOutline } from 'antd-mobile-icons';

export default function () {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!getConfig()) {
      navigate('/settings');
    }
  }, []);

  const [hostMap, setHostMap] = useState<any>();
  useEffect(() => {
    (async () => {
      const hostList = await getHostList();
      const map: any = {};
      hostList.forEach((host) => {
        map[host.id] = host;
      });
      setHostMap(map);
    })();
  }, []);

  const [data, setData] = useState<any[]>([]);
  const getList = useCallback(async () => {
    setIsLoading(true);
    const res = await getRuleList();
    setIsLoading(false);

    setData(res);
  }, [hostMap]);

  useEffect(() => {
    getList();
  }, []);

  const [currentRule, setCurrentRule] = useState<Rule>();

  return (
    <>
      <NavBar
        back={null}
        right={
          <AddCircleOutline
            fontSize={24}
            onClick={() => {
              setCurrentRule(['', []]);
            }}
          />
        }
        className="top-nav-bar"
      >
        Rule List
      </NavBar>
      <div className="body">
        <PullToRefresh onRefresh={getList}>
          <div className="rule-list-wrap">
            {data?.length > 0 && !isLoading && (
              <List>
                {data?.map((rule) => (
                  <List.Item
                    key={rule[0]}
                    extra={rule[1].map((id) => hostMap[id]?.name).join(',')}
                    onClick={() => {
                      setCurrentRule(rule);
                    }}
                  >
                    {rule[0]}
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
      </div>
      <Popup
        visible={!!currentRule}
        onMaskClick={() => {
          setCurrentRule(undefined);
        }}
        position="right"
        bodyStyle={{ width: '80vw' }}
      >
        <RuleInfo
          rule={currentRule!}
          hostMap={hostMap}
          onSave={() => {
            setCurrentRule(undefined);
            getList();
          }}
          onRemove={() => {
            setCurrentRule(undefined);
            getList();
          }}
        />
      </Popup>
    </>
  );
}
