interface WleiRenderPropType {
    schema:{ [key:string]:any },
    components?:{ [key:string]:any },
    scope?:{ [key:string]:any },
    formProps?:{ [key:string]:any },
    onEffect?:Function,
    formChildRender?:Function
    styles?:{ [key:string]:any },
    children?:any,
    formConfig?:any,
    [key:string]:any
}

export {
    WleiRenderPropType
}