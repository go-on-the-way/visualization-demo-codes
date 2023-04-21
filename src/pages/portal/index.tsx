
import { Layout } from 'antd';
import { MySider } from './components/sider'
const { Header, Sider, Content } = Layout;

const Portal = (props:any)=>{

    return <>
        <Layout style={{height:'100%'}}>
            <Header style={{color:'#fff'}}>AI智能代码集成</Header>
            <Layout>
                <Sider style={{height:'100%'}}>
                    <MySider></MySider>
                </Sider>
                <Content>{ props.children }</Content>
            </Layout>
        </Layout>
    </>
}

export default Portal