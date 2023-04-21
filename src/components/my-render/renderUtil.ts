import React, { useMemo } from 'react'
import { createForm } from '@formily/core'
import {
  FormProvider,
  FormConsumer,
  Field,
  connect,
  mapProps,
} from '@formily/react'
import { Input, Form, Button } from 'antd'
import { BaseType } from '@/types/common.type'

export const getSchema = ({ schema }:BaseType)=>{
  return schema
}