<template>
  <section class="relative py-20 lg:py-32 px-4 md:px-8 lg:px-16 bg-white overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-[#FFD43B]/5 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-100/5 rounded-full blur-3xl"></div>
    </div>

    <!-- Header Section -->
    <div class="relative z-10 text-center mb-16 max-w-3xl mx-auto space-y-4">
      <!-- Badge -->
      <div 
        v-if="badge"
        class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFD43B]/15 border border-[#FFD43B]/40 backdrop-blur-sm"
        ref="badgeEl"
      >
        <div class="w-2 h-2 rounded-full bg-[#FFD43B]"></div>
        <span class="text-sm font-semibold text-gray-900">{{ badge }}</span>
      </div>

      <!-- Title -->
      <h2 
        class="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-gray-900 leading-tight"
        ref="titleEl"
      >
        {{ title }}
      </h2>

      <!-- Description -->
      <p 
        class="text-lg md:text-xl font-body text-gray-700 leading-relaxed max-w-2xl mx-auto"
        ref="descriptionEl"
      >
        {{ content }}
      </p>
    </div>

    <!-- Pilar Items Grid -->
    <div class="relative z-10 max-w-7xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="group relative"
          ref="pilarItems"
        >
          <!-- Card Container -->
          <div class="relative bg-white border-t-4 border-[#FFD43B] shadow-lg hover:shadow-2xl transition-all duration-300 p-8 rounded-2xl overflow-hidden">
            <!-- Gradient Overlay on Hover -->
            <div class="absolute inset-0 bg-gradient-to-br from-[#FFD43B]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

            <!-- Number Circle - Yellow Theme -->
            <div class="absolute -top-5 left-1/2 transform -translate-x-1/2 z-10">
              <div class="w-12 h-12 rounded-full bg-gradient-to-br from-[#FFD43B] to-yellow-400 text-black flex items-center justify-center font-display font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                {{ (index + 1).toString().padStart(2, '0') }}
              </div>
            </div>

            <!-- Content -->
            <div class="relative z-10 mt-10 space-y-4">
              <!-- Title -->
              <h3 class="text-xl md:text-2xl font-heading font-bold text-gray-900 group-hover:text-[#FFD43B] transition-colors duration-300">
                {{ item.title }}
              </h3>

              <!-- Description -->
              <p class="font-body text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                {{ item.content }}
              </p>

              <!-- Accent Line -->
              <div class="pt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-[#FFD43B] to-yellow-400 transition-all duration-500 rounded-full"></div>
            </div>

            <!-- Icon Placeholder (Optional) -->
            <div class="absolute bottom-6 right-6 w-14 h-14 rounded-xl bg-[#FFD43B]/10 group-hover:bg-[#FFD43B]/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <i class="fa-solid fa-arrow-right text-[#FFD43B] text-lg"></i>
            </div>
          </div>

          <!-- Background Glow on Hover -->
          <div class="absolute inset-0 bg-gradient-to-br from-[#FFD43B]/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
        </div>

        <!-- Empty State -->
        <div 
          v-if="items.length === 0"
          class="col-span-full text-center py-12 space-y-4"
        >
          <i class="fa-solid fa-inbox text-6xl text-gray-300"></i>
          <p class="text-lg text-gray-500 font-body">Belum ada data pilar ditambahkan.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Template Refs
const badgeEl = ref(null)
const titleEl = ref(null)
const descriptionEl = ref(null)
const pilarItems = ref([])

// Data Refs
const badge = ref('')
const title = ref('')
const content = ref('')
const items = ref([])

// Load data from localStorage
onMounted(() => {
  const raw = localStorage.getItem('customPageData:Home')
  if (!raw) {
    console.warn('Data customPage Home tidak ditemukan.')
    return
  }

  try {
    const data = JSON.parse(raw)

    // Parse badge
    try {
      const parsedBadge = typeof data.pilar_badge === 'string'
        ? JSON.parse(data.pilar_badge)
        : data.pilar_badge
      badge.value = parsedBadge?.title || ''
    } catch (e) {
      console.warn('Gagal parse pilar_badge:', e.message)
    }

    // Parse pilar main section
    try {
      const parsedPilar = typeof data.pilar === 'string'
        ? JSON.parse(data.pilar)
        : data.pilar
      title.value = parsedPilar?.title || ''
      content.value = parsedPilar?.content || ''
    } catch (e) {
      console.warn('Gagal parse pilar:', e.message)
    }

    // Parse pilar items
    const parsedItems = []
    const pilarRaw = data.pilar_items

    if (Array.isArray(pilarRaw)) {
      for (const entry of pilarRaw) {
        try {
          const item = typeof entry === 'string' ? JSON.parse(entry) : entry
          if (item && typeof item === 'object') parsedItems.push(item)
        } catch (e) {
          console.warn('Gagal parse item pilar_items:', e.message)
        }
      }
    } else if (typeof pilarRaw === 'string') {
      try {
        const parsed = JSON.parse(pilarRaw)
        if (Array.isArray(parsed)) {
          parsedItems.push(...parsed)
        } else if (typeof parsed === 'object') {
          parsedItems.push(parsed)
        }
      } catch (e) {
        console.warn('Gagal parse string pilar_items:', e.message)
      }
    } else if (typeof pilarRaw === 'object' && pilarRaw !== null) {
      parsedItems.push(pilarRaw)
    }

    items.value = parsedItems.map((item, i) => ({
      title: item?.title || `Item ${i + 1}`,
      content: item?.content || ''
    }))

    // Trigger animations after data is loaded
    setTimeout(() => {
      animateOnScroll()
    }, 100)

  } catch (err) {
    console.error('Error parsing localStorage customPageData:', err)
  }
})

// GSAP Animations
const animateOnScroll = () => {
  // Header animations
  gsap.fromTo(
    badgeEl.value,
    {
      opacity: 0,
      y: 20
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      scrollTrigger: {
        trigger: badgeEl.value,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    }
  )

  gsap.fromTo(
    titleEl.value,
    {
      opacity: 0,
      y: 30
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 0.2,
      scrollTrigger: {
        trigger: titleEl.value,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    }
  )

  gsap.fromTo(
    descriptionEl.value,
    {
      opacity: 0,
      y: 20
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      delay: 0.4,
      scrollTrigger: {
        trigger: descriptionEl.value,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    }
  )

  // Pilar cards stagger animation
  if (pilarItems.value.length > 0) {
    gsap.fromTo(
      pilarItems.value,
      {
        opacity: 0,
        y: 50,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.15,
        scrollTrigger: {
          trigger: pilarItems.value[0],
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        ease: 'back.out(1.5)'
      }
    )

    // Number circle animation - sequential
    gsap.from('[class*="rounded-full"][class*="bg-gradient-to-br"]', {
      scrollTrigger: {
        trigger: pilarItems.value[0],
        start: 'top 75%'
      },
      scale: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'back.out(2)'
    })
  }
}

// Cleanup on unmount
onUnmounted(() => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})
</script>

<style scoped>
/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Ensure proper animation rendering */
.group {
  perspective: 1000px;
}

/* Card depth effect */
.group:hover {
  transform: translateY(-4px);
}
</style>