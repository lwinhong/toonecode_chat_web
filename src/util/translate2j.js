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
            options: mergeOptions(options)
        }
        await fetch("/api2/code/generate", {
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
            let data = await new FileHandlerCore().uploadFile("/api2/code/generate", file, mergeOptions(options));
        } catch (error) {

        }
    }

    mergeOptions(options) {
        return Object.assign(defaltOption, options || {})
    }
}