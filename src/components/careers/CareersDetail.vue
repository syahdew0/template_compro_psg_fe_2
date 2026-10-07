<template>
  <section class="relative min-h-screen bg-white py-28 px-4 lg:px-24 overflow-hidden">
    
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 right-1/4 w-80 h-80 bg-[#FFD43B]/5 rounded-full blur-3xl"></div>
      <div class="absolute top-1/2 -left-40 w-80 h-80 bg-yellow-100/10 rounded-full blur-3xl"></div>
    </div>

    <div class="relative z-10 max-w-5xl mx-auto">
      <!-- Loading State -->
      <div v-if="!post" class="text-center py-20">
        <div class="w-16 h-16 mx-auto mb-6">
          <div class="w-full h-full border-4 border-[#FFD43B]/30 border-t-[#FFD43B] rounded-full animate-spin"></div>
        </div>
        <p class="text-gray-500 text-lg">Memuat artikel...</p>
      </div>

      <!-- Post Content -->
      <article v-else class="space-y-8" ref="articleEl">
        
        <!-- Back Button -->
        <router-link
          to="/careers"
          class="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white border-2 border-gray-200 hover:border-[#FFD43B]/50 hover:shadow-lg transition-all duration-300 group"
        >
          <div class="w-8 h-8 rounded-full bg-[#FFD43B]/20 flex items-center justify-center group-hover:bg-[#FFD43B]/30 transition-colors">
            <i class="fa-solid fa-arrow-left text-[#FFD43B]"></i>
          </div>
          <span class="font-semibold text-gray-700">Kembali ke Careers</span>
        </router-link>

        <!-- Header Section -->
        <div class="space-y-6" ref="headerEl">
          <!-- Category Badge -->
          <div class="flex flex-wrap gap-2">
            <div 
              v-for="cat in post.categories" 
              :key="cat.id"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFD43B]/15 border border-[#FFD43B]/40"
            >
              <div class="w-2 h-2 rounded-full bg-[#FFD43B]"></div>
              <span class="text-sm font-semibold text-gray-900">{{ cat.name }}</span>
            </div>
          </div>

          <!-- Title -->
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            {{ post.title }}
          </h1>

          <!-- Meta Info -->
          <div class="flex flex-wrap items-center gap-6 text-gray-600">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-[#FFD43B]/20 flex items-center justify-center">
                <i class="fa-solid fa-calendar text-[#FFD43B]"></i>
              </div>
              <div>
                <p class="text-xs text-gray-500">Dipublikasikan pada</p>
                <p class="text-sm font-semibold text-gray-900">
                  {{ formatDate(post.published_at || post.created_at) }}
                </p>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-[#FFD43B]/20 flex items-center justify-center">
                <i class="fa-solid fa-clock text-[#FFD43B]"></i>
              </div>
              <div>
                <p class="text-xs text-gray-500">Waktu baca</p>
                <p class="text-sm font-semibold text-gray-900">{{ readingTime }} menit</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Divider -->
        <div class="h-px bg-gradient-to-r from-transparent via-[#FFD43B]/30 to-transparent"></div>

        <!-- Featured Image -->
        <div v-if="post.thumbnail_url" class="relative group" ref="imageEl">
          <div class="overflow-hidden rounded-3xl shadow-2xl border-2 border-gray-200">
            <img
              :src="getImageUrl(post.thumbnail_url)"
              alt="Post Image"
              class="w-full aspect-video object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          <!-- Decorative Elements -->
          <div class="absolute -top-4 -right-4 w-24 h-24 rounded-3xl border-2 border-[#FFD43B]/40 -z-10"></div>
          <div class="absolute -bottom-4 -left-4 w-32 h-32 rounded-3xl border-2 border-yellow-200/50 -z-10"></div>
        </div>

        <!-- Article Content -->
        <div 
          class="prose prose-lg prose-gray max-w-none"
          v-html="post.content"
          ref="contentEl"
        ></div>

        <!-- Divider -->
        <div class="h-px bg-gradient-to-r from-transparent via-[#FFD43B]/30 to-transparent mt-16"></div>

        <!-- Share Section -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-2xl bg-gradient-to-br from-[#FFD43B]/5 to-yellow-100/5 border-2 border-[#FFD43B]/20">
          <div class="space-y-2">
            <h3 class="text-xl font-bold text-gray-900">Bagikan Artikel Ini</h3>
            <p class="text-sm text-gray-600">Berbagi informasi bermanfaat dengan yang lain</p>
          </div>
          
          <div class="flex items-center gap-3">
            <button class="w-12 h-12 rounded-full bg-white border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-500 hover:text-white flex items-center justify-center transition-all duration-300 group">
              <i class="fa-brands fa-facebook text-blue-600 group-hover:text-white"></i>
            </button>
            <button class="w-12 h-12 rounded-full bg-white border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-400 hover:text-white flex items-center justify-center transition-all duration-300 group">
              <i class="fa-brands fa-twitter text-blue-400 group-hover:text-white"></i>
            </button>
            <button class="w-12 h-12 rounded-full bg-white border-2 border-gray-200 hover:border-green-500 hover:bg-green-500 hover:text-white flex items-center justify-center transition-all duration-300 group">
              <i class="fa-brands fa-whatsapp text-green-500 group-hover:text-white"></i>
            </button>
            <button class="w-12 h-12 rounded-full bg-white border-2 border-gray-200 hover:border-[#FFD43B] hover:bg-[#FFD43B] hover:text-black flex items-center justify-center transition-all duration-300 group">
              <i class="fa-solid fa-link text-gray-600 group-hover:text-black"></i>
            </button>
          </div>
        </div>

        <!-- Back to News CTA -->
        <div class="text-center pt-8">
          <router-link
            to="/careers"
            class="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#FFD43B] hover:bg-[#FFD43B]/90 text-black font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <i class="fa-solid fa-newspaper"></i>
            <span>Lihat Lowongan Lainnya</span>
            <i class="fa-solid fa-arrow-right"></i>
          </router-link>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { API_ENDPOINTS } from '@/config/api'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const route = useRoute()
const post = ref(null)
const articleEl = ref(null)
const headerEl = ref(null)
const imageEl = ref(null)
const contentEl = ref(null)

function getImageUrl(path) {
  if (!path) return 'https://via.placeholder.com/600x400?text=No+Image'
  return path.startsWith('http') ? path : `${API_ENDPOINTS.media}${path}`
}

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Calculate reading time
const readingTime = computed(() => {
  if (!post.value?.content) return 1
  const words = post.value.content.replace(/<[^>]*>/g, '').split(/\s+/).length
  return Math.ceil(words / 200) // Average reading speed: 200 words/minute
})

// Animations
const animateArticle = () => {
  // Header animation
  if (headerEl.value) {
    gsap.fromTo(
      headerEl.value.children,
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      }
    )
  }

  // Image animation
  if (imageEl.value) {
    gsap.fromTo(
      imageEl.value,
      {
        opacity: 0,
        scale: 0.95
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: imageEl.value,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    )
  }

  // Content fade in
  if (contentEl.value) {
    gsap.fromTo(
      contentEl.value,
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contentEl.value,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    )
  }
}

onMounted(async () => {
  try {
    const slug = route.params.slug
    const res = await axios.get(API_ENDPOINTS.postBySlug(slug))
    console.log('RESPONS DARI API:', res.data)
    post.value = res.data

    // Animate after content loaded
    setTimeout(() => {
      animateArticle()
    }, 100)
  } catch (err) {
    console.error('Gagal memuat detail postingan:', err)
  }
})
</script>

<style scoped>
.aspect-video {
  aspect-ratio: 16 / 9;
}

/* Enhanced Prose Styling */
.prose {
  @apply text-gray-800;
}

.prose :deep(h1),
.prose :deep(h2),
.prose :deep(h3),
.prose :deep(h4) {
  @apply font-bold text-gray-900 mt-8 mb-4;
}

.prose :deep(h1) {
  @apply text-3xl;
}

.prose :deep(h2) {
  @apply text-2xl;
}

.prose :deep(h3) {
  @apply text-xl;
}

.prose :deep(p) {
  @apply mb-6 leading-relaxed;
}

.prose :deep(img) {
  @apply rounded-2xl my-8 shadow-lg border-2 border-gray-200;
}

.prose :deep(a) {
  @apply text-[#FFD43B] font-semibold hover:underline;
}

.prose :deep(blockquote) {
  @apply border-l-4 border-[#FFD43B] pl-6 py-4 my-6 bg-[#FFD43B]/5 rounded-r-lg italic;
}

.prose :deep(ul),
.prose :deep(ol) {
  @apply my-6 space-y-2;
}

.prose :deep(li) {
  @apply leading-relaxed;
}

.prose :deep(code) {
  @apply bg-gray-100 px-2 py-1 rounded text-sm font-mono;
}

.prose :deep(pre) {
  @apply bg-gray-900 text-gray-100 p-6 rounded-xl my-6 overflow-x-auto;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>