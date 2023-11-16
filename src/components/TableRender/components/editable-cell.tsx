import React from 'react';
import { Form } from 'antd';
import { Rule } from 'antd/lib/form';

interface Item {
  [key: string]: any;
}

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType?: string;
  required?: boolean,
  rules?: Rule[],
  record: Item;
  index: number;
  children: React.ReactNode;
  onChange: (e: any) => void;
  componentProps: any;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType = 'Input',
  required = true,
  rules = [],
  record,
  index,
  children,
  onChange,
  componentProps = {},
  ...restProps
}) => {
  // 组件库
  const components:any = {
    
  }

  const InputComponent = components[inputType];
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required,
              message: `请输入 ${title}!`,
            },
            ...rules,
          ]}
        >
          <InputComponent onChange={onChange} {...componentProps} />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;
