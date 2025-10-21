<template>
  <div class="w-full relative">
    <template v-if="isReady">
      <section class="mb-16">
        <KeunggulanPage :pageData="PageManagementData" />
      </section>

      <section id="AboutPSG" class="mb-16">
        <AboutPSG :pageData="PageManagementData" />
      </section>

      <section id="Struktur Organisasi" class="mb-16">
        <struktur-organisasi :pageData="PageManagementData" />
      </section>

      <section id="OurClients" class="mb-16">
        <OurClients :pageData="PageManagementData" />
      </section>

      <section id="PilarPSG" class="mb-16">
        <PilarPSG :pageData="PageManagementData" />
      </section>

      <section id="AnakPerusahaan" class="mb-16">
        <AnakPerusahaan :pageData="PageManagementData" />
      </section>

      <section id="GalerryPage" class="mb-16">
        <GalerryPage :pageData="PageManagementData" />
      </section>

      <section id="contactpage" class="mb-16">
        <contact-page :pageData="PageManagementData" />
      </section>

      <section id="CtaPage" class="mb-16">
        <CtaPage :pageData="PageManagementData" />
      </section>
    </template>

    <template v-else>
      <div class="py-20 text-center text-gray-500">Loading...</div>
    </template>

    <!-- Scroll to Top Button -->
    <transition name="fade-scale">
      <button
        v-if="showScrollTop"
        @click="scrollToTop"
        class="fixed bottom-8 right-8 z-50 group"
        aria-label="Scroll to top"
      >
        <!-- Button Container -->
        <div class="relative">
          <!-- Glow Effect -->
          <div class="absolute inset-0 bg-[#FFD43B] rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
          
          <!-- Main Button -->
          <div class="relative w-14 h-14 bg-gradient-to-br from-[#FFD43B] to-[#FFA500] rounded-full shadow-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300">
            <!-- Arrow Icon -->
            <svg 
              class="w-6 h-6 text-[#1A1A1A] transform group-hover:-translate-y-0.5 transition-transform duration-300" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>

            <!-- Progress Ring (Optional Enhancement) -->
            <svg class="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 56 56">
              <circle
                cx="28"
                cy="28"
                r="26"
                fill="none"
                :stroke-dasharray="circumference"
                :stroke-dashoffset="progressOffset"
                stroke="#1A1A1A"
                stroke-width="2"
                class="transition-all duration-300"
              />
            </svg>
          </div>
        </div>

        <!-- Tooltip -->
        <span class="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#1A1A1A] text-white text-sm font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          Back to Top
        </span>
      </button>
    </transition>
  </div>
</template>

<script setup>
import { onMounted, ref, nextTick, onUnmounted, computed } from 'vue'
import axios from 'axios'
import { API_ENDPOINTS } from '@/config/api'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

// Register ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin)

// Import komponen halaman
import KeunggulanPage from '@/components/SliderHome.vue'
import AboutPSG from '@/components/AboutPSG.vue'
import strukturOrganisasi from '@/components/StrukturOrganisasi.vue'
import OurClients from '@/components/OurClients.vue'
import PilarPSG from '@/components/PilarPSG.vue'
import AnakPerusahaan from '@/components/AnakPerusahaan.vue'
import contactPage from '@/components/ContactInfo.vue'
import CtaPage from '@/components/CtaPage.vue'
import GalerryPage from '@/components/GalerryPage.vue'

// State utama
const PageManagementData = ref({})
const isReady = ref(false)

// Scroll to top state
const showScrollTop = ref(false)
const scrollProgress = ref(0)
const circumference = 2 * Math.PI * 26 // radius = 26

// Computed untuk progress offset
const progressOffset = computed(() => {
  return circumference - (scrollProgress.value / 100) * circumference
})

// Scroll handler
function handleScroll() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
  
  // Show button after scrolling 300px
  showScrollTop.value = scrollTop > 300
  
  // Calculate scroll progress percentage
  scrollProgress.value = (scrollTop / windowHeight) * 100
}

// Scroll to top function (Fallback - tanpa ScrollToPlugin)
function scrollToTop() {
  // Smooth scroll with native behavior
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
  
  
}

onMounted(async () => {
  // Ambil dari localStorage dulu
  const localData = localStorage.getItem('customPageData:Home')
  if (localData) {
    PageManagementData.value = JSON.parse(localData)
  }

  try {
    // Coba fetch terbaru dari API
    const res = await axios.get(`${API_ENDPOINTS.customPages}?isFrontend=true&page=Home`)
    const dataByTag = res.data?.data || {}
    PageManagementData.value = dataByTag
    localStorage.setItem('customPageData:Home', JSON.stringify(dataByTag))
  } catch (err) {
    console.error('Gagal fetch data halaman:', err.response?.data || err.message)
  } finally {
    isReady.value = true

    // Scroll ke target jika ada
    nextTick(() => {
      const target = localStorage.getItem('scrollTarget')
      if (target) {
        const el = document.getElementById(target)
        if (el) {
          const navHeight = 80
          const targetPosition = el.offsetTop - navHeight
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          })
          localStorage.removeItem('scrollTarget')
        } else {
          // Retry sekali lagi jika belum muncul
          setTimeout(() => {
            const retryEl = document.getElementById(target)
            if (retryEl) {
              const navHeight = 80
              const targetPosition = retryEl.offsetTop - navHeight
              window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
              })
              localStorage.removeItem('scrollTarget')
            }
          }, 300)
        }
      }
    })
  }

  // Add scroll event listener
  window.addEventListener('scroll', handleScroll)

  console.log('✅ DATA PageManagementData:', PageManagementData.value)
})

onUnmounted(() => {
  // Remove scroll event listener
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Fade Scale Transition */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-scale-enter-from {
  opacity: 0;
  transform: scale(0.8) translateY(20px);
}

.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.8) translateY(20px);
}
</style>