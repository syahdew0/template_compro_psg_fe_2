<template>
  <section class="relative bg-white overflow-hidden">
    <!-- Subtle Background Pattern -->
    <div class="absolute inset-0 opacity-[0.02]">
      <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, rgb(0 0 0) 1px, transparent 0); background-size: 40px 40px;"></div>
    </div>

    <!-- Floating Elements Background - Yellow Accents -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div ref="blob1" class="absolute top-20 right-[10%] w-96 h-96 bg-gradient-to-br from-[#FFD43B]/8 to-yellow-400/8 rounded-full blur-3xl"></div>
      <div ref="blob2" class="absolute bottom-40 left-[5%] w-[500px] h-[500px] bg-gradient-to-br from-yellow-300/8 to-yellow-200/8 rounded-full blur-3xl"></div>
      <div ref="blob3" class="absolute top-1/2 left-1/3 w-80 h-80 bg-gradient-to-br from-yellow-100/6 to-yellow-50/6 rounded-full blur-3xl"></div>
    </div>

    <!-- Main Hero Content - Two Column Layout -->
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        <!-- Left Column - Content -->
        <div class="order-2 lg:order-1">
          <!-- Badge -->
          <div ref="badge" class="mb-6 opacity-0">
            <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-[#FFD43B]/15 text-gray-900 border border-[#FFD43B]/40 shadow-sm">
              <span class="w-2 h-2 bg-[#FFD43B] rounded-full animate-pulse"></span>
              {{ hero.badge || 'Welcome to Our Company' }}
            </span>
          </div>

          <!-- Title -->
          <div ref="titleSection" class="mb-6 opacity-0">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-gray-900 leading-tight tracking-tight mb-4">
              {{ hero.title }}
            </h1>
            <h2 class="text-2xl md:text-3xl lg:text-4xl font-heading font-bold leading-tight">
              <span ref="gradientText" class="bg-gradient-to-r from-[#FFD43B] via-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                {{ hero.subtitle }}
              </span>
            </h2>
          </div>

          <!-- Description -->
          <p 
            ref="description"
            class="text-lg font-body text-gray-700 leading-relaxed mb-8 opacity-0"
            v-html="hero.content"
          ></p>

          <!-- CTA Buttons -->
          <div ref="ctaButtons" class="flex flex-col sm:flex-row gap-4 mb-12 opacity-0">
            <!-- Primary Button - Yellow -->
            <component
              v-if="hero.slider_primary_button?.link"
              :is="isExternal(hero.slider_primary_button.link) ? 'a' : 'router-link'"
              :href="isExternal(hero.slider_primary_button.link) ? hero.slider_primary_button.link : null"
              :to="!isExternal(hero.slider_primary_button.link) ? hero.slider_primary_button.link : null"
              :target="isExternal(hero.slider_primary_button.link) ? '_blank' : null"
              rel="noopener noreferrer"
              class="group relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-black bg-gradient-to-r from-[#FFD43B] to-yellow-400 rounded-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#FFD43B]/30 hover:-translate-y-1"
            >
              <span class="relative z-10 flex items-center gap-2">
                {{ hero.slider_primary_button.text || 'Get Started' }}
                <svg class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </span>
              <div class="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
            </component>

            <!-- Secondary Button - Yellow Outline -->
            <component
              v-if="hero.slider_secondary_button?.link"
              :is="isExternal(hero.slider_secondary_button.link) ? 'a' : 'router-link'"
              :href="isExternal(hero.slider_secondary_button.link) ? hero.slider_secondary_button.link : null"
              :to="!isExternal(hero.slider_secondary_button.link) ? hero.slider_secondary_button.link : null"
              :target="isExternal(hero.slider_secondary_button.link) ? '_blank' : null"
              rel="noopener noreferrer"
              class="group inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-gray-900 bg-white border-2 border-gray-300 rounded-lg hover:border-[#FFD43B] hover:text-[#FFD43B] hover:bg-[#FFD43B]/5 hover:-translate-y-1 transition-all duration-300 shadow-sm"
            >
              <span class="flex items-center gap-2">
                {{ hero.slider_secondary_button.text || 'Learn More' }}
                <svg class="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </span>
            </component>
          </div>

          <!-- Mini Stats -->
          <div ref="statsCards" class="grid grid-cols-3 gap-8 opacity-0">
            <div 
              v-for="(stat, idx) in miniStats" 
              :key="idx"
              class="stat-card group cursor-default"
              :data-index="idx"
            >
              <div class="text-3xl md:text-4xl font-bold mb-1 transition-all duration-300">
                <span :class="[
                  'text-transparent bg-gradient-to-br',
                  idx === 0 ? 'from-[#FFD43B] to-yellow-500' : '',
                  idx === 1 ? 'from-[#FFD43B] to-yellow-400' : '',
                  idx === 2 ? 'from-yellow-400 to-yellow-600' : '',
                  'bg-clip-text'
                ]">
                  {{ stat.value }}
                </span>
              </div>
              <div class="text-sm text-gray-600 font-medium">{{ stat.label }}</div>
            </div>
          </div>
        </div>

        <!-- Right Column - Image -->
        <div 
          v-if="hero.images?.length"
          ref="imageSection"
          class="order-1 lg:order-2 opacity-0"
        >
          <div class="relative">
            <!-- Main Image with Yellow Border -->
            <div class="relative rounded-2xl overflow-hidden shadow-2xl group border-2 border-[#FFD43B]/20 hover:border-[#FFD43B]/50 transition-all duration-300">
              <img
                :src="getImage(hero.images[0])"
                class="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                :alt="'Company showcase'"
                @error="handleImageError"
              />
              
              <!-- Overlay on hover - Yellow Tint -->
              <div class="absolute inset-0 bg-gradient-to-t from-[#FFD43B]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            <!-- Decorative Elements - Yellow Theme -->
            <div class="absolute -bottom-4 -right-4 w-72 h-72 bg-gradient-to-br from-[#FFD43B]/20 via-yellow-400/20 to-yellow-200/20 rounded-full blur-3xl -z-10"></div>
            <div class="absolute -top-4 -left-4 w-64 h-64 bg-gradient-to-br from-yellow-200/15 via-yellow-100/15 to-yellow-50/15 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>

      </div>
    </div>

    <!-- Stats Section - Dark with Yellow Accents -->
    <div v-if="hero.stats?.length" class="relative bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
      <!-- Background Image with Overlay -->
      <div class="absolute inset-0">
        <div
          v-if="hero.stats_bg"
          class="absolute inset-0 bg-cover bg-center opacity-10"
          :style="{ backgroundImage: `url(${getImage(hero.stats_bg)})` }"
        ></div>
        <div class="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-slate-900/95 to-gray-800/90"></div>
      </div>

      <!-- Animated Background Elements - Yellow -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div ref="statsBlob1" class="absolute top-0 left-1/4 w-96 h-96 bg-[#FFD43B]/10 rounded-full blur-3xl"></div>
        <div ref="statsBlob2" class="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>
      </div>

      <!-- Stats Grid -->
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div ref="statsGrid" class="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 opacity-0">
          <div
            v-for="(stat, index) in hero.stats"
            :key="index"
            class="stats-item text-center group cursor-pointer"
            :data-index="index"
          >
            <!-- Icon - Yellow Theme -->
            <div :class="[
              'inline-flex items-center justify-center w-16 h-16 mb-4 rounded-2xl backdrop-blur-sm text-3xl transition-all duration-500 group-hover:scale-110 bg-[#FFD43B]/20 group-hover:bg-[#FFD43B]/30'
            ]">
              {{ getStatIcon(index) }}
            </div>

            <!-- Counter -->
            <div class="mb-2">
              <span class="text-4xl md:text-5xl font-bold text-white transition-all duration-500 group-hover:text-[#FFD43B]">
                <span v-if="isStatsVisible">
                  <component :is="AnimatedCounter" :value="parseStatValue(stat.content)" :duration="2000" />
                </span>
                <span v-else>0</span>
                {{ getStatSuffix(stat.content) }}
              </span>
            </div>

            <!-- Label -->
            <div class="text-base md:text-lg font-medium text-gray-300 transition-colors duration-300 group-hover:text-[#FFD43B]">
              {{ stat.title || '-' }}
            </div>

            <!-- Hover Line - Yellow -->
            <div class="mt-4 mx-auto w-0 h-0.5 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-transparent via-[#FFD43B] to-transparent"></div>
          </div>
        </div>
      </div>

      <!-- Bottom Decoration -->
      <div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD43B]/30 to-transparent"></div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, watch, watchEffect } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { API_ENDPOINTS } from '@/config/api'

gsap.registerPlugin(ScrollTrigger)

const props = defineProps({
  pageData: {
    type: Object,
    default: () => ({})
  }
})

// Refs untuk GSAP animations
const badge = ref(null)
const titleSection = ref(null)
const gradientText = ref(null)
const description = ref(null)
const ctaButtons = ref(null)
const statsCards = ref(null)
const imageSection = ref(null)
const statsGrid = ref(null)
const blob1 = ref(null)
const blob2 = ref(null)
const blob3 = ref(null)
const statsBlob1 = ref(null)
const statsBlob2 = ref(null)

const hero = ref({
  title: '',
  subtitle: '',
  badge: '',
  content: '',
  icon: '',
  link: '',
  images: [],
  stats_bg: '',
  stats: [],
  slider_primary_button: { text: '', link: '' },
  slider_secondary_button: { text: '', link: '' }
})

const miniStats = ref([
  { value: '25K+', label: 'Happy Customers' },
  { value: '10+', label: 'Years Experience' },
  { value: '98%', label: 'Success Rate' }
])

const isStatsVisible = ref(false)

// Handle image loading error
const handleImageError = (e) => {
  console.error('Image failed to load:', e.target.src)
  e.target.src = '/no-image.jpg'
}

// GSAP Animations
onMounted(() => {
  // Timeline untuk hero section
  const heroTl = gsap.timeline({
    defaults: { ease: 'power3.out' }
  })

  // Badge animation
  heroTl.to(badge.value, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    delay: 0.3
  })

  // Title animation
  heroTl.to(titleSection.value, {
    opacity: 1,
    y: 0,
    duration: 0.8
  }, '-=0.5')

  // Description animation
  heroTl.to(description.value, {
    opacity: 1,
    y: 0,
    duration: 0.8
  }, '-=0.5')

  // CTA Buttons animation
  heroTl.to(ctaButtons.value, {
    opacity: 1,
    y: 0,
    duration: 0.8
  }, '-=0.5')

  // Stats cards animation
  heroTl.to(statsCards.value, {
    opacity: 1,
    duration: 0.6
  }, '-=0.4')

  gsap.from('.stat-card', {
    scrollTrigger: {
      trigger: statsCards.value,
      start: 'top 80%'
    },
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.15,
    ease: 'back.out(1.5)'
  })

  // Image section animation
  if (imageSection.value) {
    gsap.to(imageSection.value, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.5
    })
  }

  // Stats grid animation
  if (statsGrid.value) {
    gsap.from(statsGrid.value, {
      scrollTrigger: {
        trigger: statsGrid.value,
        start: 'top 80%',
        onEnter: () => {
          isStatsVisible.value = true
        }
      },
      opacity: 0,
      y: 50,
      duration: 0.8
    })

    gsap.from('.stats-item', {
      scrollTrigger: {
        trigger: statsGrid.value,
        start: 'top 80%'
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'back.out(1.5)'
    })
  }

  // Floating blobs animation
  if (blob1.value) {
    gsap.to(blob1.value, {
      x: 30,
      y: -50,
      scale: 1.1,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })
  }

  if (blob2.value) {
    gsap.to(blob2.value, {
      x: -20,
      y: 30,
      scale: 0.9,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })
  }

  if (blob3.value) {
    gsap.to(blob3.value, {
      x: -30,
      y: 40,
      scale: 1.05,
      duration: 7,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })
  }

  // Stats section blobs
  if (statsBlob1.value) {
    gsap.to(statsBlob1.value, {
      x: 50,
      y: 50,
      scale: 1.2,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })
  }

  if (statsBlob2.value) {
    gsap.to(statsBlob2.value, {
      x: -50,
      y: -50,
      scale: 1.15,
      duration: 7,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })
  }
})

// Helper functions
function parse(data) {
  if (!data) return {}
  return typeof data === 'string' ? JSON.parse(data) : data
}

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

function getItemByTag(tag, allData) {
  const section = allData[tag]
  if (!section) return null
  const parseItem = (item) => {
    const parsed = parse(item)
    if (parsed.items) {
      return parse(parsed.items)
    }
    return parsed
  }
  return Array.isArray(section) ? section.map(parseItem) : [parseItem(section)]
}

function isExternal(link) {
  return /^https?:\/\//.test(link)
}

function parseStatValue(content) {
  if (!content) return 0
  const match = content.toString().match(/\d+/)
  return match ? parseInt(match[0]) : 0
}

function getStatSuffix(content) {
  if (!content) return ''
  const str = content.toString()
  if (str.includes('k') || str.includes('K')) return 'K+'
  if (str.includes('+')) return '+'
  if (str.includes('%')) return '%'
  return ''
}

function getStatIcon(index) {
  const icons = ['✓', '★', '♦', '◆']
  return icons[index % icons.length]
}

// Animated Counter Component
const AnimatedCounter = {
  props: {
    value: { type: Number, required: true },
    duration: { type: Number, default: 2000 }
  },
  template: '<span>{{ count }}</span>',
  setup(props) {
    const count = ref(0)

    watch(
      () => props.value,
      (newValue) => {
        if (newValue === 0) {
          count.value = 0
          return
        }

        gsap.to(count, {
          value: newValue,
          duration: props.duration / 1000,
          ease: 'power2.out',
          onUpdate: () => {
            count.value = Math.floor(count.value)
          }
        })
      },
      { immediate: true }
    )

    return { count }
  }
}

// Load data
watchEffect(() => {
  const allData = props.pageData || {}
  const sliderSection = parse(allData.slider_home)
  const statsItems = getItemByTag('stats', allData) || []
  const statsBgItem = getItemByTag('stats_bg', allData)?.[0] || {}
  const primaryButtonItem = getItemByTag('slider_primary_button', allData)?.[0] || {}
  const secondaryButtonItem = getItemByTag('slider_secondary_button', allData)?.[0] || {}

  hero.value = {
    title: sliderSection.title || 'Welcome to Our Company',
    subtitle: sliderSection.subtitle || 'Building the Future',
    badge: sliderSection.badge || 'We Grow with Passion',
    content: sliderSection.content || 'Transform your business with our innovative solutions and expert team.',
    icon: sliderSection.icon || '',
    link: sliderSection.link || '',
    images: sliderSection.images || (sliderSection.image ? [sliderSection.image] : []),
    stats_bg: statsBgItem.image || '',
    stats: statsItems.map(item => ({
      title: item.title || '',
      content: item.content || ''
    })),
    slider_primary_button: {
      text: primaryButtonItem.title || 'Get Started',
      link: primaryButtonItem.link || '#'
    },
    slider_secondary_button: {
      text: secondaryButtonItem.title || 'Learn More',
      link: secondaryButtonItem.link || '#'
    }
  }

  console.log('Hero images:', hero.value.images)
  console.log('Stats bg:', hero.value.stats_bg)
})
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}
</style>