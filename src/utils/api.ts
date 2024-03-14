import axios from 'axios';
import { Host, Rule } from '@/types';
import { getConfig } from '@/utils/store';
import { Toast } from 'antd-mobile';

// 创建 axios 实例
const config = getConfig();
const instance = axios.create({
    baseURL: config?.server ?? '',
    timeout: 10000,
    headers: {
        Authorization: `Bearer ${config?.token}`,
    },
});

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        Toast.show({ content: error.message, icon: 'fail' });
        return Promise.reject(error);
    }
);

// 更新配置
export const updateConfig = () => {
    const _config = getConfig();
    instance.defaults.headers.Authorization = `Bearer ${_config?.token}`;
    instance.defaults.baseURL = _config?.server;
};

// 获取 hostList 数据
export const getHostList = async () => {
    const res = await instance.get('/api/hostList');
    const data = res.data as Host[];
    return data;
};

// 修改 host 数据
export const updateHost = async (host: Host) => {
    const res = await instance.post('/api/updateHost', host);
    const data = res.data as Host;
    return data;
};

// 删除 host 数据
export const removeHost = async (id: number) => {
    const res = await instance.post('/api/deleteHost', { id });
    const data = res.data as Host;
    return data;
};

// 获取 ruleList 数据
export const getRuleList = async () => {
    const res = await instance.get('/api/ruleList');
    const data = res.data as Rule[];
    return data;
};

// 修改 rule 数据
export const updateRule = async (rule: Rule) => {
    const res = await instance.post('/api/updateRule', rule);
    const data = res.data as Rule;
    return data;
};

// 删除 rule 数据
export const removeRule = async (domain: string) => {
    const res = await instance.post('/api/deleteRule', { rule: domain });
    const data = res.data as Rule;
    return data;
};
