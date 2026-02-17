import api from "@/api/http";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";


export const useOwnArticleStore = defineStore('own', () => {
    const ownArticle = ref([]);
    const pagination = reactive({
        "currentPage": 1,
        "itemPerPage": 3,
        "totalItems": 9,
        "totalPages": 3,
        "hasPreviousPage": false,
        "hasNextPage": true
    })

    async function fetchOwnArt(page, perPage) {
        try {
            const res = await api.get(`/articles/own?search=&_page=${page}&_per_page=${perPage}&sortBy=createdAt&sortDir=DESC`);
            ownArticle.value = res.data.data.items;
            // console.table(res.data.data.items);
            pagination.totalItems = res.data.data.meta.totalItems;
            pagination.totalPages = res.data.data.meta.totalPages;
            pagination.currentPage = res.data.data.meta.currentPage;

            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    return {ownArticle, fetchOwnArt, pagination}
})