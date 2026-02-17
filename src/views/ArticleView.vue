<template>
    <div>
        <NavBar></NavBar>
        <div class="d-flex">
            <!-- <p v-for="art in article.articles" :key="art.id">{{ art.id }}</p> -->
            <SideBar></SideBar>
            <div class="flex-grow-1 content position-absolute ms-23 mt-10 " style="width: 80%;">
                <h1>Articles</h1>
                <div class="text-end">
                    <router-link class="btn btn-primary mb-5" to="/createArt">Create Article</router-link>
                </div>
                <BaseTable :rows="rows.ownArticle" :columns="columns" @delete="handleDelete" @edit="handleEdit">
                    <template #col-thumbnail="{value}">
                        <img :src="value" alt="" width="80">
                    </template>
                    <template #col-category="{value}">
                        {{ value ? value.name : 'No category' }}
                    </template>
                </BaseTable>

                <div class="d-flex py-5 justify-content-center w-100 ">
                    <BasePagination :totalPages="rows.pagination.totalPages" :current="rows.pagination.currentPage" @update:page="handleNextPage" @update:pape="handlePrevPage"></BasePagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import api from '@/api/http';
import NavBar from '@/components/layout/NavBar.vue';
import SideBar from '@/components/layout/SideBar.vue';
import BasePagination from '@/components/UI/BasePagination.vue';
import BaseTable from '@/components/UI/BaseTable.vue';
import { useOwnArticleStore } from '@/stores/ownArticle';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

let router = useRouter();

const rows = useOwnArticleStore();
const perPage = ref(3);
const page = ref(rows.pagination.currentPage)
onMounted(() => {
    rows.fetchOwnArt(page.value ,perPage.value);
})

let columns = [
    { label: 'Id', key: 'id' },
    { label: 'Title', key: 'title' },
    { label: 'Content', key: 'content' },
    { label: 'Category', key: 'category' },
    { label: 'Thumbnail', key: 'thumbnail' },
    // { label: 'CreatedAt', key: 'createdAt' },
    
]

const handleDelete = async (getParam) => {
    await api.delete(`/articles/${getParam.id}`)
    rows.fetchOwnArt(page.value ,perPage.value);
}

const handleEdit = async (getParam) => {
    router.push(`/article/update/${getParam.id}`)
}


const handleNextPage = (page) => {
  rows.fetchOwnArt(page, perPage.value)
}
const handlePrevPage = (page) => {
  rows.fetchOwnArt(page, perPage.value)
}

// const handleSelectPage = (page) => {
//   rows.fetchOwnArt(page, perPage.value)
// }

</script>

<style scoped>
/* Table */
table {
  width: 100%;
  border-collapse: collapse;
  min-width: 900px;
}

/* Header */
table thead {
  background: #f8f9fa;
}

table th {
  padding: 14px;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  color: #555;
  border-bottom: 1px solid #eaeaea;
  position: sticky;
  top: 0;
  background: #f8f9fa;
  z-index: 1;
}
</style>