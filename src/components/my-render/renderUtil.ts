import { BaseType } from '@/types/common.type'
import { BasicComponents, FormItemComponents } from './components';

export const getSchema = ({ schema }:BaseType)=>{
  return schema
}

export const getFormConfig = (formConfig:any)=>{
  return {
    validateFirst: true,
    ...formConfig
  }
}

export const getComponents = (components:any = {})=>{
  const common = {
    ...BasicComponents,
    ...FormItemComponents,
  }

  let formComponents = components?{
    ...common,
    ...components
  }:{
    ...common
  }
  return  formComponents
}

export const getScope = (scope:any = {}) => {
  return {
    ...scope
  }
}