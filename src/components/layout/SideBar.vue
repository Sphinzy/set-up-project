<template>
    <!-- Sidebar -->
    <div class="sidebar p-3 position-fixed mt-3 z-2">
        <h5 class="text-white mb-4 ">Admin Panel</h5>
        <router-link to="/"><i class="bi bi-speedometer2 me-2" exact-active-class="active"></i>Dashboard</router-link>
        <router-link to="/article"><i class="bi bi-file-earmark-text me-2" exact-active-class="active"></i>Articles</router-link>
        <router-link to="/createArt"><i class="bi bi-patch-plus me-2" exact-active-class="active"></i>Creat Article</router-link>
        <router-link to="/"><i class="bi bi-people me-2" exact-active-class="active"></i>Users</router-link>
        <!-- <router-link to="categories/"><i class="bi bi-tags me-2" exact-active-class="active"></i>Categories</router-link> -->
        <router-link to="/newcategories"><i class="bi bi-tags me-2" exact-active-class="active"></i>Categories</router-link>
        <router-link to="/"><i class="bi bi-gear me-2" exact-active-class="active"></i>Settings</router-link>
        <hr class="border-secondary" />
        <button class="btn text-secondary" @click="handleLogout"><i class="bi bi-box-arrow-left me-2"></i> Logout</button>
    </div>
    <!-- Modal -->
    <!-- <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <h3>Do you wanna logout</h3>
                <div class="text-end">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-danger" @click="handleLogout">Logout</button>
                </div>
                </div>
            </div>
        </div>
    </div> -->
</template>

<script setup>
import router from '@/router';
import { useAuthStores } from '@/stores/auth';
import '@/assets/style.css'

const autn = useAuthStores();
async function handleLogout() {
    autn.Logout();
    router.push({name: 'login'})
}

</script>