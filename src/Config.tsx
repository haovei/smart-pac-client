import React, { useState } from 'react';
import { Input, Form, Button } from 'antd-mobile';

const Config: React.FC = () => {
    const [serverUrl, setServerUrl] = useState('');
    const [token, setToken] = useState('');

    const handleSave = () => {
        console.log('Server URL:', serverUrl);
        console.log('Token:', token);
    };

    return (
        <>
            <div title="配合列表使用-竖直布局">
                <Form layout="vertical">
                    <Form.Item label="Server" name="server">
                        <Input placeholder="Enter server URL" clearable />
                    </Form.Item>
                    <Form.Item label="Token" name="token">
                        <Input placeholder="Enter Token" clearable />
                    </Form.Item>
                </Form>
            </div>
            <Button color="primary" size="large" block onClick={handleSave}>
                Save
            </Button>
        </>
    );
};

export default Config;
