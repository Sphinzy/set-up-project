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
                                <h5 class="fw-bold mb-3">Update Article</h5>

                                <form @submit.prevent="handleForm">
                                    <!-- Title -->
                                    <div class="mb-3">
                                        <label class="form-label">Article Title</label>
                                        <input type="text" class="form-control" placeholder="Enter article title"
                                            v-model="form.title" />
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
                                    </div>

                                    <!-- Thumbnail -->
                                    <div class="mb-3">
                                        <label class="form-label">Thumbnail Image</label>

                                        <!-- Existing thumbnail -->
                                        <img v-if="thumbnailPreview" :src="thumbnailPreview"
                                            class="d-block mb-2 rounded" width="120">

                                        <!-- Upload new thumbnail -->
                                        <input type="file" class="form-control" @change="handleFile">
                                    </div>


                                    <!-- Content -->
                                    <div class="mb-3">
                                        <label class="form-label">Content</label>
                                        <textarea class="form-control" rows="5"
                                            placeholder="Write your article content..."
                                            v-model="form.content"></textarea>
                                    </div>

                                    <!-- Actions -->
                                    <div class="d-flex justify-content-end gap-2">
                                        <button type="reset" class="btn btn-outline-secondary">
                                            Cancel
                                        </button>
                                        <button type="submit" class="btn btn-primary">
                                            Update Article
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
import api from '@/api/http'
import NavBar from '@/components/layout/NavBar.vue'
import SideBar from '@/components/layout/SideBar.vue'
import router from '@/router'
import { useCategoryStore } from '@/stores/category'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const articleId = route.params.id

const category = useCategoryStore()

const form = ref({
    title: '',
    content: '',
    categoryId: ''
})

const file = ref(null)
const thumbnailPreview = ref('');
console.log(thumbnailPreview.value);

onMounted(async () => {
    await category.fetchCategory()
    await fetchArticle()
})

async function fetchArticle() {
    try {
        const res = await api.get(`/articles/${articleId}`)
        const art = res.data.data;
        console.log(art);

        form.value.title = art.title
        form.value.content = art.content
        form.value.categoryId = art.category?.id || ''
        thumbnailPreview.value = art.thumbnail;
        // console.log(thumbnailPreview.value);

    } catch (err) {
        console.error(err)
    }
}

async function handleForm() {
    try {

        await api.put(`/articles/${articleId}`, form.value)

        if (file.value) {
            const formData = new FormData()
            formData.append('thumbnail', file.value)
            await api.post(`/articles/${articleId}/thumbnail`, formData)
            router.push({ name: 'article' })
        }

    } catch (err) {
        console.error(err.response?.data)
    }
}

function handleFile(event) {
    const selected = event.target.files[0]
    if (!selected) return

    file.value = selected
    thumbnailPreview.value = URL.createObjectURL(selected)
}

</script>


<style scoped></style>