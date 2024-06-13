const defaltOption = {
    "dataType": "sql",
    "authorName": "toone",
    "packageName": "com.toone.system",
    "returnUtilSuccess": "ReturnT.success",
    "returnUtilFailure": "ReturnT.error",
    "isPackageType": true,
    "isSwagger": false,
    "isAutoImport": false,
    "isWithPackage": false,
    "isComment": true,
    "isLombok": true,
    "ignorePrefix": "sys_",
    "tinyintTransType": "Date"
}

import { FileHandlerCore } from "./file-upload-core"

export class Translate2j {
    async sql2j(sql, options) {
        const param = {
            tableSql: sql,
            options: this.mergeOptions(options)
        }
        let url = "/code/generate";
        if (import.meta.env.PROD) {
            url = import.meta.env.VITE_API_FILE_URL + url;
        } else {
            url = "/api2" + url;
        }
        await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(param)
        }).then(res => res.json()).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }
    async excelFile2J(file, options) {
        try {
            const fileHandler = new FileHandlerCore();
            let url = "/code/generate4file";
            if (import.meta.env.PROD) {
                url = import.meta.env.VITE_API_FILE_URL + url;
            } else {
                url = "/api2" + url;
            }
            //import.meta.env.VITE_API_FILE_URL
            let { code, msg } = await fileHandler.uploadFile(url,
                file, this.mergeOptions(options));
            if (code === 0) {
                url = "/download";
                if (import.meta.env.PROD) {
                    url = import.meta.env.VITE_API_FILE_URL + url;
                } else {
                    url = "/api2" + url;
                }
                url += "?fileId=" + msg[0].fileId;
                await fileHandler.saveAsFile(url, "testset.zip")
            }
        } catch (error) {
            console.error(error);
        }
    }

    mergeOptions(options) {
        return Object.assign(defaltOption, options || {})
    }
}