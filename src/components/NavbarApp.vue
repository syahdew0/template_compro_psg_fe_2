<template>
  <nav 
    class="fixed top-0 left-0 right-0 w-full transition-all duration-500 ease-out z-50"
    :class="[
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-xl' 
        : 'bg-white'
    ]"
  >
    <div class="flex items-center justify-between px-4 md:px-8 lg:px-16 py-4 lg:py-5">
      
      <!-- Logo Section -->
      <div 
        class="flex items-center gap-3 cursor-pointer group flex-shrink-0"
        @click="navigateOrScroll('PageManagement')"
      >
        <!-- Logo Image -->
        <div 
          v-if="logoUrl"
          class="relative overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-110"
        >
          <img 
            :src="logoUrl" 
            alt="Logo" 
            class="w-10 h-10 md:w-12 md:h-12 object-contain"
          >
          <div class="absolute inset-0 bg-gradient-to-tr from-[#FFD43B]/20 via-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
        </div>
        
        <!-- Text Content -->
        <div class="text-left hidden sm:block">
          <p class="font-bold text-sm md:text-base text-gray-900 transition-colors duration-300 group-hover:text-[#FFD43B]">
            {{ title }}
          </p>
          <p class="font-medium text-xs bg-gradient-to-r from-[#FFD43B] to-yellow-500 bg-clip-text text-transparent">
            {{ siteDescription }}
          </p>
        </div>
      </div>

      <!-- Desktop Navigation -->
      <div class="hidden lg:flex items-center gap-1">
        <button
          v-for="(item, index) in navItems"
          :key="index"
          @click="item.action"
          class="relative px-6 py-2.5 font-semibold text-sm transition-all duration-300 group overflow-hidden rounded-xl"
          :class="[
            item.label === 'Beranda'
              ? 'text-black bg-gradient-to-r from-[#FFD43B] to-yellow-400 hover:shadow-lg hover:shadow-[#FFD43B]/50'
              : 'text-gray-800 hover:text-[#FFD43B]'
          ]"
        >
          <span class="relative z-10 flex items-center gap-2">
            <i :class="item.icon" class="text-base"></i>
            {{ item.label }}
          </span>
          
          <span 
            v-if="item.label !== 'Beranda'"
            class="absolute bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r from-[#FFD43B] to-yellow-400 transform -translate-x-1/2 group-hover:w-3/4 transition-all duration-300 rounded-full"
          ></span>
          
          <span 
            v-if="item.label !== 'Beranda'"
            class="absolute inset-0 bg-gradient-to-r from-[#FFD43B]/5 via-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
          ></span>
        </button>
      </div>

      <!-- Mobile Menu Button -->
      <button 
        class="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300 group z-50 ml-auto"
        :class="isScrolled ? 'hover:bg-gray-100' : 'hover:bg-yellow-50'"
        @click="toggleMenu"
        aria-label="Toggle menu"
      >
        <div class="w-6 h-5 flex flex-col justify-between relative">
          <span 
            class="w-full h-0.5 bg-gray-800 transform transition-all duration-300 origin-center rounded-full"
            :class="menuOpen ? 'rotate-45 translate-y-2' : ''"
          ></span>
          <span 
            class="w-full h-0.5 bg-gray-800 transition-all duration-300 rounded-full"
            :class="menuOpen ? 'opacity-0' : 'opacity-100'"
          ></span>
          <span 
            class="w-full h-0.5 bg-gray-800 transform transition-all duration-300 origin-center rounded-full"
            :class="menuOpen ? '-rotate-45 -translate-y-2' : ''"
          ></span>
        </div>
      </button>
    </div>

   <!-- Mobile Menu (Overlay + Panel) dipindahkan ke BODY -->
<teleport to="body">
  <!-- Mobile Menu Overlay -->
  <transition
    enter-active-class="transition-opacity duration-300"
    leave-active-class="transition-opacity duration-200"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <div
      v-if="menuOpen"
      class="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998] lg:hidden"
      @click="closeMenu"
    ></div>
  </transition>

  <!-- Mobile Menu Panel -->
  <transition
    enter-active-class="transition-transform duration-400 ease-out"
    leave-active-class="transition-transform duration-300 ease-in"
    enter-from-class="translate-x-full"
    leave-to-class="translate-x-full"
  >
    <div
      v-if="menuOpen"
      class="fixed top-0 right-0 bottom-0 w-72 max-w-[90vw] bg-white shadow-2xl z-[9999] lg:hidden overflow-y-auto"
      role="dialog" aria-modal="true"
    >
      <!-- Menu Header -->
      <div class="sticky top-0 bg-white/90 backdrop-blur-xl p-6 border-b border-gray-200 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <img v-if="logoUrl" :src="logoUrl" alt="Logo" class="w-10 h-10 object-contain rounded-lg">
          <div>
            <p class="font-bold text-sm text-gray-900">{{ title }}</p>
            <p class="text-xs bg-gradient-to-r from-[#FFD43B] to-yellow-400 bg-clip-text text-transparent">{{ siteDescription }}</p>
          </div>
        </div>

        <button
          @click="closeMenu"
          class="w-10 h-10 flex items-center justify-center rounded-lg bg-yellow-50 hover:bg-[#FFD43B]/20 transition-all"
          aria-label="Close menu"
        >
          <i class="fa-solid fa-xmark text-lg text-gray-900"></i>
        </button>
      </div>

      <!-- Menu Items -->
      <div class="p-6 space-y-3">
        <button
          v-for="(item, index) in navItems"
          :key="index"
          @click="handleMobileClick(item)"
          class="w-full text-left px-5 py-4 rounded-xl font-semibold text-sm transition-all duration-300 group relative overflow-hidden"
          :class="[
            item.label === 'Beranda'
              ? 'bg-gradient-to-r from-[#FFD43B] to-yellow-400 text-black border border-yellow-400'
              : 'bg-white text-gray-900 hover:bg-yellow-50 border border-gray-200 hover:border-[#FFD43B]/50 hover:text-[#FFD43B]'
          ]"
          :style="{ 
            transitionDelay: menuOpen ? `${index * 50}ms` : '0ms',
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? 'translateX(0)' : 'translateX(20px)'
          }"
        >
          <div class="flex items-center justify-between">
            <span class="flex items-center gap-3">
              <i :class="item.icon" class="text-base w-5 flex items-center justify-center"></i>
              {{ item.label }}
            </span>
            <i class="fa-solid fa-chevron-right text-xs opacity-60 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all"></i>
          </div>

          <div 
            v-if="item.label !== 'Beranda'"
            class="absolute inset-0 bg-gradient-to-r from-[#FFD43B]/10 via-yellow-500/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-xl"
          ></div>
        </button>
      </div>

      <!-- Menu Footer -->
      <div class="sticky bottom-0 p-6 bg-gradient-to-t from-white to-transparent border-t border-gray-200 backdrop-blur-xl">
        <div class="space-y-3">
          <div class="flex justify-center gap-4">
            <a href="#" class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#FFD43B]/30 transition-all">
              <i class="fa-brands fa-facebook text-sm text-gray-900"></i>
            </a>
            <a href="#" class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#FFD43B]/30 transition-all">
              <i class="fa-brands fa-instagram text-sm text-gray-900"></i>
            </a>
            <a href="#" class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#FFD43B]/30 transition-all">
              <i class="fa-brands fa-linkedin text-sm text-gray-900"></i>
            </a>
          </div>
          <p class="text-center text-xs text-gray-600">© 2025 {{ title }}</p>
        </div>
      </div>
    </div>
  </transition>
</teleport>

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
const logoUrl = ref('')

const title = computed(() => props.settings?.title || '')
const siteDescription = computed(() => props.settings?.site_description || '')

const navItems = computed(() => [
  { label: 'Beranda', action: () => navigateOrScroll('PageManagement'), icon: 'fa-solid fa-home' },
  { label: 'Group', action: () => navigateOrScroll('AnakPerusahaan'), icon: 'fa-solid fa-sitemap' },
  { label: 'Careers', action: () => router.push('/careers'), icon: 'fa-solid fa-briefcase' },
  { label: 'News', action: () => router.push('/post'), icon: 'fa-solid fa-newspaper' },
  { label: 'Hubungi Kami', action: () => navigateOrScroll('contactpage'), icon: 'fa-solid fa-envelope' }
])

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const scrollToElement = (id) => {
  nextTick(() => {
    const el = document.getElementById(id)
    if (el) {
      const navHeight = 80
      const targetPosition = el.offsetTop - navHeight
      window.scrollTo({ top: targetPosition, behavior: 'smooth' })
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
  const scrollY = window.scrollY
  document.body.style.overflow = menuOpen.value ? 'hidden' : ''
  document.body.dataset.scrollY = scrollY
}

const closeMenu = () => {
  menuOpen.value = false
  document.body.style.overflow = ''
}

const handleMobileClick = (item) => {
  closeMenu()
  setTimeout(() => item.action(), 150)
}

const fetchLogo = async () => {
  try {
    // Pakai endpoint yang benar. Kalau memang public, biarkan.
    const res = await axios.get(API_ENDPOINTS.settingLogo);


    const raw = res?.data || {};
    // Ambil dari beberapa kemungkinan field (paling umum di proyekmu)
    const candidate =
      raw.logo ||
      raw.icon ||
      raw.value ||                 // ← penting: versi lama pakai "value"
      raw?.data?.logo ||
      raw?.data?.icon ||
      raw?.data?.value ||
      '';

    const joinUrl = (base, path) =>
      base.replace(/\/+$/, '') + '/' + String(path).replace(/^\/+/, '');

    if (candidate) {
      logoUrl.value = String(candidate).startsWith('http')
        ? candidate
        : joinUrl(API_URL, candidate);
    } else {
      // fallback terakhir: dari props settings bila ada
      const fallback = props.settings?.logo || props.settings?.icon || '';
      logoUrl.value = fallback ? (String(fallback).startsWith('http') ? fallback : joinUrl(API_URL, fallback)) : '';
    }
  } catch (err) {
    console.error('Logo fetch error:', err);
    const fallback = props.settings?.logo || props.settings?.icon || '';
    if (fallback) {
      const joinUrl = (base, path) =>
        base.replace(/\/+$/, '') + '/' + String(path).replace(/^\/+/, '');
      logoUrl.value = String(fallback).startsWith('http') ? fallback : joinUrl(API_URL, fallback);
    } else {
      logoUrl.value = '';
    }
  }
};

onMounted(() => {
  fetchLogo()
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
})
</script>

<style scoped>
button {
  -webkit-tap-highlight-color: transparent;
}

html {
  scroll-behavior: smooth;
}
</style>