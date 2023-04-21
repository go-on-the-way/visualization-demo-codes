import { useRef } from 'react';
import { Submit } from '@formily/antd';
import loginFormSchema from '@/db/login/loginSchema'
import { WleiFormRender } from '@/components/my-render'
import { getData } from '@/utils/storage'
import { RouterCommands } from '@/pages/command';

export default () => {
  const formRef = useRef({} as any)
  const toNewUser = () => {
    RouterCommands.jump('/register')
  };

  const toModifyPassword = () => {
    RouterCommands.jump('/modify')
  };

  const loginSubmit = ()=>{
    let { username, password } = formRef.current?.values || {}
    getData(username).then(val=>{
      if(val === password){
        RouterCommands.jump('/home')
      }
    }).catch(()=>{
      RouterCommands.jumpLogin()
    })
  }

  const formChildRender = ()=>{
    return <Submit block size="large" onClick={loginSubmit}>登录</Submit>
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      padding: '40px 0',
    }}>
      <WleiFormRender 
        schema={loginFormSchema}
        styles={{ 'width':'45%' }}
        formProps={{
          layout:"vertical",
          size:"large"
        }}
        formChildRender={formChildRender}
        onEffect={(form:any)=>{
          formRef.current = form
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <a onClick={toNewUser}>新用户注册</a>
          <a onClick={toModifyPassword}>忘记密码?</a>
        </div>
      </WleiFormRender>
    </div>
  );
};
