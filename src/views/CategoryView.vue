<template>
    <NavBar></NavBar>
    <div class="container-fluid">
        <div class="row">
            <div class="col-2 p-0">
                <SideBar></SideBar>
            </div>

            <div class="col-10">
                <div class="container mt-15">
                    <!-- <h3>{{ categories.categories }}</h3> -->
                    <h3>Categoies</h3>
                    <div class="row">
                        <div class="col-12">
                            <div class="text-end">
                                <BaseModal :openModal="openModal" @close="isShow"></BaseModal>
                                <button type="button" @click="isShow" class="btn btn-primary mb-5">
                                    Create Categoies
                                </button>
                            </div>
                        </div>
                        <div class="col-12">
                            <!-- Table -->
                            <BaseTable :rows="rows.categories" :columns="columns" @delete="openDeleteModal"
                                @edit="handleEdit">
                            </BaseTable>

                            <!-- Modal cate / edit  -->

                            <BaseModal :openModal="openModal">
                                <template #title>
                                    <h4 class="pb-3">Create Category</h4>
                                </template>
                                <template #content>
                                    <input type="" name="" value="" class="form-control" v-model="inputCate"
                                        placeholder="Create a new category..." />
                                </template>
                                <template #footer>
                                    <button type="button" class="btn btn-secondary" @click="isShow">
                                        Close
                                    </button>
                                    <button type="button" class="btn btn-primary" @click="handleSave">
                                        Save
                                    </button>
                                </template>
                            </BaseModal>

                            <!-- Modal Delete  -->
                            <BaseModal :openModal="isDelete" @delete="openDeleteModal">
                                <template #title>
                                    <h4 class="pb-3">Delete Category</h4>
                                </template>
                                <template #content>
                                    Are you sure you want to delete this category
                                    <strong>{{ cateName }}</strong> ?
                                </template>
                                <template #footer>
                                    <button class="btn btn-secondary" @click="openDeleteModal">
                                        Cancel
                                    </button>
                                    <button class="btn btn-danger" @click="handleDelete">Delete</button>
                                </template>
                            </BaseModal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import NavBar from "@/components/layout/NavBar.vue";
import SideBar from "@/components/layout/SideBar.vue";
import BaseModal from "@/components/UI/BaseModal.vue";
import BaseTable from "@/components/UI/BaseTable.vue";
import { useCategoryStore } from "@/stores/category";
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { notify } from "@/utils/toast";

const notifier = notify();
let category = useCategoryStore();
const { resultCate } = storeToRefs(category);
const { message } = storeToRefs(category);

let columns = [
    // { label: 'Id', key: 'id' },
    { label: "Name", key: "name" },
];

let openModal = ref(false);
let isDelete = ref(false);
const deleteId = ref(null);
const cateName = ref("");
const inputCate = ref("");
const editId = ref(null);
const per_page = ref(5)

function isShow() {
    openModal.value = !openModal.value;
    console.log(openModal.value);
}
function openDeleteModal(getParam) {
    deleteId.value = getParam.id;
    cateName.value = getParam.name;
    isDelete.value = !isDelete.value;
    console.log(isDelete);
}

let rows = useCategoryStore();
onMounted(async() => {
    await rows.fetchCategory(1,per_page.value);
});

const props = defineProps({
    openModal: Boolean,
});
const emit = defineEmits(["close"]);

const handleCreateCate = async () => {
    await category.CreateCategory(inputCate.value);
    if (resultCate.value === true) {
        isShow();
        inputCate.value = "";
        notifier.success(message.value);
        rows.fetchCategory(1,per_page.value);
    } else {
        notifier.error(message.value);
    }
};

const handleDelete = async () => {
    await category.DeleteCategory(deleteId.value);
    isDelete.value = false;
    deleteId.value = null;
    notifier.success("Category Deleted!");
    rows.fetchCategory(1,per_page.value);
};

const handleEdit = async (getParam) => {
    openModal.value = !openModal.value;
    editId.value = getParam.id;
    inputCate.value = getParam.name;
};

const handleSave = async () => {
    if (!inputCate.value) return;

    try {
        if (editId.value) {
            await category.EditCategory(editId.value, inputCate.value);
            notifier.success("Updated category successful.");
            rows.fetchCategory(1,per_page.value);
        } else {
            await handleCreateCate();
        }
        openModal.value = false;
        inputCate.value = "";
        editId.value = null;
        rows.fetchCategory(1,per_page.value);
    } catch (err) {
        notifier.error(err.message);
    }
};
</script>

<style scoped></style>
