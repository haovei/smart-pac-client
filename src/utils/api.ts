import { Host, Rule } from '@/types';
import { getConfig } from '@/utils/store';

// 获取 hostList 数据
export const getHostList = async () => {
    const config = getConfig();
    const prefix = config?.server ?? '';
    const res = await fetch(`${prefix}/api/hostList`, {
        headers: {
            Authorization: `Bearer ${config?.token}`,
        },
    });
    const data = await res.json() as Host[];
    return data;
};

// 获取 ruleList 数据
export const getRuleList = async () => {
    const config = getConfig();
    const prefix = config?.server ?? '';
    const res = await fetch(`${prefix}/api/ruleList`, {
        headers: {
            Authorization: `Bearer ${config?.token}`,
        },
    });
    const data = await res.json() as Rule[];
    return data;
};