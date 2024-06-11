import { defineComponent, ref } from 'vue'
import ToolView from './ToolView.vue';
import { Translate2j } from '@/util/translate2j.js'

export default defineComponent({
    components: {
        ToolView
    },
    data() {
        return {
            data: {
                title: 'SQL转Java类',
                subtitle: '根据SQL数据生成Java类型',
                name: 'sql2java',
                click: (item) => this.onUploadFile(item)
            }
        }
    },
    setup() {
        let fileUploadInputRef = ref();
        return { fileUploadInputRef }
    },
    methods: {
        onUploadFile(item) {
            this.fileUploadInputRef.click();
        },
        async onUploadFileChange(e) {
            const file = e.target.files[0];
            try {
                if (file.name.endsWith('.sql')) {

                    new Translate2j().excelFile2J(file);

                    // const reader = new FileReader()
                    // reader.onload = (e) => {
                    //     console.log(reader.result)
                    //     new Translate2j().sql2j(reader.result)
                    // }
                    // // text类型
                    // reader.readAsText(file, 'utf-8')

                }
            } catch (e) {
                this.$toast.error(e)
            }
            finally {
                this.fileUploadInputRef.value = "";
            }
        }
    }
})