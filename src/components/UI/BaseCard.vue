<template>
    <div class="col-4 col-md-6 col-lg-4" v-for="art in articles" :key="art.id">
        <router-link class="text-decoration-none" :to="`/article/detail/${art.id}`">
            <div class="card h-100 p-3">
            <img :src="art.thumbnail" height="300" class="card-img-top w-100 object-fit-cover rounded-3 mb-3"
                alt="" />

            <span class="badge bg-success mb-2 w-fit w-25">Published</span>

            <h5 class="fw-bold">{{textCut(art.title) }}</h5>
            <p class="text-muted small clamp-4">
                {{ art.content }}
            </p>

            <div class="d-flex justify-content-between align-items-center mt-auto">
                <small class="text-muted">
                    By {{ art.creator.firstName }} {{ art.creator.lastName }} • {{
                        new Date(art.createdAt).toLocaleString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                            })
                    }}
                </small>

                <!-- <div>
                    <button class="btn btn-sm btn-primary me-2">Edit</button>
                    <button class="btn btn-sm btn-outline-danger">Delete</button>
                </div> -->
            </div>
        </div>
        </router-link>
    </div>
</template>

<script setup>
import '@/assets/style.css'

function textCut(text, limit = 20) {
    if (text.length >= limit) {
        return text.slice(0, limit) + '...';
    } else {
        return text;
    }
}


defineProps(
    {
        articles: Array, default: []
    }
)


</script>

<style scoped></style>
