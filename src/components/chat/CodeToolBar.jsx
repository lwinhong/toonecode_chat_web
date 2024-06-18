import { render } from 'vue';
import IconClipboardSvg from "../icons/IconClipboardSvg.vue";
import IconInsertSvg from "../icons/IconInsertSvg.vue";
import IconPlusSvg from "../icons/IconPlusSvg.vue";

export function renderCodeAndToolBar(pre_el, code_el, isInCodeIDE, props) {
    isInCodeIDE = true;
    code_el.classList.add("input-background", "p-4", "pb-2", "block", /*"whitespace-pre",*/ "overflow-x-scroll");
    code_el.parentElement.classList.add("pre-code-element", "relative");
    let click = (target) => props?.onclick?.(target.currentTarget, code_el);

    let inserCode =
        <button id="insert-code" title='将以上内容插入到当前文件' class='edit-element-ext p-1 pr-2 flex items-center rounded-lg'
            onClick={click}
        >
            <IconInsertSvg />插入
        </button>
    let newFile =
        <button id="new-file" title='新建文件并将以上代码置入' class='new-code-element-ext p-1 pr-2 flex items-center rounded-lg'
            onClick={click}
        >
            <IconPlusSvg /> 新建
        </button>

    let wapper =
        <div class="code-actions-wrapper flex  pr-2 pt-1 pb-1 flex-wrap items-center justify-end input-background">
            <button id="copy-code" title='复制到剪切板' class='code-element-ext p-1 pr-2 flex items-center rounded-lg'
                onClick={click}
            >
                <IconClipboardSvg /> 复制
            </button>
        </div>

    if (isInCodeIDE) {
        wapper.children.push(inserCode);
        wapper.children.push(newFile);
    }
    render(wapper, pre_el);
}