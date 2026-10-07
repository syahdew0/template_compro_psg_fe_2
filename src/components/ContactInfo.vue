<template>
  <section ref="sectionRef" class="py-20 px-6 lg:px-20 bg-[#1A1A1A] relative overflow-hidden">
    <!-- Decorative elements -->
    <div ref="curveRef" class="absolute bottom-0 left-0 w-96 h-96 opacity-10 rotate-90">
      <svg viewBox="0 0 200 200" class="w-full h-full">
        <path d="M200,200 Q150,150 200,100 L200,200 Z" fill="#FFD43B"/>
      </svg>
    </div>

    <div ref="dotsRef" class="absolute top-20 right-10 w-32 h-32 opacity-10">
      <div class="grid grid-cols-4 gap-3">
        <div v-for="i in 16" :key="i" class="dot w-2 h-2 rounded-full bg-[#FFD43B]"></div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <!-- Image Section -->
        <div ref="imageRef" class="relative w-full h-full min-h-[400px] flex items-center justify-center opacity-0">
          <!-- Background Shape -->
          <div class="absolute w-4/5 h-4/5 bg-gradient-to-br from-[#FFD43B] to-[#FFA500] rounded-3xl z-0 transform rotate-3 shadow-2xl shadow-[#FFD43B]/20"></div>
          
          <!-- Image Container -->
          <div class="relative z-10 w-4/5 bg-gradient-to-br from-[#2A2A2A] to-[#1F1F1F] rounded-3xl p-2 shadow-2xl border border-[#FFD43B]/30">
            <img
              :src="getImage(contactBlocks.main.image)"
              alt="Contact Office"
              class="w-full h-auto rounded-2xl object-cover"
            />
          </div>

          <!-- Floating Badge (Dynamic from contact_us2) -->
<div
  v-if="contactUs2"
  class="absolute top-8 -right-4 bg-gradient-to-br from-[#FFD43B] to-[#FFA500] text-[#1A1A1A] px-6 py-3 rounded-2xl shadow-xl font-bold text-sm transform rotate-3 hover:rotate-0 transition-transform duration-300 flex items-center gap-2"
>
  <img
    v-if="contactUs2.icon"
    :src="contactUs2.icon"
    alt="Icon"
    class="w-5 h-5"
  />
  <span v-html="contactUs2.title"></span>
</div>

          <!-- Decorative Circle -->
          <div class="absolute -bottom-4 -left-4 w-24 h-24 bg-[#FFD43B]/20 rounded-full blur-xl"></div>
          <div class="absolute -top-4 -right-4 w-32 h-32 bg-[#FFD43B]/10 rounded-full blur-2xl"></div>
        </div>

        <!-- Contact Info Section -->
        <div ref="infoRef" class="opacity-0">
          <!-- Badge -->
          <p class="text-sm font-bold text-[#FFD43B] mb-3 tracking-wider uppercase">
            {{ contactBlocks.labels.title }}
          </p>

          <!-- Title -->
          <h2 class="text-4xl md:text-5xl font-bold text-white mb-4 font-heading">
            {{ contactBlocks.main.title }}
          </h2>

          <!-- Line Separator -->
          <div class="w-24 h-1 bg-[#FFD43B] mb-6"></div>

          <!-- Description -->
          <p class="text-gray-400 text-lg mb-10 leading-relaxed" v-html="contactBlocks.main.content"></p>

          <!-- Contact Details -->
          <div class="space-y-6">
            <!-- Operational Hours -->
            <div 
              ref="hoursRef" 
              class="contact-item flex gap-5 p-6 bg-gradient-to-br from-[#2A2A2A] to-[#1F1F1F] rounded-2xl border-l-4 border-[#FFD43B] hover:border-[#FFD43B] hover:shadow-xl hover:shadow-[#FFD43B]/20 transition-all duration-300 transform hover:scale-[1.02] opacity-0"
            >
              <div class="w-12 h-12 flex items-center justify-center bg-[#FFD43B]/10 rounded-xl flex-shrink-0">
                <img :src="getImage(contactBlocks.hours.icon)" class="w-7 h-7" />
              </div>
              <div>
                <p class="font-bold text-white text-lg mb-1">
                  {{ contactBlocks.hours.title }}
                </p>
                <p class="text-gray-400" v-html="contactBlocks.hours.content"></p>
              </div>
            </div>

            <!-- Support -->
            <div 
              ref="supportRef" 
              class="contact-item flex gap-5 p-6 bg-gradient-to-br from-[#2A2A2A] to-[#1F1F1F] rounded-2xl border-l-4 border-[#FFD43B] hover:border-[#FFD43B] hover:shadow-xl hover:shadow-[#FFD43B]/20 transition-all duration-300 transform hover:scale-[1.02] opacity-0"
            >
              <div class="w-12 h-12 flex items-center justify-center bg-[#FFD43B]/10 rounded-xl flex-shrink-0">
                <img :src="getImage(contactBlocks.support.icon)" class="w-7 h-7" />
              </div>
              <div>
                <p class="font-bold text-white text-lg mb-1">
                  {{ contactBlocks.support.title }}
                </p>
                <p class="text-gray-400" v-html="contactBlocks.support.content"></p>
              </div>
            </div>

            <!-- Address -->
            <div 
              ref="addressRef" 
              class="contact-item flex gap-5 p-6 bg-gradient-to-br from-[#2A2A2A] to-[#1F1F1F] rounded-2xl border-l-4 border-[#FFD43B] hover:border-[#FFD43B] hover:shadow-xl hover:shadow-[#FFD43B]/20 transition-all duration-300 transform hover:scale-[1.02] opacity-0"
            >
              <div class="w-12 h-12 flex items-center justify-center bg-[#FFD43B]/10 rounded-xl flex-shrink-0">
                <img :src="getImage(contactBlocks.address.icon)" class="w-7 h-7" />
              </div>
              <div>
                <p class="font-bold text-white text-lg mb-1">
                  {{ contactBlocks.address.title }}
                </p>
                <p class="text-gray-400 whitespace-pre-line" v-html="contactBlocks.address.content"></p>
              </div>
            </div>
          </div>

          <!-- CTA Button (Optional) -->
          
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { API_ENDPOINTS } from '@/config/api'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Refs
const sectionRef = ref(null)
const imageRef = ref(null)
const infoRef = ref(null)
const hoursRef = ref(null)
const supportRef = ref(null)
const addressRef = ref(null)
const ctaRef = ref(null)
const curveRef = ref(null)
const dotsRef = ref(null)
const contactUs2 = ref(null)

const contactBlocks = ref({
  main: {},
  labels: {},
  hours: {},
  support: {},
  address: {}
})

let ctx

function getImage(src) {
  if (!src) return ''
  return src.startsWith('http') ? src : `${API_ENDPOINTS.baseURL}${src}`
}

function parse(data) {
  if (!data) return {}
  return typeof data === 'string' ? JSON.parse(data) : data
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

    // 1. Image section animation
    tl.to(imageRef.value, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: 'power3.out'
    })

    // 2. Info section (badge, title, line, description)
    .to(infoRef.value, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.5')

    // 3. Contact items stagger
    .to([hoursRef.value, supportRef.value, addressRef.value], {
      opacity: 1,
      x: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power2.out'
    }, '-=0.4')

    // 4. CTA Button
    .to(ctaRef.value, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'back.out(1.4)'
    }, '-=0.3')

    // 5. Decorative elements
    .to(curveRef.value, {
      rotation: 100,
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
      y: 20,
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

    // Floating animation for image background
    gsap.to(imageRef.value.querySelector('.absolute.w-4\\/5'), {
      rotation: 6,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })

  }, sectionRef.value)
}

onMounted(() => {
  const raw = localStorage.getItem('customPageData:Home')
  if (!raw) return console.warn('Data halaman Home tidak ditemukan di localStorage')

  try {
    const data = JSON.parse(raw)

    contactBlocks.value = {
      main: parse(data.contact_info_main),
      labels: parse(data.contact_info_badge),
      hours: parse(data.contact_info_hours2),
      support: parse(data.contact_info_support2),
      address: parse(data.contact_info_address2)
    }

     // ➕ Ambil dan set data contact_us2
    const contactUsArr = parse(data.contact_us2)   // biasanya array dari CMS
    contactUs2.value = Array.isArray(contactUsArr) ? contactUsArr[0] : contactUsArr
    
    // Initialize animations after data is loaded
    setTimeout(() => {
      initAnimations()
    }, 100)
  } catch (err) {
    console.error('Gagal parsing contact blocks:', err)
  }
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<style scoped>
/* Initial states */
.contact-item {
  transform: translateX(-30px);
}
</style>