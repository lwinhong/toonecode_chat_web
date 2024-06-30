import { useStore } from "@/stores/useStore";

export const TelemetryService = {
    pluginStatistics: () => {
        return new Promise((resolve, reject) => {
            let url = "/statistics/plugin";
            if (import.meta.env.PROD) {
                url = import.meta.env.VITE_API_FILE_URL + url;
            } else {
                url = "/api2" + url;
            }
            try {
                const param = TelemetryService.getAppInfo();
                fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(param)
                }).then(response => {
                    if (response.ok) {
                        resolve()
                        return;
                    }
                    reject(`error:${response.status},${response.statusText}`);
                }).catch(reject);
            } catch (e) {
                reject(e);
            }
        });
    },
    getAppInfo() {
        const use = useStore();
        const param = Object.assign(use.appInfo || {}, {
            appId: use.appId,
            ide: use.IdeType,
            ideVersion: "",
            pluginVersion: "1.0.0"
        });
        return param;
    }
}