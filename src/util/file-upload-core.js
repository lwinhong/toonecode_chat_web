//如果文件太大，大于500m，可以使用https://github.com/jimmywarting/StreamSaver.js
import { saveAs } from "file-saver";

export class FileHandlerCore {
    async uploadFile(url, file, options) {
        if (!url) {
            throw new Error(`url 不能空`);
        }
        if (!file) {
            throw new Error(`file 不能空`);
        }
        const formData = new FormData();
        formData.append('file', file);
        formData.append('options', JSON.stringify(options));

        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    }
    async saveFileByFileId(fileId, savePath) {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });
    }
    async saveAsFile(url, filePath) {
        // const link = document.createElement("a");
        // link.href = url;
        // link.download = filePath;
        // link.click();

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.statusText}`);
        }
        const blob = await response.blob();
        saveAs(blob, filePath);
    }
}