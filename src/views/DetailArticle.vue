<template>
    <div>
        <NavBar></NavBar>
        <div class="container-fluid">
            <div class="row">
                <div class="col-2 p-0   ">
                    <SideBar></SideBar>
                </div>
                <div class="col-10">
                    <div class="container mt-20">
                        <h3 class="text-center pb-6">Detail Page</h3>
                        <div class="card">
                            <div class="row">
                            <div class="col-6">
                                <div class="card p-3">
                                    <img :src="getDetail.thumbnail" class="object-fit-cover rounded-3" height="500" alt="">
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="d-flex pt-5">
                                    <img :src="getDetail.creator?.avatar" width="50" height="50" class="rounded-circle object-fit-cover" alt="">
                                    <div class="ms-2">
                                        <span class="fw-bold">Author : <span class="fw-medium">{{ getDetail.creator?.firstName }} {{ getDetail.creator?.lastName }}</span> </span><br>
                                        <span class="fw-bold">Date : <span class="fw-medium">{{ new Date().toDateString(getDetail.updatedAt) }}</span> </span>
                                    </div>
                                </div>
                                
                                <div>
                                    <h3 class="mt-5 fw-medium py-4">Title : <span>{{ getDetail.title }}</span></h3>
                                    <p class="fw-bold pt-2">Category : <span>{{ getDetail.category?.name || 'N/A'  }}</span></p>
                                    <p class="pe-4" style="text-align:justify ;">{{ getDetail.content }}</p>
                                </div>

                                <div>
                                    <router-link to="/" class="btn btn-outline-primary">Back</router-link>
                                </div>
                            </div>
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
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

let route = useRoute();
let artId = route.params.id;
// console.log(artId);
const getDetail = ref({});
onMounted(async () => {
    const res = await api.get(`/articles/${artId}`)
    getDetail.value = res.data.data;
    console.log(getDetail.value);
})


</script>

<style scoped>

</style>