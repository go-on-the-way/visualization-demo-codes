import React from 'react';
import { createForm } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { Form, FormItem, Input, Password, Submit } from '@formily/antd';
import { Tabs, Card } from 'antd';
import { history } from 'umi';
import * as ICONS from '@ant-design/icons';
import { VerifyCode } from '../components/VerifyCode';
// 1、注意事项
// Schema 的每个属性都能使用字符串表达式{{expression}}，
// 表达式变量可以从 createSchemaField 中传入，也可以从 SchemaField 组件中传入

const normalForm = createForm({
  validateFirst: true,
});

const phoneForm = createForm({
  validateFirst: true,
});

const SchemaField = createSchemaField({
  //字段组件列表
  components: {
    FormItem,
    Input,
    Password,
    VerifyCode,
  },
  //作用域，用于实现协议表达式变量注入
  scope: {
    icon(name: string | number) {
      return React.createElement(ICONS[name]);
    },
  },
});

const normalSchema = {
  // schema的类型
  //   type SchemaTypes =
  //   | 'string'
  //   | 'object'
  //   | 'array'
  //   | 'number'
  //   | 'boolean'
  //   | 'void'
  //   | 'date'
  //   | 'datetime'
  //   | (string & {})
  type: 'object',
  properties: {
    //属性描述
    username: {
      type: 'string',
      title: '用户名',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        prefix: "{{icon('UserOutlined')}}",
      },
    },
    password: {
      type: 'string',
      title: '密码',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Password',
      'x-component-props': {
        prefix: "{{icon('LockOutlined')}}",
      },
    },
  },
};

const phoneSchema = {
  type: 'object',
  properties: {
    phone: {
      type: 'string',
      title: '手机号',
      required: true,
      'x-validator': 'phone',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        prefix: "{{icon('PhoneOutlined')}}",
      },
    },
    verifyCode: {
      type: 'string',
      title: '验证码',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'VerifyCode',
      'x-component-props': {
        prefix: "{{icon('LockOutlined')}}",
      },
      'x-reactions': [
        {
          dependencies: ['.phone#value', '.phone#valid'],
          fulfill: {
            state: {
              'component[1].readyPost': '{{$deps[0] && $deps[1]}}',
              'component[1].phoneNumber': '{{$deps[0]}}',
            },
          },
        },
      ],
    },
  },
};

export default () => {
  const toNewUser = () => {
    history.push('/register');
  };
  const toModifyPassword = () => {
    history.push('/modify');
  };
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '40px 0',
      }}
    >
      <Card style={{ width: 400 }}>
        <Tabs style={{ overflow: 'visible', marginTop: -10 }}>
          <Tabs.TabPane key="1" tab="账密登录">
            <Form
              form={normalForm}
              layout="vertical"
              size="large"
              onAutoSubmit={console.log}
            >
              <SchemaField schema={normalSchema} />
              <Submit block size="large">
                登录
              </Submit>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane key="2" tab="手机登录">
            <Form
              form={phoneForm}
              layout="vertical"
              size="large"
              onAutoSubmit={console.log}
            >
              <SchemaField schema={phoneSchema} />
              <Submit block size="large">
                登录
              </Submit>
            </Form>
          </Tabs.TabPane>
        </Tabs>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <a onClick={toNewUser}>新用户注册</a>
          <a onClick={toModifyPassword}>忘记密码?</a>
        </div>
      </Card>
    </div>
  );
};
