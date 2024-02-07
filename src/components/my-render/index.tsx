import { forwardRef, useEffect } from 'react';
import { createForm } from '@formily/core'
import { createSchemaField, FormProvider } from '@formily/react'
import { Form } from '@formily/antd';
import { getSchema, getFormConfig, getComponents, getScope } from './renderUtil'
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
    formConfig,
}:WleiRenderPropType,ref:any) {
    const form = createForm(getFormConfig(formConfig))
    const SchemaField = createSchemaField({
        components:getComponents(components),
        scope:getScope(scope)
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
