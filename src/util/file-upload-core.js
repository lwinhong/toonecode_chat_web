
//如果文件太大，大于500m，可以使用https://github.com/jimmywarting/StreamSaver.js
import { saveAs } from "file-saver";

const api_key = 'app-pFEGY14EzZm47OXRnEBtNmB1'
const upload_API = 'http://ai2.t.vtoone.com/api/v1/files/upload'

export class FileHandlerCore {
    async uploadFile(url, file) {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(url || upload_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${api_key}`,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('File uploaded:', data);
    }

    async saveAsFile(url, filePath) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const blob = await response.blob();
        saveAs(blob, filePath);
    }
}