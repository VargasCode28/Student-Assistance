<template>
  <div class="home-view container py-5">
    <div class="card p-4 shadow-sm">
      <h4 class="mb-4 fw-bold text-primary">📋 Panel de asistencia docente</h4>

      <!-- Selector de curso -->
      <div class="mb-3">
        <label class="form-label">Curso</label>
        <select v-model="selectedCourse" class="form-select">
          <option disabled value="">Selecciona un curso</option>
          <option>Ingeniería Informática</option>
          <option>Psicología</option>
          <option>Administración</option>
        </select>
      </div>

      <!-- Resumen visual -->
      <div v-if="students.length" class="summary-box mb-4">
        <h6 class="fw-bold mb-2">Resumen de asistencia</h6>
        <ul class="list-group">
          <li class="list-group-item d-flex justify-content-between">
            <span>Presentes</span>
            <span class="fw-bold text-success">{{ presentCount }}</span>
          </li>
          <li class="list-group-item d-flex justify-content-between">
            <span>Ausentes</span>
            <span class="fw-bold text-danger">{{ absentCount }}</span>
          </li>
        </ul>
      </div>

      <!-- Lista de estudiantes -->
      <div v-if="students.length" class="student-list">
        <div
          v-for="student in students"
          :key="student.id"
          class="d-flex justify-content-between align-items-center mb-3 p-2 rounded student-row"
        >
          <div>
            <strong>{{ student.name }}</strong>
            <small class="text-muted d-block">{{ student.rut }}</small>
          </div>

          <div class="btn-group">
            <button
              class="btn btn-sm"
              :class="student.status === 'present' ? 'btn-success' : 'btn-outline-success'"
              @click="markAttendance(student, 'present')"
            >
              ✅ Presente
            </button>
            <button
              class="btn btn-sm"
              :class="student.status === 'absent' ? 'btn-danger' : 'btn-outline-danger'"
              @click="markAttendance(student, 'absent')"
            >
              ❌ Ausente
            </button>
          </div>
        </div>
      </div>

      <!-- Mensaje si no hay estudiantes -->
      <div v-else-if="selectedCourse" class="text-muted text-center mt-4">
        No hay estudiantes registrados para este curso.
      </div>

      <!-- Confirmación -->
      <p v-if="confirmation" class="mt-3 text-center text-success fw-semibold">
        ✅ Asistencia registrada correctamente
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  query,
  where
} from 'firebase/firestore'
import { db } from '@/firebase/db'

const selectedCourse = ref('')
const students = ref<any[]>([])
const confirmation = ref(false)

watch(selectedCourse, async (course) => {
  if (!course) return
  confirmation.value = false
  const q = query(collection(db, 'students'), where('course', '==', course))
  const snapshot = await getDocs(q)
  students.value = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    status: null
  }))
})

async function markAttendance(student: any, status: 'present' | 'absent') {
  await addDoc(collection(db, 'attendance'), {
    name: student.name,
    rut: student.rut,
    course: selectedCourse.value,
    timestamp: serverTimestamp(),
    status
  })
  student.status = status
  confirmation.value = true
}

const presentCount = computed(() =>
  students.value.filter(s => s.status === 'present').length
)

const absentCount = computed(() =>
  students.value.filter(s => s.status === 'absent').length
)
</script>

<style scoped>
.home-view {
  font-family: 'Inter', sans-serif;
  background: linear-gradient(135deg, #fff8f1, #fce4ec);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 600px;
}

.student-row {
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(6px);
  border: 1px solid #eee;
}

.summary-box {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
</style>