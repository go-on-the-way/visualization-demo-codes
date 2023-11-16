import { CreateModalList } from "@/components/CreateModalList";

import { FC, useMemo, useRef, useState } from "react";
import { RouteComponentProps } from "react-router";
import { Form } from "@formily/core/esm/models";
import { onFormMount } from "@formily/core";

interface ClaimCheckpoolListProps extends RouteComponentProps {}

const ClaimCheckpoolList: FC<ClaimCheckpoolListProps> = () => {
  const formRef = useRef<Form>();
  const [reloadFlag, setreloadFlag] = useState<any>('');

  const WithListComp = useMemo(() => {
    return CreateModalList({});
  }, []);

  return (
    <>
      <WithListComp
        reloadFlag={reloadFlag}
        pageCode={'CheckPool_L'}
        pageApi={'CheckPool_L'}
        formConfigs={{
          effects: () => {
            onFormMount(form=>{
              formRef.current = form;
            })
          },
        }}
        validator={{
          checkColBtns: (key: string, row: any) => {
            switch (key) {
              case 'chehui':
                return row.status === 'COMPLETE' && row.srcSys === "FSSC" && !row.opStatus;
              default:
                return true;
            }
          },
        }}
        events={{
          buttonsEvents: {},
          tableButtonsEvents: {
            handleProcess: (id: string, row: any) => {
              
            }
          },
        }}
      />
    </>
  );
};

export default ClaimCheckpoolList;
