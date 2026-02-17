<template>
    <div class="container">
        <section class="vh-100 d-flex align-items-center justify-content-center bg-light">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-12 col-md-8 col-lg-5">
                        <div class="card shadow-sm border-0">
                            <div class="card-body p-5">
                                <h2 class="fw-bold mb-4 text-center">Login</h2>

                                <form @submit.prevent="handleLogin">
                                    <div class="mb-3">
                                        <label for="emailInput" class="form-label">Email address</label>
                                        <input v-model="email" type="text" class="form-control" id="emailInput"
                                            placeholder="name@example.com" >
                                        <p v-if="err.email" class="text-danger pt-2">{{ err.email }}</p>
                                    </div>

                                    <div class="mb-3">
                                        <label for="passwordInput" class="form-label">Password</label>
                                        <input v-model="password" type="password" class="form-control"
                                            id="passwordInput" >
                                        <p v-if="err.password" class="text-danger pt-2">{{ err.password }}</p>

                                    </div>

                                    <div class="d-flex justify-content-between align-items-center mb-4">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="" id="rememberMe">
                                            <label class="form-check-label" for="rememberMe">Remember me</label>
                                        </div>
                                        <a href="#" class="text-decoration-none small">Forgot password?</a>
                                    </div>

                                    <div class="d-grid">
                                        <button :disabled="isLoading" type="submit" class="btn btn-primary btn-lg">
                                            
                                            <div v-if="isLoading" class="spinner-border spinner-border-sm fw-medium" role="status">
                                                <span class="visually-hidden">Loading...</span>
                                            </div>
                                            <div v-else>
                                                Sign In
                                            </div>
                                        </button>
                                    </div>

                                    <p class="text-center mt-4 mb-0">Don't have an account? <router-link to="/register">Sign In</router-link> </p>
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

import { useAuthStores } from '@/stores/auth';
import { notify } from '@/utils/toast';
import { isEmail, isPassword, required, validate } from '@/utils/validate';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';

// import { Toast } from 'primevue';
// import { useToast } from 'primevue'
let toast = useToast();

const router = useRouter()
const notifier = notify(router)

let email = ref('');
let password = ref('');
let auth = useAuthStores();
console.log(auth);

let err = reactive({
    email: '',
    password: ''
})

let isLoading = ref(false)


function validator() {
    err.email = validate(email.value, [
        (v) => required(v, 'Email is require'),
        (v) => isEmail(v, 'Email is not format')
    ]);
    err.password = required(password.value, "Password is require")


    return !err.email && !err.password;
}


async function handleLogin() {
    if (!validator()) return;

    isLoading.value = true;

    try {
        await auth.Login(email.value, password.value);
        notifier.success("Login Successfully", '/')
    } catch (err) {
        // console.log(`catch`);
        notifier.error('Login Failed!!')
    } finally {
        isLoading.value = false;
    }
}




</script>
