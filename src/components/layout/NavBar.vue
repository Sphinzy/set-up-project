<template>
  <!-- Top Navbar -->
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-3 position-fixed w-100 z-3">
    <div class="container-fluid">
      <span class="navbar-brand fw-bold">📰 Article Dashboard</span>
      <div class="d-flex align-items-center gap-3">
        <i class="bi bi-bell fs-5"></i>
        <img :src="getProfile.data?.avatar" height="50" width="50" class="rounded-circle" />
      </div>
    </div>
  </nav>
</template>

<script setup>
import api from '@/api/http';
import { useAuthStores } from '@/stores/auth';
import { onMounted, ref } from 'vue';


let auth = useAuthStores();
let getProfile = ref({});

// onMounted( async () => {
//   const res = auth.Profile();
//   getProfile.value = res.data;
//   console.log(getProfile.value);
// })
onMounted( async () => {
  const res = await api.get('/auth/profile');
  getProfile.value = res.data;
  // console.log(getProfile.value);
})

</script>
