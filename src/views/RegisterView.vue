<template>
    <div class="container">
        <section class="vh-100 d-flex align-items-center justify-content-center bg-light">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-12 col-md-8 col-lg-5">
                        <div class="card shadow-sm border-0">
                            <div class="card-body p-5">
                                <h2 class="fw-bold mb-4 text-center">Register</h2>

                                <form @submit.prevent="handleRegister">
                                    <div class="d-flex mb-3">
                                        <div class="me-2">
                                            <label for="">First Name</label>
                                            <input class="form-control w-100 " v-model="firstName" type="text" name="" id="">
                                        </div>
                                        <div class="ms-2">
                                            <label for="">Last Name</label>
                                            <input class="form-control w-100" v-model="lastName" type="text" name="" id="">
                                        </div>
                                    </div>
                                    
                                    <div class="mb-3">
                                        <label for="emailInput" class="form-label">Email address</label>
                                        <input v-model="email" type="email" class="form-control" id="emailInput"
                                            placeholder="name@example.com" required>
                                    </div>

                                    <div class="mb-3">
                                        <label for="passwordInput" class="form-label">Password</label>
                                        <input v-model="password" type="password" class="form-control"
                                            id="passwordInput" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="passwordInput" class="form-label">Comfirm Password</label>
                                        <input v-model="confirmPassword" type="password" class="form-control"
                                            id="passwordInput" required>
                                    </div>

                                    <div class="d-flex justify-content-between align-items-center mb-4">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="" id="rememberMe">
                                            <label class="form-check-label" for="rememberMe">Remember me</label>
                                        </div>
                                        <a href="#" class="text-decoration-none small">Forgot password?</a>
                                    </div>

                                    <div class="d-grid">
                                        <button type="submit" class="btn btn-primary btn-lg">Sign In</button>
                                    </div>

                                    <p class="text-center mt-4 mb-0">Don't have an account? <router-link to="/login">Sign up</router-link> </p>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import router from '@/router'
import { useAuthStores } from '@/stores/auth'

const auth = useAuthStores()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const firstName = ref('')
const lastName = ref('')

const handleRegister = async () => {
    if (password.value !== confirmPassword.value) {
        alert('Passwords do not match')
        return
    }

    await auth.Register(
        firstName.value,
        lastName.value,
        email.value,
        password.value,
        confirmPassword.value
    )

    router.push({ name: 'login' })
}
</script>


<style scoped>

</style>