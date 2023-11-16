import React from 'react';
import { Col, Row } from 'antd';
import cn from 'classnames';
import { SearchOutlined } from '@ant-design/icons';
import './index.less';
import useVisualHeight from '@/utils/schema-form-render/useVisualHeight';

export interface SchemaFormContentProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode | any;
  footer?: React.ReactNode;
  header?: React.ReactNode;
  autoResize?: boolean;
}
export const SchemaFormContent: React.FC<SchemaFormContentProps> = ({
  className = '',
  children,
  style,
  footer = null,
  header = null,
  autoResize = true
}) => {
  const height = useVisualHeight(autoResize, '#page-content-wrapper');

  const renderHeader = () => {
    if (!header) {
      return null;
    }

    return <div className="content-header">{header}</div>;
  };

  const renderFooter = () => {
    if (!footer) {
      return null;
    }

    return <div className="content-footer">{footer}</div>;
  };

  return (
    <div className={cn(className, 'content-wrapper')} style={{ ...style, height }}>
      {renderHeader()}
      <div className="content-body">{children}</div>
      {renderFooter()}
    </div>
  );
};

export interface SchemaFormSearchContentProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

export const SchemaFormSearchContent: React.FC<SchemaFormSearchContentProps> = (props) => {
  const { className, children, style, footer = null } = props;
  // TODO:是否根据查询条件数量做 隐藏显示处理
  return (
    <Col span={24} style={{ ...style }} className={cn(className, 'search__content')}>
      <Col span={24}>
        <Row className="search__title">
          <SearchOutlined />
          <span className="search__info">搜索条件</span>
        </Row>
      </Col>
      <Row className="search__form__foot">
        <Col span={24}>
          <Row className="search__form">
            <Col span={24}>{children}</Col>
          </Row>
        </Col>
        {footer ? (
          <Row className="search__foot" justify="end">
            {footer}
          </Row>
        ) : null}
      </Row>
    </Col>
  );
};
