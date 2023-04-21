import React from 'react';
import { ThemeContext } from './theme-context';

export interface BaseProps {
    [key: string]: any;
}

class ThemedButton extends React.Component<BaseProps> {
  render() {
    let props = this.props;
    let theme = this.context;
    return (
      <button
        {...props}
        style={{backgroundColor: theme.background}}
      />
    );
  }
}
ThemedButton.contextType = ThemeContext; // 订阅Context的方式之一，另外有Consumer

export default ThemedButton;
