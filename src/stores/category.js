import api from "@/api/http";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";


export const useCategoryStore = defineStore('category', () =>{
    let categories = ref([]);
    let resultCate = ref(null)
    let message = ref(null)
    let isloading = ref(false);
    const pagination = reactive({
            "currentPage": 1,
            "itemPerPage": 3,
            "totalItems": 9,
            "totalPages": 3,
            "hasPreviousPage": false,
            "hasNextPage": true
        })

    async function fetchCategory(page, per_page) {
        isloading.value = true;
        const res = await api.get(`/categories?_page=${page}&_per_page=${per_page}&sortBy=name&sortDir=ASC&search=`)
        categories.value = res.data.data.items;
        pagination.totalItems = res.data.data.meta.totalItems;
        pagination.totalPages = res.data.data.meta.totalPages;
        pagination.currentPage = res.data.data.meta.currentPage;
        isloading.value = false;
    }
    async function CreateCategory(name) {
        try {
            const res = await api.post('/categories/', { name })
            resultCate.value = res.data.result;
            message.value = res.data.message;
            return resultCate.value;

        } catch (err) {
            resultCate.value = false;
            message.value = err.response?.data?.message || 'Something went wrong';
            console.error(err)
            return false
        }

    }

    async function DeleteCategory(id) {
        try {
            await api.delete(`/categories/${id}`)
        } catch (err) {
            console.error(err);
        }
    }
    async function EditCategory(id, name) {
        try {
            const res = await api.put(`/categories/${id}`, { name })
            console.log(res);   
        } catch (err) {
            console.error(err);
            throw new Error(err.response?.data?.message || 'Failed to update category')
        }
    }

    return { categories, fetchCategory, CreateCategory, DeleteCategory, EditCategory, resultCate, message, pagination,isloading }
})