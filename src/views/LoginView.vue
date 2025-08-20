<template>
  <div class="login-wrapper">
    <div class="login-container">
      <div class="login-form">
        <div class="form-content">
          <h2>Sign in</h2>
          <p>Access your space and keep building.</p>

          <form @submit.prevent="handleLogin">
            <div class="mb-3 position-relative">
              <label for="username" class="form-label">Email</label>
              <i class="bi bi-envelope icon-input"></i>
              <input
                type="text"
                class="form-control with-icon"
                id="username"
                v-model="form.username"
                placeholder="you@example.com"
                required
              />
            </div>

            <div class="mb-3 position-relative">
              <label for="password" class="form-label">Password</label>
              <i class="bi bi-lock icon-input"></i>
              <input
                type="password"
                class="form-control with-icon"
                id="password"
                v-model="form.password"
                placeholder="••••••••"
                required
              />
            </div>

            <div class="text-end mb-3">
              <a href="#" class="small text-decoration-none">Forgot password?</a>
            </div>

            <button type="submit" class="btn btn-primary w-100 mb-3" :disabled="isLoading">
              <span v-if="isLoading">
                <i class="bi bi-arrow-repeat spin me-2"></i>Logging in...
              </span>
              <span v-else>Log in</span>
            </button>

            <div class="separator">
              <span>Or continue with</span>
            </div>

            <div class="d-grid gap-2 mb-4">
              <button type="button" class="btn btn-outline-danger" @click="handleGoogleLogin">
                <i class="bi bi-google me-2"></i>Continue with Google
              </button>
              <!-- <button type="button" class="btn btn-outline-primary" disabled>
                <i class="bi bi-facebook me-2"></i>Continue with Facebook
              </button> -->
            </div>

            <div class="text-center">
              <span class="text-muted">No account yet?</span>
              <a @click.prevent="goToRegister" href="#" class="text-decoration-none fw-semibold ms-1">Create account</a>
            </div>
          </form>
        </div>
      </div>

      <div class="login-image">
        <img :src="illustration" alt="Student Illustration" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import illustration from '@/assets/studen.jpg'
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { app } from "@/firebase/db"

const form = reactive({
  username: '',
  password: ''
})

const isLoading = ref(false)
const router = useRouter()

async function handleLogin() {
  isLoading.value = true
  const auth = getAuth(app)
  try {
    await signInWithEmailAndPassword(auth, form.username.trim(), form.password)
    router.push({ name: 'home' }) // Redirected to Home
  } catch (error) {
    alert(error.message)
  }
  isLoading.value = false
}

async function handleGoogleLogin() {
  isLoading.value = true
  const auth = getAuth(app)
  const provider = new GoogleAuthProvider()
  try {
    await signInWithPopup(auth, provider)
    router.push({ name: 'home' }) // Redirected  to  Home
  } catch (error) {
    alert(error.message)
  }
  isLoading.value = false
}

function goToRegister() {
  router.push({ name: 'register' })
}
</script>

<style src="../styles/auth.css"></style>

