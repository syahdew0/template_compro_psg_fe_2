<template>
  <section class="relative py-20 lg:py-32 px-4 md:px-8 lg:px-16 bg-white overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-[#FFD43B]/5 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-100/5 rounded-full blur-3xl"></div>
    </div>

    <!-- Header Section -->
    <div class="relative z-10 text-center mb-16 max-w-3xl mx-auto space-y-4">
      <h2 
        class="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-gray-900 leading-tight"
        ref="headerEl"
      >
        Our Gallery
      </h2>
      <p 
        class="text-lg md:text-xl font-body text-gray-700 leading-relaxed"
        ref="subtitleEl"
      >
        Showcase of our best work and projects
      </p>
    </div>

    <!-- Gallery Grid -->
    <div class="relative z-10 max-w-7xl mx-auto">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
        ref="galleryContainer"
      >
        <div
          v-for="(image, index) in filledGrid"
          :key="index"
          class="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 aspect-[4/3] cursor-pointer gallery-item"
          ref="galleryItems"
          @mouseenter="onImageHover(index)"
          @mouseleave="onImageLeave(index)"
        >
          <!-- Image -->
          <img
            v-if="image"
            :src="getImage(image)"
            alt="Gallery Image"
            class="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
          />
          <div 
            v-else 
            class="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center"
          >
            <div class="text-center space-y-3">
              <i class="fa-solid fa-image text-4xl text-gray-300"></i>
              <span class="text-sm text-gray-400 font-body">No Image</span>
            </div>
          </div>

          <!-- Overlay on Hover -->
          <div class="absolute inset-0 bg-gradient-to-t from-[#FFD43B]/40 via-[#FFD43B]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <!-- Number Badge -->
          <div class="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#FFD43B] text-black font-display font-bold flex items-center justify-center shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            {{ index + 1 }}
          </div>

          <!-- Bottom Text Card on Hover -->
          <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <p class="font-heading font-bold text-white text-lg">
              Project {{ (index + 1).toString().padStart(2, '0') }}
            </p>
            <p class="font-body text-yellow-300 text-sm">
              View Details
            </p>
          </div>

          <!-- Border Accent on Hover -->
          <div class="absolute inset-0 border-2 border-[#FFD43B] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
        </div>
      </div>

      <!-- Empty State -->
      <div 
        v-if="filledGrid.every(img => !img)"
        class="col-span-full text-center py-16 space-y-4"
      >
        <i class="fa-solid fa-photo-film text-6xl text-gray-300"></i>
        <p class="text-lg text-gray-500 font-body">Belum ada galeri ditambahkan.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { API_ENDPOINTS } from '@/config/api'

gsap.registerPlugin(ScrollTrigger)

// Template Refs
const headerEl = ref(null)
const subtitleEl = ref(null)
const galleryContainer = ref(null)
const galleryItems = ref([])
const ctaButtonEl = ref(null)

// Data Refs
const filledGrid = ref([])

// Get image URL
function getImage(image) {
  if (!image) return '/no-image.jpg'
  
  if (image.startsWith('http://') || image.startsWith('https://')) {
    return image
  }
  
  const baseURL = API_ENDPOINTS.baseURL || window.APIS_URL || ''
  const cleanSrc = image.startsWith('/') ? image : `/${image}`
  const cleanBaseURL = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL
  
  return `${cleanBaseURL}${cleanSrc}`
}

// Load gallery data
onMounted(() => {
  const rawStorage = localStorage.getItem('customPageData:Home')
  if (!rawStorage) {
    console.warn('Data Home tidak ditemukan di localStorage')
    return
  }

  try {
    const data = JSON.parse(rawStorage)
    const raw = data.gallery_grid
    const parsedList = []

    if (Array.isArray(raw)) {
      for (const item of raw) {
        try {
          const parsed = typeof item === 'string' ? JSON.parse(item) : item
          if (parsed?.image) parsedList.push(parsed.image)
        } catch (e) {
          console.warn('Gagal parse item gallery_grid (array):', e.message)
        }
      }
    } else if (typeof raw === 'string') {
      try {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) {
          for (const item of parsed) {
            if (typeof item === 'string') {
              try {
                const sub = JSON.parse(item)
                if (sub?.image) parsedList.push(sub.image)
              } catch {
                parsedList.push(item)
              }
            } else if (item?.image) {
              parsedList.push(item.image)
            }
          }
        } else if (parsed?.image) {
          parsedList.push(parsed.image)
        }
      } catch (e) {
        console.warn('Gagal parse string gallery_grid:', e.message)
      }
    } else if (typeof raw === 'object' && raw !== null) {
      if (raw?.image) parsedList.push(raw.image)
    }

    const totalSlots = 12
    filledGrid.value = parsedList.slice(0, 12)
    while (filledGrid.value.length < totalSlots) {
      filledGrid.value.push(null)
    }

    console.log('filledGrid:', filledGrid.value)

    // Trigger animations after data is loaded
    setTimeout(() => {
      animateOnScroll()
    }, 100)

  } catch (err) {
    console.error('Error parsing gallery_grid from localStorage:', err)
  }
})

// GSAP Animations
const animateOnScroll = () => {
  // Header animations
  gsap.fromTo(
    headerEl.value,
    {
      opacity: 0,
      y: 30
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: headerEl.value,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    }
  )

  gsap.fromTo(
    subtitleEl.value,
    {
      opacity: 0,
      y: 20
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      delay: 0.2,
      scrollTrigger: {
        trigger: subtitleEl.value,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    }
  )

  // Gallery items stagger animation
  if (galleryItems.value.length > 0) {
    gsap.fromTo(
      galleryItems.value,
      {
        opacity: 0,
        y: 40,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
        scrollTrigger: {
          trigger: galleryContainer.value,
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        ease: 'power2.out'
      }
    )
  }

  // CTA Button animation
  if (ctaButtonEl.value) {
    gsap.fromTo(
      ctaButtonEl.value,
      {
        opacity: 0,
        scale: 0.8
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        delay: 0.8,
        scrollTrigger: {
          trigger: ctaButtonEl.value,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    )
  }
}

// Hover interactions
const onImageHover = (index) => {
  if (galleryItems.value[index]) {
    gsap.to(galleryItems.value[index], {
      y: -8,
      duration: 0.3,
      overwrite: 'auto'
    })
  }
}

const onImageLeave = (index) => {
  if (galleryItems.value[index]) {
    gsap.to(galleryItems.value[index], {
      y: 0,
      duration: 0.3,
      overwrite: 'auto'
    })
  }
}

// Cleanup
onUnmounted(() => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})
</script>

<style scoped>
/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Image hover effect optimization */
.gallery-item img {
  will-change: transform;
}

/* Ensure proper rendering */
.group {
  isolation: isolate;
}
</style>