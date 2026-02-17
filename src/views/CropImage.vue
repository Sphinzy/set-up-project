<template>
    <NavBar />

    <div>
        <div class="container position-absolute p-0">
            <div class="row">
                <div class="col-3">
                    <SideBar />
                </div>

                <div class="col-9">
                    <div class="row justify-content-center mt-20 ms-20">
                        <div class="col-12">
                            <div class="card p-4">
                                <h5 class="fw-bold mb-3">Create New Article</h5>

                                <form @submit.prevent="handleForm">

                                    <!-- Title -->
                                    <div class="mb-3">
                                        <label class="form-label">Article Title</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            v-model="form.title"
                                            placeholder="Enter article title"
                                        />
                                        <p v-if="err.title" class="text-danger pt-2">
                                            {{ err.title }}
                                        </p>
                                    </div>

                                    <!-- Category -->
                                    <div class="mb-3">
                                        <label class="form-label">Category</label>
                                        <select class="form-select" v-model="form.categoryId">
                                            <option disabled value="">Choose category</option>
                                            <option
                                                v-for="cate in category.categories"
                                                :key="cate.id"
                                                :value="cate.id"
                                            >
                                                {{ cate.name }}
                                            </option>
                                        </select>
                                        <p v-if="err.categoryId" class="text-danger pt-2">
                                            {{ err.categoryId }}
                                        </p>
                                    </div>

                                    <!-- 🔥 THUMBNAIL -->
                                    <div class="mb-3">
                                        <label class="form-label">Thumbnail Image</label>

                                        <input
                                            type="file"
                                            class="form-control"
                                            accept="image/*"
                                            @change="handleFile"
                                        />

                                        <!-- Preview -->
                                        <img
                                            v-if="thumbnailPreview"
                                            :src="thumbnailPreview"
                                            width="120"
                                            height="120"
                                            class="my-3 border p-1 rounded-1 object-fit-contain"
                                        />

                                        <p v-if="err.thumbnail" class="text-danger pt-2">
                                            {{ err.thumbnail }}
                                        </p>
                                    </div>

                                    <!-- Content -->
                                    <div class="mb-3">
                                        <label class="form-label">Content</label>
                                        <textarea
                                            class="form-control"
                                            rows="5"
                                            v-model="form.content"
                                            placeholder="Write your article content..."
                                        ></textarea>
                                        <p v-if="err.content" class="text-danger pt-2">
                                            {{ err.content }}
                                        </p>
                                    </div>

                                    <!-- Actions -->
                                    <div class="d-flex justify-content-end gap-2">
                                        <button type="reset" class="btn btn-outline-secondary">
                                            Cancel
                                        </button>
                                        <button
                                            :disabled="isLoading"
                                            type="submit"
                                            class="btn btn-primary px-3 d-flex align-items-center"
                                        >
                                            <span
                                                v-if="isLoading"
                                                class="spinner-border spinner-border-sm me-2"
                                            ></span>
                                            <span v-if="isLoading">Loading...</span>
                                            <span v-else>Publish Article</span>
                                        </button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <!-- 🔥 CROP MODAL -->
    <div
        class="modal fade"
        id="cropModal"
        tabindex="-1"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">

                <div class="modal-header">
                    <h5 class="modal-title">Crop Thumbnail</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>

                <div class="modal-body">
                    <Cropper
                        ref="cropper"
                        :src="rawImage"
                        :stencil-props="{ aspectRatio: 1 }"
                        style="height: 300px;"
                    />
                </div>

                <div class="modal-footer">
                    <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        class="btn btn-primary"
                        @click="cropImage"
                    >
                        Crop & Use
                    </button>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import api from '@/api/http'
import NavBar from '@/components/layout/NavBar.vue'
import SideBar from '@/components/layout/SideBar.vue'
import { useCategoryStore } from '@/stores/category'
import { required, validateContentLength } from '@/utils/articleValidate'
import { notify } from '@/utils/toast'
import { onMounted, reactive, ref } from 'vue'

import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'

import * as bootstrap from 'bootstrap'

const notifier = notify()
const isLoading = ref(false)
const category = useCategoryStore()

onMounted(() => {
    category.fetchCategory(1, 10)
})

/* FORM */
const form = reactive({
    title: '',
    content: '',
    categoryId: ''
})

const err = reactive({
    title: '',
    content: '',
    categoryId: '',
    thumbnail: ''
})

function validateForm() {
    err.title = required(form.title)
    err.categoryId = required(form.categoryId)
    err.thumbnail = file.value ? '' : 'Thumbnail is required'
    err.content = validateContentLength(form.content)
    return !err.title && !err.categoryId && !err.thumbnail && !err.content
}

async function handleForm() {
    if (!validateForm()) return

    isLoading.value = true
    try {
        const res = await api.post('/articles', form)
        const idArt = res.data.data.id

        if (file.value) {
            const formData = new FormData()
            formData.append('thumbnail', file.value)
            await api.post(`/articles/${idArt}/thumbnail`, formData)
            notifier.success('Article Posted', '/article')
        }
    } catch (e) {
        console.error(e.response?.data)
    } finally {
        isLoading.value = false
    }
}

/* 🔥 MODAL CROP LOGIC */
const rawImage = ref(null)
const thumbnailPreview = ref('')
const cropper = ref(null)
const file = ref(null)
let cropModal = null

function handleFile(e) {
    const selectedFile = e.target.files[0]
    if (!selectedFile) return

    rawImage.value = URL.createObjectURL(selectedFile)

    cropModal = new bootstrap.Modal(
        document.getElementById('cropModal')
    )
    cropModal.show()
}

function cropImage() {
    const result = cropper.value.getResult()
    if (!result || !result.canvas) return

    result.canvas.toBlob(blob => {
        file.value = blob
        thumbnailPreview.value = URL.createObjectURL(blob)
        rawImage.value = null
        cropModal.hide()
    }, 'image/jpeg')
}
</script>

<style scoped></style>
