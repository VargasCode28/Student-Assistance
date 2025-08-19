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
              <button type="button" class="btn btn-outline-danger">
                <i class="bi bi-google me-2"></i>Continue with Google
              </button>
              <button type="button" class="btn btn-outline-primary">
                <i class="bi bi-facebook me-2"></i>Continue with Facebook
              </button>
            </div>

            <div class="text-center">
              <span class="text-muted">No account yet?</span>
              <a href="#" class="text-decoration-none fw-semibold ms-1">Create account</a>
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
import illustration from '@/assets/studen.jpg'

const form = reactive({
  username: '',
  password: ''
})

const isLoading = ref(false)

function handleLogin() {
  isLoading.value = true
  setTimeout(() => {
    console.log('Login attempt:', form)
    isLoading.value = false
  }, 2000)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css');

* {
  font-family: 'Inter', sans-serif;
}

.login-wrapper {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-x: auto;
}

.login-container {
  display: flex;
  flex-direction: row;
  width: 950px;
  height: 600px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  animation: fadeIn 0.6s ease-out;
}

.login-form {
  flex: 1;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-content {
  width: 100%;
  max-width: 300px;
  text-align: center;
}

.form-content h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #111;
}

.form-content p {
  font-size: 1rem;
  color: #333;
  margin-bottom: 2rem;
}

.form-content form {
  text-align: left;
}

.form-label {
  display: block;
  font-size: 0.95rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 0.25rem;
}

.form-control {
  font-size: 0.95rem;
  padding: 0.75rem;
  border-radius: 0.75rem;
  background-color: #f1f3f5;
  border: 1px solid #ced4da;
}

.with-icon {
  padding-left: 2.5rem;
}

.icon-input {
  position: absolute;
  top: 50%;
  left: 0.75rem;
  transform: translateY(-50%);
  font-size: 1.1rem;
  color: #6c757d;
  pointer-events: none;
}

.btn {
  font-size: 0.95rem;
  font-weight: 600;
  padding: 0.65rem 1rem;
  border-radius: 0.75rem;
  transition: all 0.2s ease;
}

.btn-primary {
  box-shadow: 0 2px 6px rgba(13, 110, 253, 0.2);
}

.btn-primary:active {
  transform: scale(0.98);
  box-shadow: none;
}

.text-muted {
  font-size: 0.85rem;
  color: #333;
}

a {
  font-size: 0.9rem;
  color: #0d6efd;
  transition: color 0.2s ease;
}

a:hover {
  color: #0a58ca;
  text-decoration: underline;
}

.spin {
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.separator {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 2rem 0;
}

.separator::before,
.separator::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid #dee2e6;
}

.separator span {
  padding: 0 1rem;
  color: #6c757d;
  font-size: 0.85rem;
}

.login-image {
  flex: 1;
  background-color: #e9ecef;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0;
}

.login-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0;
  box-shadow: none;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .login-container {
    min-width: 960px;
  }
}
</style>

<style>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  background: url('@/assets/s.webp') center center / cover no-repeat fixed;
  position: relative;
  overflow: hidden;
}

body::before {
  content: "";
  position: absolute;
  inset: 0;
  backdrop-filter: blur(15px);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.15));
  z-index: -2;
}


body::after {
  content: "";
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4); 
  z-index: -1;
}
</style>