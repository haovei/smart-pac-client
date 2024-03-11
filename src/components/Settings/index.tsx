import React, { useEffect } from 'react';
import { Input, Form, Button } from 'antd-mobile';
import { getConfig, setConfig } from '../../store';
import './style.less';

const Config: React.FC = () => {
    const [form] = Form.useForm();
    const handleSave = async () => {
        const res = await form.validateFields();
        setConfig(res);
    };

    useEffect(() => {
        const config = getConfig();
        form.setFieldsValue(config);
    }, []);

    return (
        <div className="config-page">
            <Form
                form={form}
                layout="vertical"
                mode="card"
                footer={
                    <Button color="primary" size="large" block onClick={handleSave}>
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
    );
};

export default Config;
