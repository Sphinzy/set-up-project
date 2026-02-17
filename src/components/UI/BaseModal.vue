<template>
    <div>

        <div v-if="openModal">
            <!-- Modal -->
            <div class="modal d-block fadeModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-body">
                            <slot name="title">

                            </slot>
                            <slot name="content"></slot>
                            <div class="text-end pt-5">
                                <slot name="footer">

                                </slot>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script setup>
const props = defineProps({
    openModal: Boolean
})
const emit = defineEmits(['close'])


</script>

<style scoped>
</style>