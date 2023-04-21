import { history } from 'umi';
import { useRef } from 'react'
import { Submit } from '@formily/antd';
import registerFormSchema from '@/db/user/registerSchema'
import { WleiFormRender } from '@/components/my-render'
import { setData, getData} from '@/utils/storage'

export default () => {
  const formRef = useRef({} as any)
  const registerSubmit = ()=>{
    let { username, password } = formRef.current?.values || {}
    // 存储用户名、密码
    setData(username,password)
    history.push('/login');
  }

  const formChildRender = ()=>{
    return <Submit block size="large" onClick={registerSubmit}>提交</Submit>
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      padding: '40px 0',
    }}>
      <WleiFormRender 
        schema={registerFormSchema}
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
      </WleiFormRender>
    </div>
  );
};
