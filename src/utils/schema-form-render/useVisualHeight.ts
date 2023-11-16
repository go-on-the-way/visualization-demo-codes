import { useLayoutEffect, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

const useVisualHeight = (autoResize: boolean, selectors: string): string => {
  const [height, setHeight] = useState('100%');

  useLayoutEffect(() => {
    let animationFrameID = 0;

    const ele = document.body;

    const resizeSub = new ResizeObserver(() => {
      const isLoader = document.querySelector('#loader-container');

      // 预制凭证详情防止出现双滚动
      const isChart = document.querySelector('#chartContainer');

      animationFrameID = window.requestAnimationFrame(() => {
        if (!isChart) {
          setHeight(`${ele.clientHeight - 130 - (isLoader ? 100 : 0)}px`);
        }
      });
    });

    if (autoResize && ele) {
      if (ele) {
        resizeSub.observe(ele);
      } else {
        console.log(`无法找到 选择器为 ${selectors} 的 dom`);
      }
    }

    return () => {
      resizeSub.unobserve(ele);
      window.cancelAnimationFrame(animationFrameID);
    };
  }, [autoResize, selectors]);

  return height;
};

export default useVisualHeight;
