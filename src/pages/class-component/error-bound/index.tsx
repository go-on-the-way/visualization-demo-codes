import React from "react";

interface MyProps {
    [key:string]:any
}

interface MyState {
    [key:string]:any
}

class ErrorBoundary extends React.Component<MyProps,MyState> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false };;
    }

    static getDerivedStateFromError(error: any) {
        // 更新 state 使下一次渲染能够显示降级后的 UI
        return { hasError: true };
    }

    componentDidCatch(error: any, errorInfo: any) {
        // 你同样可以将错误日志上报给服务器
    }

    render() {
        if (this.state.hasError) {
            // 你可以自定义降级后的 UI 并渲染
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}