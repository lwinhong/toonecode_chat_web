import { defineStore } from 'pinia'

export const useStore = defineStore('useStore', {
  state: () => ({
    isVsCodeMode: false,//vsocde
    isIdeaMode: false,//idea
    isInCodeIDE: false,//在IDE环境中
    isChatOnlyMode: false,//是否仅聊天模式
    chatInProgress: false,//是否回答聊天中
    IdeType: "",//IDE类型
    theme: "dark",//主题
    appId: "",
    appInfo: undefined
  }),
  actions: {
    setTheme(theme) {
      this.theme = theme;
    },
    setAppInfo(appInfo) {
      this.appInfo = appInfo;
      this.appId = appInfo?.appId;
    },
    setIdeType(type) {
      this.IdeType = type;
      this.isVsCodeMode = type === "vscode";
      this.isIdeaMode = type === "idea";
      this.isInCodeIDE = this.isVsCodeMode || this.isIdeaMode;
      this.isChatOnlyMode = type === "chatOnly";

      console.log("环境：" + type);
    },
    setChatInProgress(ing) {
      this.chatInProgress = ing;
    },
    // setVsCodeMode(mode) {
    //   this.isVsCodeMode = mode;
    //   if (mode)
    //     this.isInCodeIDE = true;
    //   console.log(mode ? "在vscode中" : "不在vscode中");
    // },
    // setIdeaMode(mode) {
    //   this.isIdeaMode = mode;
    //   if (mode)
    //     this.isInCodeIDE = true;
    // },
    postMessageToCodeEditor(data) {
      // console.log(data);
      if (this.isVsCodeMode && window.vscodeInstance) {
        window.vscodeInstance.postMessage(data);
        return true;
      }
      return false;
    },
    postMessageToIdeaEditor(data) {
      if (this.isIdeaMode && window.ideaCodeInstance) {
        if (typeof obj !== "string")
          data = JSON.stringify(data);
        window.ideaCodeInstance(data, (response) => {
          console.log(response);
        }, (error) => {
          console.log(error);
        });
        return true;
      }
      return false;
    }
  }
})
