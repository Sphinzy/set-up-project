<template>
  <main class="container-fluid">

    <div class="row">
    <NavBar />
      <!-- Sidebar -->
      <aside class="col-2 p-0">
        <SideBar />
      </aside>

      <!-- Content -->
      <section class="col-10 pt-15">
        <!-- Page Title -->
        <div class="row align-items-center mb-4">
          <div class="col-md-5">
            <h3 class="fw-bold">Article List</h3>
          </div>

          <div class="col-md-7">
            <div class="row g-2 text-end">
              <div class="col-md-3">
                <select name="" id="" class="form-select" v-model="sortDir">
                  <option value="desc" >Descending</option>
                  <option value="asc">Asending</option>
                </select>
              </div>
              <div class="col-6">
                <input
                  type="text"
                  class="form-control border-0 shadow-sm"
                  placeholder="Search Article"
                  v-model="search"
                />
              </div>
              <div class="col-3 text-end">
                <router-link
                  to="/createArt"
                  class="btn btn-primary w-100"
                >
                  Create Article
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- Stats -->
        <div class="row mb-4">
          <div class="col-md-4">
            <div class="card p-3 shadow-sm">
              <h6>Total Articles</h6>
              <h3 class="fw-bold">
                {{ article.articles.length }}
              </h3>
            </div>
          </div>
        </div>

        <!-- Articles -->
        <div class="row g-4">
          <BaseCard
            v-if="!article.loading"
            :articles="article.articles"
          />

          <LoadingAnimation
            v-else
            class="col-12"
          />
        </div>
      </section>
    </div>
  </main>
</template>



<script setup>
import '@/assets/style.css'
import NavBar from '@/components/layout/NavBar.vue';
import SideBar from '@/components/layout/SideBar.vue';
import BaseCard from '@/components/UI/BaseCard.vue';
import LoadingAnimation from '@/components/UI/LoadingAnimation.vue';
import { useArticleStore } from '@/stores/articles';
import { onMounted, ref, watch } from 'vue';

let article = useArticleStore();
let search = ref('')
let sortDir = ref('desc');

watch([search, sortDir], async ([value, sortDirVal]) => {
  await article.fetchArticle({
    search: value,
    sortDir: sortDirVal,
  });
})


onMounted(() => {
  article.fetchArticle();
})
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
</style>