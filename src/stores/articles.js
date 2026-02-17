import api from '@/api/http'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useArticleStore = defineStore('article', () => {
    // state
    const articles = ref([])
    const loading = ref(false)

    // actions
    async function fetchArticle({search = "", sortBy = "createdAt", sortDir='DESC'} = {}) {
        try {
            loading.value = true

            const res = await api.get(
                '/articles?_page=1&_per_page=100', {
                    params: {
                        search,
                        sortBy,
                        sortDir
                    }
                }
            )

            articles.value = res.data.data.items
            // console.table(articles.value)

        } catch (error) {
            console.error('Fetch articles failed:', error)
        } finally {
            loading.value = false
        }
    }

    // expose
    return {
        articles,
        loading,
        fetchArticle
    }
})
