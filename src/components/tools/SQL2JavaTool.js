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
                subtitle: '根据SQL脚本生成Java类',
                name: 'sql2java',
                click: this.onToolClick,
                disabled: false
            }
        }
    },
    setup() {
        let fileUploadInputRef = ref();
        return { fileUploadInputRef }
    },
    methods: {
        onToolClick(item) {
            if(this.data.disabled){
                this.$toast.loading('正在生成,请稍候...')
                return;
            }
            this.fileUploadInputRef.click();
        },
        async onUploadFileChange(e) {
            const file = e.target.files[0];
            try {
                // if (!file.name.endsWith('.sql')) {
                //     return;
                // }
                this.data.disabled = true;
                this.$toast.loading('正在生成,请稍候...')

                //文件的方式上传
                // await new Translate2j().excelFile2J(file);
                // this.data.disabled = false;

                //读取text方式
                const reader = new FileReader()
                reader.onload = async () => {
                    try {
                        await new Translate2j().sql2j(reader.result, null, file.name);
                    } catch (e) {
                        this.$toast.error("SQL转java失败");
                        console.error(e)
                    }
                    this.data.disabled = false;
                }
                reader.onerror = () => {
                    this.$toast.error("文件读取失败")
                    this.data.disabled = false;
                }
                // text类型
                reader.readAsText(file, 'utf-8')
            } catch (e) {
                this.$toast.error("文件格式错误")
                console.error(e)
            }
            finally {
                this.fileUploadInputRef.value = "";
            }
        }
    }
})