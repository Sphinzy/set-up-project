<template>
  <div class="col-12 col-md-6 col-lg-4" v-for="n in 6" :key="n">
    <div class="card h-100 p-3 skeleton-card">
      <div class="skeleton-img mb-3 skeleton"></div>
      <div class="skeleton-badge mb-2 skeleton"></div>
      <div class="skeleton-title mb-2 skeleton"></div>

      <!-- <div class="skeleton-text mb-1 skeleton"></div>
                  <div class="skeleton-text mb-1 skeleton"></div> -->
      <div class="skeleton-text w-75 skeleton"></div>

      <div class="d-flex justify-content-between align-items-center mt-auto">
        <div class="skeleton-small my-5 skeleton"></div>

        <!-- <div class="d-flex gap-2">
          <div class="skeleton-btn skeleton"></div>
          <div class="skeleton-btn skeleton"></div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import NavBar from '../layout/NavBar.vue';

/* Static skeleton */
</script>

<style scoped>
/* 🔹 Shimmer animation */
@keyframes shimmer {
  100% {
    background-position: 400% 0;
  }

  0% {
    background-position: -400% 0;
  }
}

/* 🔹 Skeleton shimmer (LIGHT MOVES LEFT ➜ RIGHT) */
.skeleton {
  --speed: 7s;

  background-image: linear-gradient(90deg,
      #e0e0e0 25%,
      #f8f8f8 37%,
      #e0e0e0 63%);

  background-size: 400% 100%;
  animation: shimmer var(--speed) linear infinite;
  border-radius: 6px;
}

/* 🔹 Card soft shadow */
.skeleton-card {
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.06);
}

/* Sizes */
.skeleton-img {
  height: 300px;
  border-radius: 6px;
}

.skeleton-badge {
  width: 120px;
  height: 22px;
  border-radius: 6px;
}

.skeleton-title {
  height: 22px;
  width: 80%;
}

.skeleton-text {
  height: 14px;
  width: 100%;
  border-radius: 6px;
}

.skeleton-small {
  width: 160px;
  height: 14px;
}

.skeleton-btn {
  width: 60px;
  height: 30px;
}
</style>
