<template>
    <div class="container-fluid">
        <div class="row">
            <NavBar />

            <div class="col-1 p-0">
                <SideBar />
            </div>

            <div class="col-11">
                <div class="container pt-15">
                    <h3>Category</h3>

                    <div class="row">
                        <div class="col-12 text-end my-5">
                            <button class="btn btn-primary" @click="openCreate">
                                Create
                            </button>
                        </div>
                    </div>

                    <BaseTableNew :columns="columns" :rows="category.categories" @edit="onOpenEdit"
                        @delete="openDeleteModal" :loading="category.isloading" />

                    <BasePagination :totalPages="category.pagination.totalPages"
                        :currentPage="category.pagination.currentPage" @update:page="handlePage" />

                    <BaseModalNew v-if="showModal" :title="titleModal" @close="resetModal">
                        <template #content>
                            <input class="form-control" placeholder="Enter category" v-model="name" />
                        </template>

                        <template #footer>
                            <button class="btn btn-outline-secondary me-2" @click="resetModal">
                                Cancel
                            </button>
                            <button class="btn btn-primary" @click="handleAction">
                                {{ btnName }}
                            </button>
                        </template>
                    </BaseModalNew>

                    <BaseModalNew v-if="isDelete" title="Delete Category" @close="isDelete = false">
                        <template #content>
                            <p>Do you wanna delete <strong>{{ name }}</strong> ?</p>
                        </template>
                        <template #footer>
                            <button class="btn btn-outline-secondary me-2" @click="isDelete = false">
                                Cancel
                            </button>
                            <button class="btn btn-danger" @click="handleDelete">
                                Delete
                            </button>
                        </template>
                    </BaseModalNew>


                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue"

import NavBar from "@/components/layout/NavBar.vue"
import SideBar from "@/components/layout/SideBar.vue"
import BasePagination from "@/components/UI/BasePagination.vue"
import BaseTableNew from "@/components/UI/BaseTableNew.vue"
import BaseModalNew from "@/components/UI/BaseModalNew.vue"

import { useCategoryStore } from "@/stores/category"
import api from "@/api/http"
import { notify } from "@/utils/toast"

/* -------------------- STATE -------------------- */
const category = useCategoryStore()
const notifier = notify()

const per_page = ref(5)
const showModal = ref(false)
const isDelete = ref(false)
const titleModal = ref("Create Category")
const btnName = ref("Create")
const name = ref("")
const isEdit = ref(null)

/* -------------------- TABLE -------------------- */
const columns = [
    { label: "ID", key: "id" },
    { label: "Name", key: "name" },
]

/* -------------------- LIFECYCLE -------------------- */
onMounted(() => {
    category.fetchCategory(1, per_page.value)
})

/* -------------------- METHODS -------------------- */
const handlePage = (page) => {
    category.fetchCategory(page, per_page.value)
}

const openCreate = () => {
    showModal.value = true
    titleModal.value = "Create Category"
    btnName.value = "Create"
    isEdit.value = null
    name.value = ""
}

const resetModal = () => {
    showModal.value = false
    titleModal.value = "Create Category"
    btnName.value = "Create"
    name.value = ""
    isEdit.value = null
    isDelete.value = false
}

/* -------------------- CREATE -------------------- */
const handleCreate = async () => {
    try {
        await api.post("/categories", {
            name: name.value,
        })
        notifier.success("Created Successfully")
        category.fetchCategory(1, per_page.value)
    } catch (err) {
        console.error(err)
        notifier.error("Create Failed")
    } finally {
        resetModal()
    }
}

/* -------------------- EDIT -------------------- */
const onOpenEdit = (row) => {
    showModal.value = true
    titleModal.value = "Update Category"
    btnName.value = "Update"
    isEdit.value = row.id
    name.value = row.name
}

/* -------------------- UPDATE -------------------- */
const handleUpdate = async () => {
    try {
        await api.put(`/categories/${isEdit.value}`, {
            name: name.value,
        })
        notifier.success("Updated Successfully")
        category.fetchCategory(
            category.pagination.currentPage,
            per_page.value
        )
    } catch (err) {
        console.error(err)
        notifier.error("Update Failed")
    } finally {
        resetModal()
    }
}

/* -------------------- ACTION -------------------- */
const handleAction = async () => {
    if (isEdit.value) {
        await handleUpdate()
    } else {
        await handleCreate()
    }
}

const deleteId = ref('')
const openDeleteModal = (getParam) => {
    isDelete.value = true;
    name.value = getParam.name
    deleteId.value = getParam.id;
}
const handleDelete = async () => {
    try {
        await api.delete(`/categories/${deleteId.value}`)

        notifier.success("Deleted Category")

        category.fetchCategory(
            category.pagination.currentPage,
            per_page.value
        )
    } catch (err) {
        console.error(err)
        notifier.error("Delete Failed")
    } finally {
        resetModal()
    }
}




</script>
