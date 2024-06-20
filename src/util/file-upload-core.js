//如果文件太大，大于500m，可以使用https://github.com/jimmywarting/StreamSaver.js
import { saveAs } from "file-saver";

export class FileHandlerCore {
    async uploadFile(url, file, options, dataType) {
        if (!url) {
            throw new Error(`url 不能空`);
        }
        if (!file) {
            throw new Error(`file 不能空`);
        }
        const formData = new FormData();
        formData.append('file', file);
        formData.append('options', JSON.stringify(options));
        formData.append('dataType', dataType);

        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    }
    async saveFileByFileId(fileId, filePath) {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({ fileId })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.statusText}`);
        }

        const blob = await response.blob();
        saveAs(blob, filePath);
    }
    async saveAsFile(url, filePath) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.statusText}`);
        }

        const blob = await response.blob();
        saveAs(blob, filePath);
    }
}