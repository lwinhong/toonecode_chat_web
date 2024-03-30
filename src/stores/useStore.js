import { defineStore } from 'pinia'

export const useStore = defineStore('useStore', {
  state: () => ({
    isVsCodeMode: true
  }), actions: {
    setVsCodeMode(mode) {
      this.isVsCodeMode = mode;
    },
    postMessageToVsCode(data) {
      console.log(data);
      if (this.isVsCodeMode && window.vscodeInstance) {
        window.vscodeInstance.postMessage(data);
      }
    }
  }
})
