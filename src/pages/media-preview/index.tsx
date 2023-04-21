
// Core viewer
import { Viewer,Worker } from '@react-pdf-viewer/core';

// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import zh_CN from '@react-pdf-viewer/locales/lib/zh_CN.json';

const MediaPreview = ()=>{
    // Create new plugin instance
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    return <>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.1.81/build/pdf.worker.min.js">
            <Viewer
                fileUrl='https://pdf.dfcfw.com/pdf/H3_AP202202171547552744_1.pdf'
                localization={zh_CN}
                plugins={[
                    // Register plugins
                    defaultLayoutPluginInstance
                ]}/>
        </Worker>
    </>
}

export default MediaPreview