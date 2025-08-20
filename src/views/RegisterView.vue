<template>
  <div class="login-wrapper">
    <div class="login-container">
      <div class="login-form">
        <div class="form-content">
          <h2>New Account ?</h2>
          <p>Create your account to get started.</p>

          <form @submit.prevent="handleRegister">
            <div class="mb-3 position-relative">
              <label for="email" class="form-label">Email</label>
              <i class="bi bi-envelope icon-input"></i>
              <input
                type="email"
                class="form-control with-icon"
                id="email"
                v-model="form.email"
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

            <div class="mb-3 position-relative">
              <label for="confirmPassword" class="form-label">Confirm Password</label>
              <i class="bi bi-lock icon-input"></i>
              <input
                type="password"
                class="form-control with-icon"
                id="confirmPassword"
                v-model="form.confirmPassword"
                placeholder="••••••••"
                required
              />
            </div>
            <br>
            <button type="submit" class="btn btn-primary w-100 mb-3" :disabled="isLoading">
              <span v-if="isLoading">
                <i class="bi bi-arrow-repeat spin me-2"></i>Registering...
              </span>
              
              <span v-else>Register</span>
            </button>

            <div class="text-center">
              <span class="text-muted">Already have an account?</span>
              <a @click.prevent="goToLogin" href="#" class="text-decoration-none fw-semibold ms-1">Sign in</a>
            </div>
          </form>
        </div>
      </div>

      <div class="login-image">
        <img src="@/assets/studen.jpg" alt="Student Illustration" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { app } from "@/firebase/db"

const form = reactive({
  email: '',
  password: '',
  confirmPassword: ''
})

const isLoading = ref(false)
const router = useRouter()

async function handleRegister() {
  if (form.password !== form.confirmPassword) {
    alert('Passwords do not match')
    return
  }
  isLoading.value = true
  const auth = getAuth(app)
  try {
    const email = form.email.trim()
    await createUserWithEmailAndPassword(auth, email, form.password)
    router.push({ name: 'login' }) // Redirige a login tras registro
  } catch (error) {
    alert(error.message)
  }
  isLoading.value = false
}

function goToLogin() {
  router.push({ name: 'login' })
}
</script>



<style src="../styles/createaccount.css"></style>