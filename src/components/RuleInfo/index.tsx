import { useCallback, useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, Radio, Space, Toast } from 'antd-mobile';
import { Rule } from '@/types';
import { removeRule, updateRule } from '@/utils/api';

type Props = {
  rule: Rule;
  onSave?: () => void;
  onRemove?: () => void;
  hostMap?: any;
};

export default function ({ rule, onSave, onRemove, hostMap }: Props) {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (rule) {
      form.setFieldsValue({
        domain: rule[0],
        host: rule[1].map(String),
      });
    } else {
      form.resetFields();
    }
  }, [rule]);

  const onFinish = useCallback(
    async (values: any) => {
      setIsLoading(true);
      const res = await updateRule([values.domain, values.host.map(Number)]);
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
    const res = await removeRule(rule[0]);
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
      <Form.Header>Proxy Rule Info</Form.Header>
      <Form.Item name="domain" label="Domain" rules={[{ required: true }]}>
        <Input clearable />
      </Form.Item>
      <Form.Item name="host" label="Proxy Host" rules={[{ required: true }]}>
        <Checkbox.Group>
          <Space direction="vertical">
            {Object.keys(hostMap).map((id) => (
              <Checkbox key={id} value={id}>
                {hostMap[id].name}
              </Checkbox>
            ))}
          </Space>
        </Checkbox.Group>
      </Form.Item>
    </Form>
  );
}
