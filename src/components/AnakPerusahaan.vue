<template>
  <section ref="sectionRef" class="py-20 px-6 bg-[#1A1A1A] relative overflow-hidden">
    <!-- Decorative elements -->
    <div ref="curveRef" class="absolute top-0 right-0 w-80 h-80 opacity-10">
      <svg viewBox="0 0 200 200" class="w-full h-full">
        <path d="M0,0 Q50,50 0,100 L0,0 Z" fill="#FFD43B"/>
      </svg>
    </div>

    <div ref="dotsRef" class="absolute bottom-10 left-10 w-32 h-32 opacity-10">
      <div class="grid grid-cols-4 gap-3">
        <div v-for="i in 16" :key="i" class="dot w-2 h-2 rounded-full bg-[#FFD43B]"></div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Header Section -->
      <div ref="headerRef" class="text-start mb-12 opacity-0">
        <p class="text-[#FFD43B] text-sm font-bold mb-2 tracking-wider uppercase">{{ badge }}</p>
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-4 font-heading">{{ title }}</h2>
        <div class="w-24 h-1 bg-[#FFD43B] mb-4"></div>
        <p class="text-gray-400 text-lg max-w-3xl">{{ content }}</p>
      </div>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- List Perusahaan -->
        <div ref="companyListRef" class="w-full lg:w-1/2 opacity-0">
          <div class="bg-gradient-to-br from-[#2A2A2A] to-[#1F1F1F] rounded-2xl shadow-2xl border border-[#FFD43B]/20 overflow-hidden">
            <div
              v-for="(perusahaan, index) in perusahaanList"
              :key="index"
              @click="selectCompany(index)"
              :class="[
                'company-item cursor-pointer p-6 flex justify-between items-center transition-all duration-300 border-b border-[#333]',
                selectedIndex === index 
                  ? 'bg-gradient-to-r from-[#FFD43B]/20 to-transparent border-l-4 border-[#FFD43B]' 
                  : 'hover:bg-[#252525] border-l-4 border-transparent hover:border-[#FFD43B]/50'
              ]"
            >
              <div class="flex gap-4 items-center">
                <div class="w-14 h-14 rounded-xl bg-[#1A1A1A] p-2 flex items-center justify-center border border-[#FFD43B]/30">
                  <img :src="getImage(perusahaan.image)" class="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 class="font-bold text-white text-lg mb-1">{{ perusahaan.title }}</h3>
                  <p class="text-sm text-gray-400">{{ perusahaan.content }}</p>
                </div>
              </div>
              <svg 
                class="w-6 h-6 transition-transform duration-300"
                :class="selectedIndex === index ? 'text-[#FFD43B] rotate-90' : 'text-gray-600'"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Produk Section -->
        <div ref="productSectionRef" class="w-full lg:w-1/2 opacity-0">
          <div class="bg-gradient-to-br from-[#2A2A2A] to-[#1F1F1F] rounded-2xl shadow-2xl p-8 border-t-4 border-[#FFD43B] min-h-[400px]">
            <h3 class="text-2xl font-bold text-white mb-6 font-heading">
              Produk {{ perusahaanList[selectedIndex]?.title }}
            </h3>

            <div v-if="produkList.length" class="space-y-4">
              <div
                v-for="(produk, index) in produkList"
                :key="index"
                ref="productItemsRef"
                class="product-item flex items-center gap-4 p-4 bg-[#1A1A1A]/50 rounded-xl border border-[#FFD43B]/20 hover:border-[#FFD43B] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#FFD43B]/20"
              >
                <div class="w-16 h-16 rounded-lg bg-[#2A2A2A] p-2 flex items-center justify-center border border-[#FFD43B]/30">
                  <img :src="getImage(produk.image)" class="w-full h-full object-contain" />
                </div>
                <div class="flex justify-between items-center w-full">
                  <p class="font-bold text-white text-lg">{{ produk.title }}</p>
                  <a
                    :href="produk.link"
                    class="text-[#FFD43B] hover:text-[#FFE066] transition-colors duration-300 transform hover:scale-110"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M14 3h7v7m0-7L10 14m-4 0h-.01M6 18h.01M6 6h.01" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div v-else class="flex flex-col items-center justify-center py-16">
              <svg class="w-24 h-24 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p class="text-gray-500 text-center">Belum ada produk tersedia</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted, nextTick } from 'vue'
import { API_ENDPOINTS } from '@/config/api'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Refs
const sectionRef = ref(null)
const headerRef = ref(null)
const companyListRef = ref(null)
const productSectionRef = ref(null)
const productItemsRef = ref([])
const curveRef = ref(null)
const dotsRef = ref(null)

// Data
const badge = ref('')
const title = ref('')
const content = ref('')
const perusahaanList = ref([])
const produkList = ref([])
const selectedIndex = ref(0)

let ctx

function getImage(src) {
  if (!src) return '/no-image.jpg'
  return src.startsWith('http') ? src : `${API_ENDPOINTS.baseURL}${src}`
}

function parse(data) {
  if (!data) return []

  let raw = typeof data === 'string' ? JSON.parse(data) : data

  if (Array.isArray(raw)) {
    return raw.map(item => {
      if (typeof item === 'string') {
        try {
          return JSON.parse(item)
        } catch {
          return null
        }
      }
      return item
    }).filter(Boolean)
  }

  return Array.isArray(raw) ? raw : [raw]
}

async function fetchData() {
  try {
    const raw = localStorage.getItem('customPageData:Home')
    if (!raw) return console.warn('Data customPage:Home tidak ditemukan di localStorage')

    const data = JSON.parse(raw)

    badge.value = parse(data.anak_perusahaan_badge)?.badge || 'Anak Perusahaan Kami'

    const titleData = typeof data.anak_perusahaan_title === 'string'
      ? JSON.parse(data.anak_perusahaan_title)
      : data.anak_perusahaan_title || {}

    title.value = titleData.title || ''
    content.value = titleData.content || ''

    perusahaanList.value = parse(data.anak_perusahaan)

    updateProdukList(data)
  } catch (error) {
    console.error('Gagal memuat data anak perusahaan:', error)
  }
}

function updateProdukList(dataCache = null) {
  const raw = dataCache || JSON.parse(localStorage.getItem('customPageData:Home'))
  const tagName = `anak_perusahaan_product_${selectedIndex.value + 1}`
  produkList.value = parse(raw[tagName]) || []
}

function selectCompany(index) {
  selectedIndex.value = index
  
  // Animate product section change
  gsap.to(productSectionRef.value, {
    opacity: 0,
    x: 20,
    duration: 0.2,
    onComplete: () => {
      nextTick(() => {
        gsap.to(productSectionRef.value, {
          opacity: 1,
          x: 0,
          duration: 0.4,
          ease: 'power2.out'
        })
        
        // Animate product items
        if (produkList.value.length > 0) {
          gsap.fromTo('.product-item',
            { opacity: 0, x: -20 },
            { 
              opacity: 1, 
              x: 0, 
              duration: 0.4,
              stagger: 0.1,
              ease: 'power2.out'
            }
          )
        }
      })
    }
  })
}

function initAnimations() {
  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none none'
      }
    })

    // 1. Header animation
    tl.to(headerRef.value, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    })

    // 2. Company list animation
    .to(companyListRef.value, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.4')

    // 3. Company items stagger
    .to(companyListRef.value.querySelectorAll('.company-item'), {
      opacity: 1,
      x: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out'
    }, '-=0.6')

    // 4. Product section
    .to(productSectionRef.value, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6')

    // 5. Product items
    .to('.product-item', {
      opacity: 1,
      x: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out'
    }, '-=0.4')

    // 6. Decorative elements
    .to(curveRef.value, {
      rotation: -15,
      duration: 2,
      ease: 'power1.inOut'
    }, '-=1.5')

    .to(dotsRef.value.querySelectorAll('.dot'), {
      scale: [0, 1.2, 1],
      opacity: [0, 1],
      duration: 0.4,
      stagger: 0.05,
      ease: 'back.out(1.7)'
    }, '-=1.5')

    // Continuous animations
    gsap.to(curveRef.value, {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })

    gsap.to(dotsRef.value.querySelectorAll('.dot'), {
      scale: 1.3,
      opacity: 0.3,
      duration: 2,
      repeat: -1,
      yoyo: true,
      stagger: {
        each: 0.1,
        from: 'random'
      },
      ease: 'sine.inOut'
    })

  }, sectionRef.value)
}

watch(selectedIndex, () => {
  const raw = localStorage.getItem('customPageData:Home')
  if (raw) {
    const data = JSON.parse(raw)
    updateProdukList(data)
  }
})

onMounted(async () => {
  await fetchData()
  nextTick(() => {
    initAnimations()
  })
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<style scoped>
/* Initial states */
.company-item {
  opacity: 0;
  transform: translateX(-20px);
}

.product-item {
  opacity: 0;
  transform: translateX(-20px);
}

/* Smooth transitions */
.company-item,
.product-item {
  transition: all 0.3s ease;
}
</style>