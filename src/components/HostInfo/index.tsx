import { useCallback, useEffect, useState } from 'react';
import { Button, Form, Input, Radio, Space, Toast } from 'antd-mobile';
import { Host } from '@/types';
import { removeHost, updateHost } from '@/utils/api';

type Props = {
    host: Host;
    onSave?: () => void;
    onRemove?: () => void;
};

export default function ({ host, onSave, onRemove }: Props) {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (host) {
            form.setFieldsValue(host);
        } else {
            form.resetFields();
        }
    }, [host]);

    const onFinish = useCallback(
        async (values: any) => {
            setIsLoading(true);
            const res = await updateHost(values);
            setIsLoading(false);
            if (res) {
                onSave?.();
            } else {
                Toast.show('Save failed');
            }
        },
        [onSave]
    );

    const handleRemove = useCallback(async () => {
        setIsLoading(true);
        const res = await removeHost(host.id);
        setIsLoading(false);
        if (res) {
            onRemove?.();
        } else {
            Toast.show('Remove failed');
        }
    }, [onRemove]);

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            footer={
                <Space direction="vertical" block>
                    <Button key="submit" block type="submit" color="primary" loading={isLoading}>
                        Save
                    </Button>
                    <Button key="remove" block color="danger" onClick={handleRemove}>
                        Remove
                    </Button>
                </Space>
            }
        >
            <Form.Header>Proxy Host Info</Form.Header>
            <Form.Item name="id" hidden>
                <Input />
            </Form.Item>
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input clearable />
            </Form.Item>
            <Form.Item name="type" label="Proxy Type" rules={[{ required: true }]}>
                <Radio.Group>
                    <Space>
                        <Radio value="SOCKS">SOCKS</Radio>
                        <Radio value="HTTP">HTTP</Radio>
                    </Space>
                </Radio.Group>
            </Form.Item>
            <Form.Item name="host" label="Host" rules={[{ required: true }]}>
                <Input clearable />
            </Form.Item>
            <Form.Item name="port" label="Host Port" rules={[{ required: true }]}>
                <Input clearable type="number" />
            </Form.Item>
        </Form>
    );
}
