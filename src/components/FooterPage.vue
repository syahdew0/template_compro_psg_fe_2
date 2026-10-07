<template>
  <footer class="relative bg-white text-gray-900 pt-16 pb-8 px-6 border-t-2 border-gray-100 overflow-hidden">
    
    <!-- Decorative Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -bottom-20 -left-20 w-64 h-64 bg-[#FFD43B]/5 rounded-full blur-3xl"></div>
      <div class="absolute -top-20 -right-20 w-64 h-64 bg-[#FFD43B]/5 rounded-full blur-3xl"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto">
      <div class="grid md:grid-cols-2 gap-12 mb-12">
        
        <!-- Left Section: Logo, Title, Content, Social Media -->
        <div class="space-y-6">
          <div class="flex items-start gap-4">
            <!-- Logo -->
            <div 
              v-if="footerBlocks.main.image"
              class="flex-shrink-0 w-14 h-14 rounded-xl bg-[#FFD43B]/10 p-2 border border-[#FFD43B]/20"
            >
              <img
                :src="getImage(footerBlocks.main.image)"
                alt="logo"
                class="w-full h-full object-contain"
              />
            </div>

            <!-- Content beside Logo -->
            <div class="flex-1">
              <h2 class="font-bold text-2xl text-gray-900 mb-2">
                {{ footerBlocks.main.title }}
              </h2>
              <p class="text-gray-700 text-sm leading-relaxed">
                {{ footerBlocks.main.content }}
              </p>
            </div>
          </div>

          <!-- Social Media -->
          <div v-if="footerBlocks.sosmed.length" class="space-y-3">
            <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Follow Us
            </h3>
            <div class="flex gap-3">
              <a
                v-for="(item, index) in footerBlocks.sosmed"
                :key="index"
                :href="item.link"
                target="_blank"
                rel="noopener noreferrer"
                class="w-10 h-10 rounded-lg bg-white border-2 border-gray-200 hover:border-[#FFD43B] hover:bg-[#FFD43B]/5 flex items-center justify-center transition-all duration-300 group"
              >
                <img 
                  :src="getImage(item.icon)" 
                  alt="social-icon" 
                  class="w-5 h-5 object-contain opacity-70 group-hover:opacity-100 transition-opacity" 
                />
              </a>
            </div>
          </div>

          <!-- Operating Hours -->
          <div 
            v-if="footerBlocks.hours.title"
            class="p-4 rounded-xl bg-[#FFD43B]/5 border border-[#FFD43B]/20"
          >
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 rounded-lg bg-[#FFD43B] flex items-center justify-center flex-shrink-0">
                <i class="fa-solid fa-clock text-black text-lg"></i>
              </div>
              <div>
                <p class="text-sm font-semibold text-gray-900">
                  {{ footerBlocks.hours.title }}
                </p>
                <p class="text-sm text-gray-700 mt-1">
                  {{ footerBlocks.hours.content }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Section: Contact Info -->
        <div class="space-y-4" v-if="footerBlocks.info.length">
          <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-6">
            Contact Information
          </h3>
          
          <div
            v-for="(item, index) in footerBlocks.info"
            :key="index"
            class="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-200 hover:border-[#FFD43B]/50 hover:shadow-sm transition-all duration-300 group"
          >
            <!-- Icon Container -->
            <div 
              v-if="item.icon"
              class="w-10 h-10 rounded-lg bg-[#FFD43B]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FFD43B] transition-colors"
            >
              <img
                :src="getImage(item.icon)"
                alt="icon"
                class="w-5 h-5 object-contain opacity-70 group-hover:opacity-100"
              />
            </div>

            <!-- Content -->
            <div class="flex-1 min-w-0">
              <a
                v-if="item.link"
                :href="item.link"
                class="text-sm text-gray-900 hover:text-[#FFD43B] font-medium transition-colors break-words"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ item.content || item.link }}
              </a>
              <div v-else>
                <p v-if="item.title" class="text-xs text-gray-600 uppercase tracking-wide mb-1">
                  {{ item.title }}
                </p>
                <p class="text-sm text-gray-900 font-medium break-words">
                  {{ item.content }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div class="h-px bg-gradient-to-r from-transparent via-[#FFD43B]/30 to-transparent my-8"></div>

      <!-- Footer Bottom -->
      <div class="text-center space-y-4">
        <p class="text-sm text-gray-700">
          {{ footerBlocks.bottom.title || footerBlocks.main.title }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { API_ENDPOINTS } from '@/config/api'

const footerBlocks = ref({
  main: {},
  info: [],
  sosmed: [],
  bottom: {},
  hours: {}
})

function getImage(src) {
  if (!src) return '/no-image.jpg'
  return src.startsWith('http') ? src : `${API_ENDPOINTS.baseURL}${src}`
}

function parse(data) {
  if (!data) return []
  const raw = typeof data === 'string' ? JSON.parse(data) : data
  return Array.isArray(raw)
    ? raw.map(item => (typeof item === 'string' ? JSON.parse(item) : item))
    : [raw]
}

onMounted(() => {
  try {
    const raw = localStorage.getItem('customPageData:Home')
    if (!raw) return console.warn('customPageData:Home tidak ditemukan')

    const data = JSON.parse(raw)

    // Parse footer data
    footerBlocks.value.main = parse(data.footer)[0] || {}
    footerBlocks.value.info = parse(data.footer_info)
    footerBlocks.value.sosmed = parse(data.footer_social)
    footerBlocks.value.bottom = parse(data.footer_bottom)[0] || {}
    footerBlocks.value.hours = parse(data.footer_info_hours)[0] || {}

  } catch (err) {
    console.error('Gagal parse footer data:', err)
  }
})
</script>

<style scoped>
/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, opacity, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Link hover effect */
a:hover {
  text-decoration: none;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  footer {
    padding-top: 3rem;
    padding-bottom: 2rem;
  }
}
</style>