export const readFileText = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = async () => {
            resolve(reader.result);
        }
        reader.onerror = (e) => {
            reject(e || "文件读取失败")
        }
        // text类型
        reader.readAsText(file, 'utf-8')
    })
}