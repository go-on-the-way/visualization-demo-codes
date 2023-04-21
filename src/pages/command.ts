import { history } from 'umi';

const RouterCommands = {
    jump(url:string,type?:string){
        history.push(url)
    },
    jumpLogin(type?:string){
        history.push('/login')
    }
}

export {
    RouterCommands
}