import { useRouter } from "vue-router"
import { useToast } from "vue-toast-notification"
export const notify = () => {
    const toast = useToast()
    const router = useRouter();

    return {
        success(text, location) {
            toast.success(text, {
                position: 'bottom-left',
                duration: 1000
            })

            setTimeout(() => {
                router.push(location)
            }, 1000)
        },
        error(text) {
            toast.error(text, {
                position: 'bottom-left',
                duration: 1000
            })
        }
    }
}

