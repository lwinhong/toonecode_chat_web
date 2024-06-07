import { defineComponent, ref } from 'vue'
import ToolView from './ToolView.vue';
import Message from '../messages/Message.vue'
export default defineComponent({
    components: {
        ToolView, Message
    },
    data() {
        return {
            data: {
                title: 'SQL转Java类', subtitle: '根据SQL数据生成Java类型', name: 'sql2java',
                click: (item) => this.onUploadFile(item)
            }
        }
    },
    setup() {
        let fileUploadInputRef = ref();
        const message = ref()
        return { fileUploadInputRef, message }
    },
    methods: {
        onUploadFile(item) {
            this.fileUploadInputRef.click();
        },
        onUploadFileChange(e) {
            const file = e.target.files[0];
            if (file.name.endsWith('.sql')) {
                const reader = new FileReader()
                reader.onload = (e) => {
                    console.log(reader.result)
                }
                // text类型
                reader.readAsText(file, 'utf-8')
                this.message.info('上传成功')
            }
        }
    }
})