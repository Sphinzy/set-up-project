<template>
    <NavBar></NavBar>
    <div class="container-fluid">
        <div class="row">
            <div class="col-2 p-0">
                <SideBar></SideBar>
            </div>

            <div class="col-10 ">
                <div class="container mt-15">
                    <h3>Profile</h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import api from '@/api/http';
import NavBar from '@/components/layout/NavBar.vue';
import SideBar from '@/components/layout/SideBar.vue';
import { useAuthStores } from '@/stores/auth';
import { onMounted, ref } from 'vue';

let auth = useAuthStores();
let getProfile = ref('');
onMounted( async () => {
    const res = auth.Profile();
    getProfile.value = res.data;

})

</script>

<style scoped>

</style>