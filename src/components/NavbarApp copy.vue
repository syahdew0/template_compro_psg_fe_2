<template>
  <nav 
    class="absolute top-0 left-0 right-0 w-full transition-all duration-500 ease-out z-50"
    :class="[
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-xl' 
        : 'bg-transparent'
    ]"
  >
    <div class="flex items-center justify-between px-4 md:px-10 py-3 md:py-6 lg:py-4 lg:px-16">
      
      <!-- Logo Section with Enhanced Animation -->
      <div 
        class="flex items-center space-x-3 cursor-pointer group relative z-50"
        @click="navigateOrScroll('PageManagement')"
      >
        <!-- Logo Image Container -->
        <div 
          v-if="logoUrl" 
          class="relative overflow-hidden rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
        >
          <img 
            :src="logoUrl" 
            alt="Logo" 
            class="w-12 h-12 md:w-14 md:h-14 object-contain transition-all duration-500 group-hover:brightness-110"
          >
          <!-- Gradient Overlay on Hover -->
          <div class="absolute inset-0 bg-gradient-to-tr from-[#00B1D6]/30 via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
        </div>
        
        <!-- Text Content -->
        <div class="text-left">
          <p 
            class="font-bold text-base md:text-lg transition-all duration-300 group-hover:text-[#00B1D6]"
            :class="isScrolled ? 'text-gray-900' : 'text-[#1E1E1E]'"
          >
            {{ title }}
          </p>
          <p 
            class="font-medium text-xs md:text-sm transition-all duration-300 bg-gradient-to-r from-[#00B1D6] to-cyan-500 bg-clip-text text-transparent"
          >
            {{ siteDescription }}
          </p>
        </div>

        <!-- Animated Underline -->
        <div class="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00B1D6] to-cyan-500 group-hover:w-full transition-all duration-500 rounded-full"></div>
      </div>

      <!-- Desktop Navigation with Modern Styling -->
      <div class="hidden lg:flex items-center space-x-2">
        <button
          v-for="(item, index) in navItems"
          :key="index"
          @click="item.action"
          class="relative px-5 py-2.5 font-semibold text-base transition-all duration-300 group overflow-hidden rounded-xl"
          :class="isScrolled ? 'text-gray-700 hover:text-[#00B1D6]' : 'text-[#1E1E1E] hover:text-[#00B1D6]'"
        >
          <!-- Background Shimmer Effect -->
          <span class="absolute inset-0 bg-gradient-to-r from-transparent via-[#00B1D6]/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></span>
          
          <!-- Text -->
          <span class="relative z-10">{{ item.label }}</span>
          
          <!-- Animated Underline -->
          <span class="absolute bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r from-[#00B1D6] via-cyan-500 to-purple-500 transform -translate-x-1/2 group-hover:w-4/5 transition-all duration-300 rounded-full"></span>
          
          <!-- Glow Effect on Hover -->
          <span class="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg shadow-[#00B1D6]/20"></span>
        </button>
      </div>

      <!-- Mobile Menu Button with Animation -->
      <button 
        class="lg:hidden relative w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-[#00B1D6]/10 hover:to-purple-500/10 focus:outline-none group z-50 ml-auto"
        @click="toggleMenu"
        aria-label="Toggle menu"
      >
        <!-- Animated Hamburger Icon -->
        <div class="w-6 h-5 relative z-[1001] flex flex-col justify-between relative">
          <span 
            class="w-full h-0.5 bg-gradient-to-r from-gray-700 to-[#00B1D6] transform transition-all duration-300 origin-center rounded-full"
            :class="menuOpen ? 'rotate-45 translate-y-2 bg-gradient-to-r from-white to-white' : ''"
          ></span>
          <span 
            class="w-full h-0.5 bg-gradient-to-r from-gray-700 to-[#00B1D6] transition-all duration-300 rounded-full"
            :class="menuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'"
          ></span>
          <span 
            class="w-full h-0.5 bg-gradient-to-r from-gray-700 to-[#00B1D6] transform transition-all duration-300 origin-center rounded-full"
            :class="menuOpen ? '-rotate-45 -translate-y-2 bg-gradient-to-r from-white to-white' : ''"
          ></span>
        </div>

        <!-- Pulse Effect -->
        <span class="absolute inset-0 rounded-xl bg-[#00B1D6]/20 opacity-0 group-hover:opacity-100 animate-ping"></span>
      </button>
    </div>

    <!-- Mobile Menu Overlay -->
    <transition
      enter-active-class="transition-opacity duration-300 ease-out"
      leave-active-class="transition-opacity duration-200 ease-in"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="menuOpen"
        class="fixed inset-0 bg-gradient-to-br from-black/60 via-[#00B1D6]/20 to-black/60 backdrop-blur-md lg:hidden z-[100]"
        @click="closeMenu"
      ></div>
    </transition>

    <!-- Mobile Menu Panel with Modern Design -->
    <transition
      enter-active-class="transition-all duration-500 ease-out"
      leave-active-class="transition-all duration-400 ease-in"
      enter-from-class="translate-x-full opacity-0"
      leave-to-class="translate-x-full opacity-0"
    >
      <div
        v-if="menuOpen"
        class="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-gradient-to-br from-slate-900 via-gray-900 to-[#00B1D6]/20 shadow-2xl lg:hidden overflow-y-auto z-[1000] pointer-events-auto"
      >
        <!-- Animated Background Pattern -->
        <div class="absolute inset-0 opacity-5">
          <div class="absolute inset-0" style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 40px 40px;"></div>
        </div>

        <!-- Gradient Orbs -->
        <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#00B1D6]/30 to-purple-500/30 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-cyan-500/20 to-[#00B1D6]/20 rounded-full blur-3xl"></div>

        <!-- Mobile Menu Header -->
        <div class="relative sticky top-0 bg-slate-900/80 backdrop-blur-xl p-6 border-b border-white/10 flex items-center justify-between z-10">
          <div class="flex items-center space-x-3">
            <img v-if="logoUrl" :src="logoUrl" alt="Logo" class="w-12 h-12 object-contain rounded-lg">
            <div>
              <p class="font-bold text-base text-white">{{ title }}</p>
              <p class="font-medium text-xs bg-gradient-to-r from-[#00B1D6] to-cyan-400 bg-clip-text text-transparent">
                {{ siteDescription }}
              </p>
            </div>
          </div>
          
          <button
            @click="closeMenu"
            class="w-11 h-11 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 group backdrop-blur-sm border border-white/10"
            aria-label="Close menu"
          >
            <i class="fa-solid fa-xmark text-xl text-white group-hover:rotate-90 transition-transform duration-300"></i>
          </button>
        </div>

        <!-- Mobile Menu Items with Stagger Animation -->
        <div class="relative p-6 space-y-3 pb-32">
          <div
            v-for="(item, index) in navItems"
            :key="index"
            class="menu-item"
            :style="{ 
              animationDelay: `${index * 80}ms`,
              animation: menuOpen ? 'slideInRight 0.5s ease-out forwards' : 'none'
            }"
          >
            <button
              @click="handleMobileClick(item)"
              class="w-full text-left px-6 py-4 rounded-2xl font-semibold text-base transition-all duration-300 group relative overflow-hidden bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#00B1D6]/50 backdrop-blur-sm"
            >
              <!-- Gradient Background on Hover -->
              <div class="absolute inset-0 bg-gradient-to-r from-[#00B1D6]/20 via-purple-500/20 to-cyan-500/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-2xl"></div>
              
              <!-- Icon Container -->
              <div class="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#00B1D6]/20 to-purple-500/20 group-hover:scale-110 transition-transform duration-300">
                <i 
                  class="fa-solid text-[#00B1D6] group-hover:text-cyan-300 transition-colors duration-300"
                  :class="item.icon"
                ></i>
              </div>
              
              <!-- Text -->
              <span class="relative z-10 ml-14 text-white group-hover:text-[#00B1D6] transition-colors duration-300">
                {{ item.label }}
              </span>
              
              <!-- Arrow Icon -->
              <i class="fa-solid fa-chevron-right absolute right-6 top-1/2 -translate-y-1/2 text-xs text-white/40 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300"></i>

              <!-- Shine Effect -->
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
            </button>
          </div>
        </div>

        <!-- Mobile Menu Footer -->
        <div class="relative sticky bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-900 via-slate-900/95 to-transparent border-t border-white/10 backdrop-blur-xl">
          <div class="text-center space-y-3">
            <!-- Social Links (Optional) -->
            <div class="flex justify-center space-x-4 mb-4">
              <a href="#" class="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#00B1D6]/30 transition-all duration-300 group">
                <i class="fa-brands fa-facebook text-white/60 group-hover:text-white transition-colors duration-300"></i>
              </a>
              <a href="#" class="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#00B1D6]/30 transition-all duration-300 group">
                <i class="fa-brands fa-instagram text-white/60 group-hover:text-white transition-colors duration-300"></i>
              </a>
              <a href="#" class="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#00B1D6]/30 transition-all duration-300 group">
                <i class="fa-brands fa-linkedin text-white/60 group-hover:text-white transition-colors duration-300"></i>
              </a>
            </div>

            <p class="text-xs text-white/60 font-medium">
              © 2025 {{ title }}
            </p>
            <p class="text-xs text-white/40">
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import { API_ENDPOINTS, API_URL } from '@/config/api'

const props = defineProps({
  settings: Object
})

const router = useRouter()
const route = useRoute()
const menuOpen = ref(false)
const isScrolled = ref(false)

// Logo dari endpoint settingLogo
const logoUrl = ref('')

// Ambil title & description dari props
const title = computed(() => props.settings?.title || '')
const siteDescription = computed(() => props.settings?.site_description || '')

// Navigation Items dengan icon
const navItems = computed(() => [
  { 
    label: 'Beranda', 
    action: () => navigateOrScroll('PageManagement'),
    icon: 'fa-home'
  },
  { 
    label: 'Group', 
    action: () => navigateOrScroll('AnakPerusahaan'),
    icon: 'fa-sitemap'
  },
  { 
    label: 'Careers', 
    action: () => router.push('/careers'),
    icon: 'fa-briefcase'
  },
  { 
    label: 'News', 
    action: () => router.push('/post'),
    icon: 'fa-newspaper'
  },
  { 
    label: 'Hubungi Kami', 
    action: () => navigateOrScroll('contactpage'),
    icon: 'fa-envelope'
  }
])

// Handle Scroll Effect
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const scrollToElement = (id) => {
  nextTick(() => {
    const el = document.getElementById(id)
    if (el) {
      const navHeight = 80
      const targetPosition = el.offsetTop - navHeight
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
    }
  })
}

const navigateOrScroll = (id) => {
  if (route.path !== '/') {
    localStorage.setItem('scrollTarget', id)
    router.push('/')
  } else {
    scrollToElement(id)
  }
}

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
  
  if (menuOpen.value) {
    // Save scroll position and disable scroll
    const scrollY = window.scrollY
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.width = '100%'
    document.body.style.top = `-${scrollY}px`
  } else {
    // Restore scroll position
    const scrollY = document.body.style.top
    document.body.style.overflow = ''
    document.body.style.position = ''
    document.body.style.width = ''
    document.body.style.top = ''
    window.scrollTo(0, parseInt(scrollY || '0') * -1)
  }
}

const closeMenu = () => {
  const scrollY = document.body.style.top
  menuOpen.value = false
  document.body.style.overflow = ''
  document.body.style.position = ''
  document.body.style.width = ''
  document.body.style.top = ''
  window.scrollTo(0, parseInt(scrollY || '0') * -1)
}

const handleMobileClick = (item) => {
  closeMenu()
  setTimeout(() => {
    item.action()
  }, 100)
}

// Fetch logo dari endpoint
const fetchLogo = async () => {
  try {
    const res = await axios.get(API_ENDPOINTS.settingLogoPublic())
    const logoFromAPI = res.data?.logo || res.data?.icon || ''
    if (logoFromAPI) {
      logoUrl.value = logoFromAPI.startsWith('http')
        ? logoFromAPI
        : `${API_URL}${logoFromAPI}`
    }
  } catch (err) {
    console.error('Gagal ambil logo:', err)
    logoUrl.value = props.settings?.logo || ''
  }
}

onMounted(() => {
  fetchLogo()
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
  document.body.style.position = ''
  document.body.style.width = ''
  document.body.style.top = ''
})
</script>

<style scoped>
@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.menu-item {
  opacity: 0;
}

/* Smooth transitions */
button {
  -webkit-tap-highlight-color: transparent;
}

/* Custom scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(0, 177, 214, 0.5);
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 177, 214, 0.7);
}
</style>