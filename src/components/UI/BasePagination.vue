<template>
    <nav aria-label="Pagination">
        <ul class="pagination custom-pagination">
            <li class="page-item" @click="prevPage">
                <a href="#" class="page-link">Previous</a>
            </li>

            <li class="page-item" v-for="value in totalPages" :key="value" :class="{ active: value === currentPage }"
                @click="btnPagination(value)">
                <button class="page-link" href="#">{{ value }}</button>
            </li>

            <li class="page-item" @click="nextPage">
                <button class="page-link">Next</button>
            </li>
        </ul>
    </nav>

</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    totalPages: { type: Number, default: 0 },
    current: { type: Number, default: 0 }
})
const currentPage = ref(props.current)
const emit = defineEmits(['update:page'])
watch(() => props.current, (val) => { currentPage.value = val })

const goToPage = (page) => {
    if (page !== currentPage.value) {
        currentPage.value = page
        emit('update:page', page)
    }
}

const nextPage = () => {
    if (currentPage.value < props.totalPages) {
        goToPage(currentPage.value + 1)
    }
}

const prevPage = () => {
    if (currentPage.value > 1) {
        goToPage(currentPage.value - 1)
    }
}
const btnPagination = (value) => {
    goToPage(value)
}



</script>

<style scoped>
.custom-pagination {
    gap: 6px;
}

/* Page button */
.custom-pagination .page-link {
    border-radius: 8px;
    padding: 8px 14px;
    color: #555;
    border: 1px solid #e0e0e0;
    background-color: #fff;
    transition: all 0.25s ease;
    font-weight: 500;
}

/* Hover */
.custom-pagination .page-link:hover {
    background-color: #f1f5ff;
    color: #3b5bfd;
    border-color: #3b5bfd;
}

/* Active page */
.custom-pagination .page-item.active .page-link {
    background-color: #3b5bfd;
    color: #fff;
    border-color: #3b5bfd;
    box-shadow: 0 4px 10px rgba(59, 91, 253, 0.35);
}

/* Previous / Next */
.custom-pagination .page-item:first-child .page-link,
.custom-pagination .page-item:last-child .page-link {
    font-weight: 600;
}

/* Disabled state (optional) */
.custom-pagination .page-item.disabled .page-link {
    opacity: 0.5;
    pointer-events: none;
}

</style>