import { useStore } from '../stores/useStore';
import TurndownService from 'turndown';
import { Marked } from 'marked';
import hljs from 'highlight.js';
import { markedHighlight } from "marked-highlight";
// import 'highlight.js/styles/atom-one-dark.css'

const marked = new Marked(
    markedHighlight({
        langPrefix: 'hljs language-',
        highlight(code, lang, info) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language }).value;
        }
    })
);

export const clipboardSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-license="isc-gnc" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" /></svg>`;
export const plusSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-license="isc-gnc" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>`;
export const insertSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-license="isc-gnc" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" /></svg>`;
export const checkSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-license="isc-gnc" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>`

export const util = {
    postMessageToCodeEditor(data) {
        return util.getUseStore()?.postMessageToCodeEditor(data);
    },
    postMessageToIdeaEditor(data) {
        return util.getUseStore()?.postMessageToIdeaEditor(data);
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
    },
    autoScrollToBottom(element) {
        element?.scrollTo?.({ behavior: "smooth", block: 'nearest'/*, top: element.scrollHeight */});  
        // if (element)
        //     element.scrollTop = element.scrollHeight
    },
    markedParser(value) {
        return marked.parse(value);
    },
    exportConversation(element) {
        const turndownService = new TurndownService({ codeBlockStyle: "fenced" });
        turndownService.remove('no-export');
        let markdown = turndownService.turndown(element);

        util.postMessage({
            type: "openNew",
            value: markdown,
            language: "markdown"
        })
    },
    throttle(fn, delay = 300) {
        if (this.timer == null) {
            this.timer = setTimeout(() => {
                fn()
                clearTimeout(this.timer)
                this.timer = null
            }, delay);
        }
    },
    debounce(fn, delay = 1000) {
        if (this.timer != null) {
            clearTimeout(this.timer)
            this.timer = null
        }
        this.timer = setTimeout(fn, delay)
    }
}
