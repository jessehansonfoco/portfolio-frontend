<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { Progress } from '@/components/ui/progress'
import ContentService from '../../services/content-service'
const posts = ref([])
const loading = ref(false)
const progress = ref(13)

watchEffect((cleanupFn) => {
  const timer = setTimeout(() => progress.value = 66, 500)
  cleanupFn(() => clearTimeout(timer))
})

function formatDateString(date) {
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const d = new Date(date)
  const month = months[d.getMonth()]
  const day = d.getDay()
  const year = d.getFullYear()
  return [month, day , year].join(' ')
}

async function fetchData() {
  loading.value = true

  try {
    let rawResponse = await ContentService.getContentListing()
    let rawPosts = rawResponse.data
    for (let idx = 0; idx < rawPosts.length; idx++) {
      let post = rawPosts[idx]
      post.url = '/content/' + post.slug
      rawPosts[idx] = post
    }
    posts.value = rawPosts
  } catch (err) {
    console.log('Error: ' + err.toString())
  } finally {
    loading.value = false
  }
}

fetchData()

</script>
<template>

  <div v-if="loading" class="flex min-h-[350px] w-full justify-center p-10 items-center">
    <Progress v-model="progress" class="w-3/5" />
  </div>
  <div class="bg-white py-24 sm:py-32" v-else>
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:mx-0">
        <h2 class="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Jesse Hanson</h2>
        <p class="mt-2 text-lg/8 text-gray-600">Full Stack Software Developer<br>Fort Collins, Colorado</p>
      </div>
      <div class="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        <article v-for="post in posts" :key="post.id" class="flex max-w-xl flex-col items-start justify-between">
          <div class="width-full">
            <a :href="post.url">
              <img :src="post.imageUrl" class="rounded-sm" />
            </a>
          </div>
          <div class="flex items-center gap-x-4 text-xs">
            <span class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 mt-5 font-medium text-gray-600 hover:bg-gray-100">
              <time :datetime="post.createdAt" class="text-gray-500">{{ formatDateString(post.createdAt) }}</time>
            </span>
          </div>
          <div class="group relative">
            <h3 class="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
              <a :href="post.url">
                <span class="absolute inset-0" />
                {{ post.title }}
              </a>
            </h3>
            <p class="mt-5 line-clamp-3 text-sm/6 text-gray-600">{{ post.shortDescription }}</p>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>