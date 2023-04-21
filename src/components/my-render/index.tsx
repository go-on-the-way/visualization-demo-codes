import React,{ forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import { createForm } from '@formily/core'
import { createSchemaField, FormProvider } from '@formily/react'
import { Form, FormItem, Input, Password } from '@formily/antd';
import * as ICONS from '@ant-design/icons';
import { getSchema } from './renderUtil'
import { WleiRenderPropType } from '@/types/component.type'

function wleiFormRender({ 
    schema, 
    components, 
    scope, 
    children, 
    formChildRender, 
    formProps,
    onEffect,
    styles,
    ...otherProps 
}:WleiRenderPropType,ref:any) {
    const form = createForm({
        validateFirst: true,
    })
    const SchemaField = createSchemaField({
        components:{
            FormItem,
            Input,
            Password,
            ...components
        },
        scope:{
            icon(name:string) {
                return React.createElement(ICONS[name]);
            },
            ...scope
        }
    })
    useEffect(()=>{
        onEffect?.(form)
    })

    return <div ref={ref} className='wlei-form-render' style={{...styles}}>
        <Form form={form} { ...formProps }>
            <FormProvider form={form}>
                <SchemaField schema={getSchema({schema})} />
                { formChildRender && formChildRender() }
            </FormProvider>
        </Form>
        {
            children && <div className='wlei-form__footer'>{children}</div>
        }
    </div>
}

export const WleiFormRender = forwardRef(wleiFormRender)
