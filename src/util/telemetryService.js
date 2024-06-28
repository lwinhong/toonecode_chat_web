import { useStore } from "@/stores/useStore";

export const TelemetryService = {
    pluginStatistics: () => {
        return new Promise(async (resolve, reject) => {
            const use = useStore();
            let url = "/statistics/plugin";
            if (import.meta.env.PROD) {
                url = import.meta.env.VITE_API_FILE_URL + url;
            } else {
                url = "/api2" + url;
            }
            try {
                const param = Object.assign(use.appInfo || {}, {
                    appId: use.appId,
                    ide: use.IdeType,
                    ideVersion: "",
                    pluginVersion: "1.0.0"
                });
                await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(param)
                });
            } catch (e) {
                console.log(e);
                reject(e);
            }
            resolve();
        });
    }
}