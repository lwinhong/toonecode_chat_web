import { defineStore } from 'pinia'

export const useStore = defineStore('useStore', {
  state: () => ({
    isVsCodeMode: false,
    isIdeaMode: false,
    isInCodeIDE: false,
  }), actions: {
    setVsCodeMode(mode) {
      this.isVsCodeMode = mode;
      if (mode)
        this.isInCodeIDE = true;
      console.log(mode ? "在vscode中" : "不在vscode中");
    },
    setIdeaMode(mode) {
      this.isIdeaMode = mode;
      if (mode)
        this.isInCodeIDE = true;
    },
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
