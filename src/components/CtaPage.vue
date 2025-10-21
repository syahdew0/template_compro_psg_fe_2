<template>
  <section class="relative w-full py-24 lg:py-32 px-4 md:px-8 lg:px-16 text-white overflow-hidden">
    <!-- Background Image with Overlay -->
    <div
      class="absolute inset-0 bg-cover bg-center"
      :style="{ backgroundImage: `url(${getImage(image)})` }"
    ></div>

    <!-- Gradient Overlay -->
    <div class="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/90 to-gray-900/95"></div>

    <!-- Decorative Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-[#FFD43B]/5 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-100/5 rounded-full blur-3xl"></div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center space-y-8">
      <!-- Title -->
      <h2 
        class="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-white leading-tight text-center"
        ref="titleEl"
      >
        {{ title }}
      </h2>

      <!-- Accent Line -->
      <div class="w-20 h-1 bg-gradient-to-r from-[#FFD43B] to-yellow-400 rounded-full"></div>

      <!-- Description (optional) -->
      <p 
        v-if="description"
        class="text-lg md:text-xl font-body text-gray-200 text-center max-w-2xl"
        ref="descriptionEl"
      >
        {{ description }}
      </p>

      <!-- CTA Button - Internal or External Link -->
      <router-link 
        v-if="link && !isExternalLink(link)"
        :to="link"
        class="group relative inline-flex items-center justify-center px-8 py-4 text-base font-accent font-semibold text-black bg-gradient-to-r from-[#FFD43B] to-yellow-400 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD43B]/50 hover:-translate-y-1 transform"
        ref="buttonEl"
      >
        <span class="relative z-10 flex items-center gap-2">
          {{ content }}
          <i class="fa-solid fa-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
        </span>
        <div class="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
      </router-link>

      <!-- External Link Button -->
      <a 
        v-else-if="link && isExternalLink(link)"
        :href="link"
        target="_blank"
        rel="noopener noreferrer"
        class="group relative inline-flex items-center justify-center px-8 py-4 text-base font-accent font-semibold text-black bg-gradient-to-r from-[#FFD43B] to-yellow-400 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD43B]/50 hover:-translate-y-1 transform"
        ref="buttonEl"
      >
        <span class="relative z-10 flex items-center gap-2">
          {{ content }}
          <i class="fa-solid fa-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
        </span>
        <div class="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
      </a>
    </div>

    <!-- Back to Top Button -->
    <transition name="fade">
      <button
        v-show="showButton"
        @click="scrollToTop"
        class="fixed bottom-8 right-8 w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[#FFD43B] to-yellow-400 text-black rounded-full shadow-lg hover:shadow-xl hover:shadow-[#FFD43B]/50 transition-all duration-300 hover:scale-110 z-50 group"
        aria-label="Back to Top"
      >
        <i class="fa-solid fa-arrow-up transform group-hover:-translate-y-1 transition-transform"></i>
      </button>
    </transition>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { API_ENDPOINTS } from '@/config/api'

gsap.registerPlugin(ScrollTrigger)

// Refs
const titleEl = ref(null)
const descriptionEl = ref(null)
const buttonEl = ref(null)

// Data Refs
const title = ref('')
const description = ref('')
const content = ref('')
const image = ref('')
const link = ref('')

// Back to Top
const showButton = ref(false)

// Scroll to top
const scrollToTop = () => {
  gsap.to(window, {
    scrollTo: { y: 0 },
    duration: 0.8,
    ease: 'power2.inOut'
  })
}

// Handle scroll for back-to-top button
const handleScroll = () => {
  showButton.value = window.scrollY > 300
}

// Initialize animations
const initAnimations = () => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: titleEl.value,
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  })

  // Title animation
  tl.fromTo(
    titleEl.value,
    {
      opacity: 0,
      y: 30
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    }
  )

  // Description animation
  if (descriptionEl.value) {
    tl.fromTo(
      descriptionEl.value,
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out'
      },
      0.2
    )
  }

  // Button animation
  if (buttonEl.value) {
    tl.fromTo(
      buttonEl.value,
      {
        opacity: 0,
        scale: 0.8
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.5)'
      },
      0.4
    )
  }
}

// Load data from localStorage
onMounted(() => {
  const raw = localStorage.getItem('customPageData:Home')
  if (!raw) {
    console.warn('Data halaman Home tidak ditemukan')
    return
  }

  try {
    const data = JSON.parse(raw)
    const ctaData = typeof data.cta_section === 'string' 
      ? JSON.parse(data.cta_section) 
      : data.cta_section

    if (ctaData) {
      title.value = ctaData.title || 'Ready to Get Started?'
      description.value = ctaData.description || ''
      content.value = ctaData.content || 'Learn More'
      image.value = ctaData.image || ''
      link.value = ctaData.link || '#'
    }

    setTimeout(() => {
      initAnimations()
    }, 100)
  } catch (err) {
    console.error('Gagal parsing CTA section:', err)
  }

  window.addEventListener('scroll', handleScroll)
})

// Cleanup
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})

// Get image URL
function getImage(src) {
  if (!src) return '/no-image.jpg'
  
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src
  }
  
  const baseURL = API_ENDPOINTS.baseURL || window.APIS_URL || ''
  const cleanSrc = src.startsWith('/') ? src : `/${src}`
  const cleanBaseURL = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL
  
  return `${cleanBaseURL}${cleanSrc}`
}

// Check if link is external
function isExternalLink(url) {
  if (!url) return false
  return url.startsWith('http://') || url.startsWith('https://')
}
</script>

<style scoped>
/* Fade transition for back-to-top button */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Button hover animations */
button {
  -webkit-tap-highlight-color: transparent;
}
</style>