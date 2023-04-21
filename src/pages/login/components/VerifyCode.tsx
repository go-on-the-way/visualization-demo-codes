import React, { useState } from 'react';
import { Input, Button } from 'antd';
import verifyCodeStyles from './verifyCode.less';

interface IVerifyCodeProps {
  value?: any;
  onChange?: (value: any) => void;
  readyPost?: boolean;
  phoneNumber?: number;
  style?: React.CSSProperties;
  [propName: string]: any;
}

export const VerifyCode: React.FC<IVerifyCodeProps> = ({
  value,
  onChange,
  readyPost,
  phoneNumber,
  ...props
}) => {
  const [lastTime, setLastTime] = useState(0);

  const counting = (time = 20) => {
    if (time < 0) return;
    setLastTime(time);
    setTimeout(() => {
      counting(time - 1);
    }, 1000);
  };

  return (
    <div className={verifyCodeStyles.verifyCodeContainer}>
      <Input
        {...props}
        style={{ marginRight: 5, ...props.style }}
        value={value}
        onChange={onChange}
      />
      <div className={verifyCodeStyles.verifyCodeContent}>
        {lastTime === 0 && (
          <Button
            disabled={!readyPost}
            block
            onClick={() => {
              if (phoneNumber) {
                console.log(`post code by phone number ${phoneNumber}`);
              }
              counting();
            }}
          >
            发送验证码
          </Button>
        )}
        {lastTime > 0 && <span>剩余{lastTime}秒</span>}
      </div>
    </div>
  );
};
