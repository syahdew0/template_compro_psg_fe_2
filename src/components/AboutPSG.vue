<template>
  <section class="relative py-20 lg:py-32 px-4 md:px-8 lg:px-16 bg-white overflow-hidden">
    
    <!-- Animated Background Elements - Yellow Accents -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-[#FFD43B]/5 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-100/10 rounded-full blur-3xl"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto">
      <!-- Header -->
      <div class="flex flex-col items-center text-center mb-16 space-y-4">
        <div 
          v-if="badge"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFD43B]/15 border border-[#FFD43B]/40 backdrop-blur-sm"
          ref="badgeEl"
        >
          <div class="w-2 h-2 rounded-full bg-[#FFD43B]"></div>
          <span class="text-sm font-semibold text-gray-900">{{ badge }}</span>
        </div>

        <h2 
          class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
          ref="titleEl"
        >
          {{ title }}
        </h2>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
        
        <!-- Left Content -->
        <div class="space-y-8 order-2 lg:order-1">
          <!-- Description -->
          <div 
            class="space-y-4 text-gray-800 leading-relaxed"
            ref="contentEl"
          >
            <p class="text-lg">{{ content }}</p>
          </div>

          <!-- Vision Section -->
          <div 
            v-if="visionTitle"
            class="space-y-4 p-6 rounded-2xl border border-[#FFD43B]/30 bg-[#FFD43B]/5 backdrop-blur-sm"
            ref="visionEl"
          >
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl bg-[#FFD43B]/20 flex items-center justify-center flex-shrink-0">
                <i class="fa-solid fa-lightbulb text-[#FFD43B] text-xl"></i>
              </div>
              <div class="space-y-2">
                <h3 class="text-2xl font-bold text-gray-900">{{ visionTitle }}</h3>
                <p class="text-gray-700 leading-relaxed">{{ visionContent }}</p>
              </div>
            </div>
          </div>

          <!-- Features List -->
          <div class="grid grid-cols-2 gap-4">
            <div 
              v-for="(feature, idx) in features"
              :key="idx"
              class="flex items-start gap-3 p-4 rounded-xl bg-white border border-gray-200 hover:border-[#FFD43B]/50 transition-all duration-300 group cursor-pointer"
              ref="featureEls"
            >
              <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FFD43B] to-yellow-400 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <i :class="feature.icon" class="text-black text-sm"></i>
              </div>
              <div>
                <p class="font-semibold text-gray-900 text-sm">{{ feature.label }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Image Section -->
        <div 
          class="relative order-1 lg:order-2"
          ref="imageContainerEl"
        >
          <!-- Main Image Container -->
          <div class="relative w-full aspect-square">
            <!-- Background Shape with Yellow Border -->
            <div class="absolute inset-0 bg-white rounded-3xl border-2 border-[#FFD43B]/20 shadow-lg"></div>
            
            <!-- Decorative Curved Elements -->
            <div class="absolute -top-6 -right-6 w-24 h-24 rounded-3xl border-2 border-[#FFD43B]/40"></div>
            <div class="absolute -bottom-6 -left-6 w-32 h-32 rounded-3xl border-2 border-yellow-200/50"></div>

            <!-- Image -->
            <div 
              class="relative w-full h-full rounded-3xl overflow-hidden group"
              ref="imageEl"
            >
              <img
                v-if="image"
                :src="image"
                alt="About Image"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div v-else class="w-full h-full bg-gradient-to-br from-[#FFD43B]/10 to-yellow-100/10 flex items-center justify-center">
                <i class="fa-solid fa-image text-6xl text-[#FFD43B]/30"></i>
              </div>

              <!-- Overlay on Hover -->
              <div class="absolute inset-0 bg-gradient-to-t from-[#FFD43B]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <!-- Floating Stats Cards -->
            <div 
              class="absolute -bottom-8 -left-8 bg-white rounded-2xl shadow-2xl p-6 border-2 border-[#FFD43B]/30 w-64"
              ref="statsCard1"
            >
              <div class="grid grid-cols-2 gap-6">
                <div class="text-center space-y-2">
                  <div class="text-3xl font-bold text-[#FFD43B]">15+</div>
                  <p class="text-sm text-gray-700">Years Experience</p>
                </div>
                <div class="text-center space-y-2">
                  <div class="text-3xl font-bold text-yellow-500">500+</div>
                  <p class="text-sm text-gray-700">Projects Done</p>
                </div>
              </div>
            </div>

            <!-- Floating Feature Card -->
            <div 
              class="absolute -top-8 -right-8 bg-white rounded-2xl shadow-2xl p-6 border-2 border-[#FFD43B]/30 w-56"
              ref="statsCard2"
            >
              <div class="flex items-center gap-4">
                <div class="w-14 h-14 rounded-full bg-gradient-to-br from-[#FFD43B] to-yellow-400 flex items-center justify-center flex-shrink-0">
                  <i class="fa-solid fa-star text-black text-xl"></i>
                </div>
                <div>
                  <p class="font-bold text-gray-900 text-lg">Certified</p>
                  <p class="text-xs text-gray-600">Industry Leaders</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div class="h-px bg-gradient-to-r from-transparent via-[#FFD43B]/30 to-transparent my-20"></div>

      <!-- Values Section -->
      <div class="space-y-12">
        <div class="text-center space-y-4">
          <h3 class="text-3xl md:text-4xl font-bold text-gray-900">Our Core Values</h3>
          <p class="text-lg text-gray-600">What drives us every single day</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            v-for="(value, idx) in values"
            :key="idx"
            class="group p-8 rounded-2xl bg-white border-2 border-gray-200 hover:border-[#FFD43B]/50 hover:shadow-xl transition-all duration-300"
            ref="valueCards"
          >
            <div class="w-16 h-16 rounded-xl bg-[#FFD43B]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <i :class="value.icon" class="text-2xl text-[#FFD43B]"></i>
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">{{ value.title }}</h4>
            <p class="text-gray-700 leading-relaxed">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, watchEffect, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const props = defineProps({
  pageData: {
    type: Object,
    default: () => ({})
  }
})

// Template Refs
const badgeEl = ref(null)
const titleEl = ref(null)
const contentEl = ref(null)
const visionEl = ref(null)
const imageEl = ref(null)
const imageContainerEl = ref(null)
const statsCard1 = ref(null)
const statsCard2 = ref(null)
const featureEls = ref([])
const valueCards = ref([])

// Data Refs
const badge = ref('')
const title = ref('')
const content = ref('')
const image = ref('')
const visionTitle = ref('')
const visionContent = ref('')

// Static Data
const features = ref([
  { label: 'Innovation', icon: 'fa-solid fa-zap' },
  { label: 'Quality', icon: 'fa-solid fa-check-circle' },
  { label: 'Support', icon: 'fa-solid fa-headset' },
  { label: 'Security', icon: 'fa-solid fa-shield' }
])

const values = ref([
  {
    title: 'Excellence',
    description: 'We strive for excellence in every project, delivering results that exceed expectations.',
    icon: 'fa-solid fa-trophy'
  },
  {
    title: 'Integrity',
    description: 'We believe in honest communication and transparent business practices with all partners.',
    icon: 'fa-solid fa-handshake'
  },
  {
    title: 'Innovation',
    description: 'We embrace new technologies and creative solutions to solve complex business challenges.',
    icon: 'fa-solid fa-lightbulb'
  }
])

// Parse Data
function parse(data) {
  if (!data) return {}
  return typeof data === 'string' ? JSON.parse(data) : data
}

// Watch for Data Changes
watchEffect(() => {
  const allData = props.pageData || {}

  const badgeRaw = allData.badge_about
  const aboutRaw = allData.About_PSG
  const visiRaw = allData.about_visi

  const badgeItems = parse(badgeRaw)
  const aboutItems = parse(aboutRaw)
  const visiItems = parse(visiRaw)

  badge.value = badgeItems?.title || ''
  title.value = aboutItems?.title || ''
  content.value = aboutItems?.content || ''
  image.value = aboutItems?.image || ''
  visionTitle.value = visiItems?.title || ''
  visionContent.value = visiItems?.content || ''
})

// Animations
const animateOnScroll = () => {
  // Stagger animation untuk content
  gsap.fromTo(
    [titleEl.value, contentEl.value],
    {
      opacity: 0,
      y: 30
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: titleEl.value,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    }
  )

  // Image container animation
  if (imageContainerEl.value) {
    gsap.fromTo(
      imageContainerEl.value,
      {
        opacity: 0,
        x: 50,
        scale: 0.95
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1,
        scrollTrigger: {
          trigger: imageContainerEl.value,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    )
  }

  // Floating animation untuk stats cards
  if (statsCard1.value) {
    gsap.to(statsCard1.value, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })
  }

  if (statsCard2.value) {
    gsap.to(statsCard2.value, {
      y: 10,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })
  }

  // Feature cards stagger
  if (featureEls.value.length > 0) {
    gsap.fromTo(
      featureEls.value,
      {
        opacity: 0,
        x: -20
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: featureEls.value[0],
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    )
  }

  // Values cards animation
  if (valueCards.value.length > 0) {
    gsap.fromTo(
      valueCards.value,
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        scrollTrigger: {
          trigger: valueCards.value[0],
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    )
  }
}

// Parallax effect
const parallaxEffect = () => {
  if (imageEl.value) {
    gsap.to(imageEl.value, {
      y: (i, target) => -gsap.getProperty(target, 'offsetHeight') * 0.1,
      scrollTrigger: {
        trigger: imageEl.value,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
        markers: false
      }
    })
  }
}

// Lifecycle
onMounted(() => {
  setTimeout(() => {
    animateOnScroll()
    parallaxEffect()
  }, 100)
})

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-fadeInUp {
  animation: fadeInUp 0.8s ease-out forwards;
}
</style>