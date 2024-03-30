import { useStore } from '../stores/useStore';

const util = {
    postMessageToVsCode(data) {
        util.getUseStore()?.postMessageToVsCode(data);
    },
    getUseStore() {
        return this.useStore || (this.useStore = useStore());
    },
    escapeHtml(unsafe) {
        if (unsafe)
            return unsafe.replaceAll('&amp;', '&').replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&quot;', '"').replaceAll('&#039;', "'");
        return unsafe;
    },
    unEscapeHtml(unsafe) {
        if (unsafe)
            return unsafe.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
        return unsafe;
    }
}
export default util;