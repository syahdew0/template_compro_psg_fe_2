<template>
  <section ref="sectionRef" class="py-20 px-6 bg-[#1A1A1A] min-h-screen relative overflow-hidden">
    <!-- Decorative curved line - bottom right -->
    <div ref="curveRef" class="absolute bottom-0 right-0 w-64 h-64 opacity-20">
      <svg viewBox="0 0 200 200" class="w-full h-full">
        <path d="M200,200 Q150,150 200,100 L200,200 Z" fill="#FFD43B"/>
      </svg>
    </div>

    <!-- Decorative dots pattern -->
    <div ref="dotsRef" class="absolute top-20 left-10 w-32 h-32 opacity-10">
      <div class="grid grid-cols-4 gap-3">
        <div v-for="i in 16" :key="i" class="dot w-2 h-2 rounded-full bg-[#FFD43B]"></div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto relative z-10">
      <h2 ref="titleRef" class="text-5xl font-bold text-center mb-4 text-white font-heading opacity-0">
        Struktur Organisasi
      </h2>
      <div ref="lineRef" class="w-24 h-1 bg-[#FFD43B] mx-auto mb-16 scale-x-0"></div>

      <!-- Founder to PA -->
      <div class="flex flex-col items-center relative mb-8">
        <div ref="founderRef" class="bg-gradient-to-br from-[#2A2A2A] to-[#1F1F1F] shadow-2xl rounded-2xl p-8 w-full max-w-md text-center border-t-4 border-[#FFD43B] z-10 transform hover:scale-105 transition-all duration-300 opacity-0">
          <h3 class="text-2xl font-bold text-white font-heading">Founder</h3>
        </div>

        <!-- Line: Founder to PA -->
        <div ref="line1Ref" class="w-0.5 h-16 bg-gradient-to-b from-[#FFD43B] to-[#444] scale-y-0 origin-top"></div>

        <div ref="paRef" class="bg-[#2A2A2A] border-l-4 border-[#FFD43B] rounded-xl shadow-xl p-5 w-full max-w-md text-center z-10 transform hover:scale-105 transition-all duration-300 opacity-0">
          <h4 class="font-semibold text-white text-lg">Personal Assistant (PA)</h4>
        </div>

        <!-- Line: PA to GM section -->
        <div ref="line2Ref" class="w-0.5 h-24 bg-gradient-to-b from-[#444] to-[#FFD43B] top-0 relative z-0 scale-y-0 origin-top"></div>
      </div>

      <!-- GM + Finance Roles -->
      <div class="relative mb-32">
        <!-- Horizontal connector -->
        <div ref="horizontalLineRef" class="absolute top-8 left-[10%] w-[80%] h-0.5 bg-gradient-to-r from-transparent via-[#FFD43B] to-transparent z-0 scale-x-0"></div>

        <!-- Role Cards -->
        <div ref="financeRolesRef" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 relative z-10">
          <div
            v-for="role in financeRoles"
            :key="role"
            class="finance-card bg-gradient-to-br from-[#2A2A2A] to-[#1F1F1F] rounded-2xl top-12 shadow-2xl border-t-4 border-[#FFD43B] p-6 text-center hover:scale-105 hover:shadow-[#FFD43B]/20 transition-all duration-300 group opacity-0"
          >
            <h4 class="text-sm font-bold text-white group-hover:text-[#FFD43B] transition-colors duration-300">{{ role }}</h4>
          </div>
        </div>
      </div>

      <!-- Line to Divisions -->
      <div class="relative mb-20">
        <!-- Vertical line from GM to division line -->
        <div ref="verticalLineRef" class="absolute -top-28 left-1/2 transform -translate-x-1/2 w-0.5 h-40 bg-gradient-to-b from-[#FFD43B] to-[#444] z-0 scale-y-0 origin-top"></div>
        <!-- Horizontal line to division boxes -->
        <div ref="divisionLineRef" class="absolute top-12 left-[10%] w-[80%] h-0.5 bg-gradient-to-r from-transparent via-[#444] to-transparent z-0 scale-x-0"></div>
      </div>

      <!-- Divisions -->
      <div ref="divisionsRef" class="grid gap-8 md:grid-cols-2 lg:grid-cols-2 relative z-10">
        <div
          v-for="(division, index) in divisions"
          :key="index"
          class="division-card p-8 rounded-2xl shadow-2xl hover:shadow-[#FFD43B]/20 transform transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-[#2A2A2A] to-[#1F1F1F] border-t-4 border-[#FFD43B] group opacity-0"
        >
          <h4 class="text-2xl font-bold mb-6 text-center text-white group-hover:text-[#FFD43B] transition-colors duration-300 font-heading">
            {{ division.title }}
          </h4>
          <ul class="space-y-3">
            <li
              v-for="(r, i) in division.roles"
              :key="i"
              class="role-item text-sm flex items-start gap-3 rounded-lg px-4 py-3 bg-[#1A1A1A]/50 border-l-4 border-[#444] hover:border-[#FFD43B] text-gray-300 hover:text-white transition-all duration-300 opacity-0"
            >
              <svg class="w-5 h-5 mt-0.5 text-[#FFD43B] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span class="flex-1">{{ r.name }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Refs
const sectionRef = ref(null)
const titleRef = ref(null)
const lineRef = ref(null)
const curveRef = ref(null)
const dotsRef = ref(null)
const founderRef = ref(null)
const line1Ref = ref(null)
const paRef = ref(null)
const line2Ref = ref(null)
const horizontalLineRef = ref(null)
const financeRolesRef = ref(null)
const verticalLineRef = ref(null)
const divisionLineRef = ref(null)
const divisionsRef = ref(null)

const financeRoles = [
  "Admin Payroll",
  "Finance Officer",
  "General Manager",
  "Accounting & Tax Officer",
  "Purchasing Officer"
]

const divisions = [
  {
    title: "Head of People & Culture",
    roles: [
      { name: "Talent Acquisition & Development Officer", level: "staff" },
      { name: "Engagement & Culture Officer", level: "staff" },
      { name: "People & Operations Coordinator (HR + GA)", level: "staff" },
      { name: "Housekeeping Coordinator (Hospitality)", level: "staff" }
    ]
  },
  {
    title: "Technical Project Manager",
    roles: [
      { name: "Fullstack Developer(s)", level: "staff" },
      { name: "UI/UX Designer", level: "staff" },
      { name: "QA Manager", level: "staff" },
      { name: "Technical Support (AI-Assisted)", level: "staff" },
      { name: "Customer Support (AI-Assisted)", level: "staff" }
    ]
  },
  {
    title: "Property Operations Supervisor",
    roles: [
      { name: "Maintenance & Unit Readiness Coordinator", level: "staff" },
      { name: "Freelance Booking Team (Komisi & SLA-based)", level: "staff" },
      { name: "Partnership & Owner Relation Coordinator", level: "staff" }
    ]
  },
  {
    title: "Digital Growth & Marketing Manager",
    roles: [
      { name: "SEO Specialist", level: "staff" },
      { name: "Social Media Strategist", level: "staff" },
      { name: "Software Consultant", level: "staff" },
      { name: "Sales Software Executive", level: "staff" },
      { name: "OTA Revenue Specialist", level: "staff" }
    ]
  }
]

let ctx

onMounted(() => {
  ctx = gsap.context(() => {
    // Master timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none none'
      }
    })

    // 1. Title & Line animation
    tl.to(titleRef.value, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    })
    .to(lineRef.value, {
      scaleX: 1,
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.4')

    // 2. Decorative elements
    .to(curveRef.value, {
      rotation: 360,
      duration: 2,
      ease: 'power1.inOut'
    }, '-=0.6')
    .to(dotsRef.value.querySelectorAll('.dot'), {
      scale: [0, 1.2, 1],
      opacity: [0, 1],
      duration: 0.4,
      stagger: 0.05,
      ease: 'back.out(1.7)'
    }, '-=1.5')

    // 3. Founder card
    .to(founderRef.value, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out'
    }, '-=0.5')

    // 4. Line 1 (Founder to PA)
    .to(line1Ref.value, {
      scaleY: 1,
      duration: 0.4,
      ease: 'power2.inOut'
    })

    // 5. PA card
    .to(paRef.value, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out'
    })

    // 6. Line 2 (PA to GM)
    .to(line2Ref.value, {
      scaleY: 1,
      duration: 0.4,
      ease: 'power2.inOut'
    })

    // 7. Horizontal line for finance roles
    .to(horizontalLineRef.value, {
      scaleX: 1,
      duration: 0.8,
      ease: 'power2.out'
    })

    // 8. Finance role cards
    .to(financeRolesRef.value.querySelectorAll('.finance-card'), {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power3.out'
    }, '-=0.4')

    // 9. Vertical line to divisions
    .to(verticalLineRef.value, {
      scaleY: 1,
      duration: 0.6,
      ease: 'power2.inOut'
    })

    // 10. Division horizontal line
    .to(divisionLineRef.value, {
      scaleX: 1,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.3')

    // 11. Division cards with stagger
    .to(divisionsRef.value.querySelectorAll('.division-card'), {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power3.out',
      onComplete: () => {
        // Animate role items inside each division
        divisionsRef.value.querySelectorAll('.division-card').forEach((card, cardIndex) => {
          gsap.to(card.querySelectorAll('.role-item'), {
            opacity: 1,
            x: 0,
            duration: 0.4,
            stagger: 0.05,
            delay: cardIndex * 0.1,
            ease: 'power2.out'
          })
        })
      }
    }, '-=0.4')

    // Continuous floating animation for decorative curve
    gsap.to(curveRef.value, {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })

    // Pulse animation for dots
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
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<style scoped>
/* Initial state for animated elements */
.role-item {
  transform: translateX(-20px);
}

.finance-card,
.division-card {
  transform: translateY(30px);
}
</style>