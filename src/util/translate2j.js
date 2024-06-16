const defaltOption = {
    "dataType": "sql",
    "authorName": "toone",
    "packageName": "com.toone.masterdata",
    "returnUtilSuccess": "Return.success",
    "returnUtilFailure": "Return.error",
    "isPackageType": true,
    "isSwagger": false,
    "isAutoImport": true,
    "isWithPackage": false,
    "isComment": true,
    "isLombok": true,
    "ignorePrefix": "sys_",
    "tinyintTransType": "Date"
}

import { FileHandlerCore } from "./file-upload-core"

export class Translate2j {
    async sql2j(sql, options, fileName) {
        const param = {
            tableSql: sql,
            options: this.mergeOptions(options)
        }
        let url = "/code/generate4SQL";
        if (import.meta.env.PROD) {
            url = import.meta.env.VITE_API_FILE_URL + url;
        } else {
            url = "/api2" + url;
        }

        let abor = new AbortController();
        const timerout = setTimeout(() => {
            abor?.abort();
        }, 1000 * 10);
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            signal: abor.signal,
            body: JSON.stringify(param)
        });
        abor = null;
        timerout && clearTimeout(timerout);

        if (response.ok) {
            let { code, msg } = await response.json();
            if (code === 0) {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                if (import.meta.env.PROD)
                    await this.downloadByUrl(msg[0].fileUrl, fileName)
                else
                    await this.downloadResult(msg[0].fileId, fileName)
                return;
            }
            throw new Error(result.msg);
        }
        throw new Error("服务异常");
    }

    async excelFile2J(file, options) {

        let url = "/code/generate4file";
        if (import.meta.env.PROD) {
            url = import.meta.env.VITE_API_FILE_URL + url;
        } else {
            url = "/api2" + url;
        }

        const fileHandler = new FileHandlerCore();
        let { code, msg } = await fileHandler.uploadFile(url,
            file, this.mergeOptions(options));

        //上传成功之后，会返回下载地址，然后接着下载即可    
        if (code === 0) {
            await this.downloadResult(msg[0].fileId, file.name, fileHandler)
        } else {
            throw new Error(msg);
        }
    }

    async downloadResult(fileId, saveName, fileHandler) {
        let url = "/code/download";
        if (import.meta.env.PROD) {
            url = import.meta.env.VITE_API_FILE_URL + url;
        } else {
            url = "/api2" + url;
        }
        url += `?fileId=${fileId}`;
        await this.downloadByUrl(url, saveName, fileHandler)
    }
    async downloadByUrl(url, saveName, fileHandler) {
        if (saveName) {
            saveName = saveName.substring(0, saveName.lastIndexOf(".")) + ".zip";
        }
        await (fileHandler || new FileHandlerCore()).saveAsFile(url, saveName)
    }

    mergeOptions(options) {
        return Object.assign(defaltOption, options || {})
    }
}