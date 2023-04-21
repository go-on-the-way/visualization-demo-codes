import "handsontable/dist/handsontable.min.css";
import "pikaday/css/pikaday.css";
import "./styles.css";
import { useState, useEffect } from 'react';
import { HotTable, HotColumn } from "@handsontable/react";
import { registerAllModules } from 'handsontable/registry';
import { data } from "./constants";
import { ProgressBarRenderer } from "./renderers/ProgressBar";
import { StarsRenderer } from "./renderers/Stars";
import {
  drawCheckboxInRowHeaders,
  addClassesToRows,
  changeCheckboxCell,
  alignHeaders
} from "./hooksCallbacks";
import {
    registerLanguageDictionary,
    getLanguagesDictionaries,
    zhCN,
    zhTW,
    enUS
  } from 'handsontable/i18n';

registerLanguageDictionary(zhCN);
registerLanguageDictionary(zhTW);
registerLanguageDictionary(enUS);

registerAllModules()

const colHeaders = [
    "Company name",
    "Country",
    "Name",
    "Sell date",
    "Order ID",
    "In stock",
    "Qty",
    "Progress",
    "Rating"
]

const MyTable = () => {
  const [language, setLanguage] = useState('zh-CN');
  const [languageList, setLanguageList] = useState([] as any);

  useEffect(() => {
    setLanguageList(getLanguagesDictionaries());
  }, []);

  const updateHotLanguage = (event:any) => {
    setLanguage(event.target.value);
  };

  return (
      <div style={{ padding:'1em' }}>
        <label>
            选择语言：
            <select value={language} onChange={updateHotLanguage}>
                {languageList.map(({ languageCode }:any) => (
                    <option key={languageCode} value={languageCode}>
                    {languageCode}
                    </option>
                ))}
            </select>
        </label>
        <HotTable
            language={language}
            data={data}
            height={600}
            colWidths={[140, 126, 192, 100, 100, 90, 90, 110, 97]}
            colHeaders={colHeaders}
            dropdownMenu={true}
            hiddenColumns={{
                indicators: true
            }}
            contextMenu={true}
            multiColumnSorting={true}
            filters={true}
            rowHeaders={true}
            afterGetColHeader={alignHeaders}
            beforeRenderer={addClassesToRows}
            afterGetRowHeader={drawCheckboxInRowHeaders}
            afterOnCellMouseDown={changeCheckboxCell}
            manualRowMove={true}
            licenseKey="non-commercial-and-evaluation"
        >
            <HotColumn data={1} />
            <HotColumn data={2} />
            <HotColumn data={3} />
            <HotColumn data={4} type="date" allowInvalid={false} />
            <HotColumn data={5} />
            <HotColumn data={6} type="checkbox" className="htCenter" />
            <HotColumn data={7} type="numeric" />
            <HotColumn data={8} readOnly={true} className="htMiddle">
                {/* @ts-ignore Element inherits some props. It's hard to type it. */}
                <ProgressBarRenderer hot-renderer />
            </HotColumn>
            <HotColumn data={9} readOnly={true} className="htCenter">
                {/* @ts-ignore Element inherits some props. It's hard to type it. */}
                <StarsRenderer hot-renderer />
            </HotColumn>
        </HotTable>
      </div>
  );
};

export default MyTable