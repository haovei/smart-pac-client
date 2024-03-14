import React, { useCallback, useEffect } from 'react';
import { Input, Form, Button, Toast, NavBar } from 'antd-mobile';
import { getConfig, setConfig } from '@/utils/store';
import { useNavigate } from 'react-router-dom';
import { updateConfig } from '@/utils/api';
import './style.less';

const Config: React.FC = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const handleSave = useCallback(async () => {
        const res = await form.validateFields();
        setConfig(res);
        updateConfig();
        Toast.show('Save success');
        navigate('/hosts', { replace: true });
    }, [form]);

    useEffect(() => {
        const config = getConfig();
        form.setFieldsValue(config);
    }, []);

    return (
        <>
            <NavBar back={null} className="top-nav-bar">
                Server Settings
            </NavBar>
            <div className="body">
                <div className="config-page">
                    <Form
                        form={form}
                        onFinish={handleSave}
                        layout="vertical"
                        mode="card"
                        footer={
                            <Button type="submit" color="primary" size="large" block>
                                Save
                            </Button>
                        }
                    >
                        <Form.Header>Setting</Form.Header>
                        <Form.Item
                            label="Server"
                            name="server"
                            rules={[{ required: true }, { type: 'url' }]}
                        >
                            <Input placeholder="Enter server URL" clearable />
                        </Form.Item>
                        <Form.Item label="Token" name="token" rules={[{ required: true }]}>
                            <Input placeholder="Enter server token" clearable />
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default Config;
