export default {
    type: 'object',
    properties: {
        username: {
            type: 'string',
            title: '用户名',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Input',
        },
        password: {
            type: 'string',
            title: '密码',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {
            },
            'x-reactions': [
                {
                    dependencies: ['.confirm_password'],
                    fulfill: {
                        state: {
                            selfErrors:
                                '{{$deps[0] && $self.value && $self.value !== $deps[0] ? "确认密码不匹配" : ""}}',
                        },
                    },
                },
            ],
        },
        confirm_password: {
            type: 'string',
            title: '确认密码',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {
            },
            'x-reactions': [
                {
                    dependencies: ['.password'],
                    fulfill: {
                        state: {
                            selfErrors:
                                '{{$deps[0] && $self.value && $self.value !== $deps[0] ? "确认密码不匹配" : ""}}',
                        },
                    },
                },
            ],
        }
    },
};