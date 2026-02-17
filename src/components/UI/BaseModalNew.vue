<template>
    <div>
        <!-- Modal -->
        <div class="modal fade show d-block"  style="background-color: rgba(0,0,0,0.5);" @click.self="$emit('close')">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="header d-flex justify-content-between">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">{{ title }}</h1>
                            <button type="button" class="btn-close" @click="$emit('close')" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="body px-2 py-4">
                            <slot name="content"></slot>
                        </div>
                        <div class="text-end py-2">
                            <slot name="footer"></slot>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: String,
})
defineEmits(['close'])
</script>

<style scoped></style>