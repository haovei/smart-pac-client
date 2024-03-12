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
    const data = (await res.json()) as Host[];
    return data;
};

// 修改 host 数据
export const updateHost = async (host: Host) => {
    const config = getConfig();
    const prefix = config?.server ?? '';
    const res = await fetch(`${prefix}/api/updateHost`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${config?.token}`,
        },
        body: JSON.stringify(host),
    });
    const data = (await res.json()) as Host;
    return data;
};

// 删除 host 数据
export const removeHost = async (id: number) => {
    const config = getConfig();
    const prefix = config?.server ?? '';
    const res = await fetch(`${prefix}/api/deleteHost`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${config?.token}`,
        },
        body: JSON.stringify({ id }),
    });
    const data = (await res.json()) as Host;
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
    const data = (await res.json()) as Rule[];
    return data;
};

// 修改 rule 数据
export const updateRule = async (rule: Rule) => {
    const config = getConfig();
    const prefix = config?.server ?? '';
    const res = await fetch(`${prefix}/api/updateRule`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${config?.token}`,
        },
        body: JSON.stringify(rule),
    });
    const data = (await res.json()) as Rule;
    return data;
};

// 删除 rule 数据
export const removeRule = async (domain: string) => {
    const config = getConfig();
    const prefix = config?.server ?? '';
    const res = await fetch(`${prefix}/api/deleteRule`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${config?.token}`,
        },
        body: JSON.stringify({ rule: domain }),
    });
    const data = (await res.json()) as Rule;
    return data;
};
