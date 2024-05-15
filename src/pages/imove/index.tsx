import IMove from '@imove/core';

// onSave属性没有用到
const onSave = (data: { nodes: any; edges: any }): void => {
  console.log(data);
};

const ImovePage = ()=>{
  return (
    <div style={{ height: '100vh' }}>
      <IMove onSave={onSave} />
    </div>
  );
}

export default ImovePage;
