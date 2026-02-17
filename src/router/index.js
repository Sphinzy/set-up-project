import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStores } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView, meta: { require: true}},
    { path: '/login', name: 'login', component: () => import('@/views/LoginView.vue') },
    { path: '/article', name: 'article', component: () => import('@/views/ArticleView.vue') },
    { path: '/register', name: 'register', component: () => import('@/views/RegisterView.vue') },
    { path: '/createArt', name: 'createArt', component: () => import('@/views/CreateArticle.vue') },
    { path: '/article/update/:id', name: 'editArt', component: () => import('@/views/EditArticleView.vue') },
    { path: '/article/detail/:id', name: 'detail', component: () => import('@/views/DetailArticle.vue') },
    { path: '/profile', name: 'profile', component: () => import('@/views/ProfileView.vue') },
    { path: '/loading', name: 'loading', component: () => import('@/components/UI/LoadingAnimation.vue') },
    { path: '/categories', name: 'categories', component: () => import('@/views/CategoryView.vue') },
    { path: '/newcategories', name: 'newcategories', component: () => import('@/views/NewCategory.vue') },
    { path: '/crop', name: 'crop', component: () => import('@/views/CropImage.vue') },
  ],
})

router.beforeEach((to, from) => {
  const auth =useAuthStores();

  if (!auth.isLoggedIn && to.meta.require) {
    return {name: 'login'}
  }

  return true;



})



export default router
