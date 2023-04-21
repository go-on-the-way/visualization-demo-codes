export default {
    type: 'object',
    properties: {
      //属性描述
      username: {
        type: 'string',
        title: '',
        required: false,
        readOnly: false,
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        'x-component-props': {
          placeholder:"用户名",
          prefix: "{{icon('UserOutlined')}}",
        },
      },
      password: {
        type: 'string',
        title: '',
        required: false,
        'x-decorator': 'FormItem',
        'x-component': 'Password',
        'x-component-props': {
          placeholder:"密码",
          prefix: "{{icon('LockOutlined')}}",
        },
      },
    },
}