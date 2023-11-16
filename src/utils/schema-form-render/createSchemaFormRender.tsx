import React from 'react';
import { createForm } from '@formily/core';
import { createSchemaField, FormProvider } from '@formily/react';
import { SchemaFormRenderProps, SchemaFormRenderState, createSchema } from 'schema-form';
import _ from 'lodash';
import { components } from './components'

// 已简化
export const createSchemaFormRender: createSchema = (
    createSchemaFieldConfig,
    formConfig,
) => {
    const SchemaField = createSchemaField(
        _.merge(
            {
                components: {
                    ...components,
                },
                scope: {}
            },
            createSchemaFieldConfig,
        ),
    );
    const form = createForm(formConfig);

    class Render extends React.Component<SchemaFormRenderProps, SchemaFormRenderState> {
        componentDidUpdate() {

        }
        render() {
            const { schema } = this.props;
            return [
                <FormProvider form={form}>
                    <SchemaField schema={schema} />
                </FormProvider>
            ];
        }
    }
    
    return {
        form,
        Render: (props: SchemaFormRenderProps) => <Render {...props} />,
    };
};
