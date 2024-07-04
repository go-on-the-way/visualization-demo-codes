import { useEffect, useState } from 'react';

export default (props:any) => {
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    const handleResize = () => {
        setWindowHeight(window.innerHeight);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <div style={{ position:'relative', overflow: 'hidden', height: windowHeight - 56 }}>
            {props.children}
        </div >
    )
}