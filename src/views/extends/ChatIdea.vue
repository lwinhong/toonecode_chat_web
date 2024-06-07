<script>
import ChatView from '@/components/chat/ChatView.vue';
import { useStore } from '@/stores/useStore';

export default {
    extends: ChatView,
    setup(props, ctx) {
        return {
            ...ChatView.setup(props, ctx),
        }
    },
    mounted() {
        console.log("idea view mounted")
        useStore().setIdeaMode(true);
    }
}
</script>