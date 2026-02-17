<template>
    <div>
        <div class="d-flex">
            <!-- <p v-for="art in article.articles" :key="art.id">{{ art.id }}</p> -->
            <table class="table table-striped ms-5 a" style="width: 100%;">
                    <thead>
                        <tr>
                            <th v-for="col in columns" :key="col.key">{{ col.label }}</th>
                            <th class="text-end pe-3">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="row in rows" :key="row.id" class="align-middle">
                            <td v-for="col in columns" :key="col.key">
                                <slot :name="`col-${col.key}`" :value="row[col.key]">
                                    {{ textCut(row[col.key]) }}
                                    <!-- {{ row[col.key] }} -->
                                </slot>
                            </td>
                            <td class="text-end">
                                <button class="btn text-primary me-3" @click="$emit('edit', { id: row.id, name: row.name })"> <square-pen></square-pen> </button>
                                <button class="btn text-danger" @click="$emit('delete',{ id: row.id, name: row.name })"> <trash2></trash2> </button>
                            </td>
                        </tr>
                    </tbody>


                </table>
        </div>
    </div>
</template>

<script setup>
import { Trash2 } from 'lucide-vue-next';

defineProps(
    {
        columns: Array, default: [],
        rows: Array, default: []
    }
)   
defineEmits(['delete', 'edit'])

function textCut(text, limit = 20) {
    if (text.length >= limit) {
        return text.slice(0, limit) + '...';
    } else {
        return text;
    }
}


</script>

<style scoped>
</style>