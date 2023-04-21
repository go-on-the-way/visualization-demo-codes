import React from 'react';
import {ThemeContext, themes} from './theme-context';
import ThemedButton , { BaseProps } from './theme-button';

// 一个使用 ThemedButton 的中间组件
function Toolbar(props:any) {
  return (
    <ThemedButton onClick={props.changeTheme}>
      Change Theme
    </ThemedButton>
  );
}

class App extends React.Component<BaseProps> {
  constructor(props:BaseProps) {
    super(props);
    this.state = {
      theme: themes.light,
    } as any;

    this.toggleTheme = () => {
      this.setState((state:any) => ({
        theme:
          state?.theme === themes.dark
            ? themes.light
            : themes.dark,
      }));
    };
  }

  render() {
    // 在 ThemeProvider 内部的 ThemedButton 按钮组件使用 state 中的 theme 值，
    // 而外部的组件使用默认的 theme 值
    return (
      <article>
        <ThemeContext.Provider value={this.state.theme}>
          <Toolbar changeTheme={this.toggleTheme} />
        </ThemeContext.Provider>
        <section>
          <ThemedButton />
        </section>
      </article>
    );
  }
}

export default App
