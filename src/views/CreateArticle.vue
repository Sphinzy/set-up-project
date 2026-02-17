<template>
    <NavBar></NavBar>
    <div>
        <div class="container position-absolute p-0">
            <div class="row">
                <div class="col-3">
                    <SideBar></SideBar>

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
                                        <input type="text" class="form-control" placeholder="Enter article title"
                                            v-model="form.title" />
                                        <p v-if="err.title" class="text-danger pt-2">{{ err.title }}</p>
                                    </div>

                                    <!-- Category -->
                                    <div class="mb-3">
                                        <label class="form-label">Category</label>
                                        <select class="form-select" @change="e => console.log(e.target.value)"
                                            v-model="form.categoryId">
                                            <option disabled value="">Choose category</option>
                                            <option v-for="cate in category.categories" :key="cate.id" :value="cate.id">
                                                {{ cate.name }}</option>
                                        </select>
                                        <p v-if="err.categoryId" class="text-danger pt-2">{{ err.categoryId }}</p>

                                    </div>

                                    <!-- Thumbnail -->
                                    <!-- Thumbnail -->
<div class="mb-3">
    <label class="form-label">Thumbnail Image</label>

    <!-- File input (hidden when preview exists) -->
    <input
        ref="fileInput"
        type="file"
        class="form-control"
        accept="image/*"
        @change="handleFile"
        v-show="!thumbnailPreview"
    />

    <!-- Preview -->
    <div v-if="thumbnailPreview" class="mt-3">
        <img
            :src="thumbnailPreview"
            width="120"
            height="120"
            class="border p-1 rounded object-fit-contain"
        />

        <div class="mt-2 d-flex gap-2">
            <button type="button" class="btn btn-sm btn-outline-primary" @click="changeImage">
                Change
            </button>

            <button type="button" class="btn btn-sm btn-outline-danger" @click="removeImage">
                Remove
            </button>
        </div>
    </div>

    <p v-if="err.thumbnail" class="text-danger pt-2">{{ err.thumbnail }}</p>
</div>


                                    <!-- Content -->
                                    <div class="mb-3">
                                        <label class="form-label">Content</label>
                                        <textarea class="form-control" rows="5"
                                            placeholder="Write your article content..."
                                            v-model="form.content"></textarea>
                                        <p v-if="err.content" class="text-danger pt-2">{{ err.content }}</p>

                                    </div>

                                    <!-- Actions -->
                                    <div class="d-flex justify-content-end gap-2">
                                        <button type="reset" class="btn btn-outline-secondary">
                                            Cancel
                                        </button>
                                        <button :disabled="isLoading" type="submit"
                                            class="btn btn-primary px-3 d-flex align-items-center">
                                            <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"
                                                role="status" aria-hidden="true"></span>
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
</template>

<script setup>
import api from '@/api/http';
import NavBar from '@/components/layout/NavBar.vue';
import SideBar from '@/components/layout/SideBar.vue';
import router from '@/router';
import { useCategoryStore } from '@/stores/category';
import { required, validateContentLength } from '@/utils/articleValidate';
import { notify } from '@/utils/toast';
import { onMounted, reactive, ref } from 'vue';

const notifier = notify();
const isLoading = ref(false);
let category = useCategoryStore();
const thumbnailPreview = ref('');


onMounted(() => {
    category.fetchCategory(1, 10);
})
const form = reactive({
    title: '',
    content: '',
    categoryId: '',
})
let err = reactive({
    title: '',
    content: '',
    categoryId: '',
    thumbnail: ''
})
const fileInput = ref(null);

function changeImage() {
    fileInput.value.click(); // open file picker again
}

function removeImage() {
    file.value = null;
    thumbnailPreview.value = '';
    fileInput.value.value = ''; // reset input
}

function validateForm() {
    err.title = required(form.title)
    err.categoryId = required(form.categoryId)
    err.thumbnail = file.value ? '' : 'Thumbnail is required'
    err.content = validateContentLength(form.content)
    return !err.title && !err.categoryId && !err.thumbnail && !err.content;
}


const file = ref(null);
async function handleForm() {
    if (!validateForm()) return
    isLoading.value = true;
    try {
        let res = await api.post('/articles', form);
        let idArt = res.data.data.id;
        console.log(idArt);
        if (file.value) {
            let formData = new FormData();
            formData.append('thumbnail', file.value)
            await api.post(`/articles/${idArt}/thumbnail`, formData);
            notifier.success('Article Posted', '/article')
        }

    } catch (err) {
        console.error(err.response?.data)
    } finally {
        isLoading.value = false;
    }
}

async function handleFile(event) {
    let selectFile = event.target.files[0];
    // console.log(selectFile);
    if (selectFile) {
        file.value = selectFile;
        thumbnailPreview.value = URL.createObjectURL(selectFile)
    }
}



</script>

<style scoped></style>