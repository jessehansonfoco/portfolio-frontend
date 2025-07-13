<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { Progress } from '@/components/ui/progress'
import { useRoute } from 'vue-router'
import ContentService from '../../services/content-service'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

const post = ref([])
const loading = ref(false)
const route = useRoute()
const contentSlug = route.params.slug
const progress = ref(13)

watchEffect((cleanupFn) => {
  const timer = setTimeout(() => progress.value = 66, 500)
  cleanupFn(() => clearTimeout(timer))
})

async function fetchData() {

    loading.value = true

    try {
        let rawResponse = await ContentService.getContent(contentSlug)
        let content = rawResponse.data
        post.value = content
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

      <div class="breadcrumbs mb-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>{{ post.title }}</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      </div>

      <div class="mx-auto max-w-2xl lg:mx-0">
        <h2 class="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">{{ post.title }}</h2>
        <p class="mt-2 text-lg/8 text-gray-600">{{ post.shortDescription }}</p>
      </div>
      <div class="mx-auto mt-10 max-w-2xl border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none">
        <div v-for="row in post.contentRows" class="col-start-1 row-start-1 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 pt-10 pb-10">
          <div v-for="part in row.contentRowParts">
            <div v-if="part.typeCode == 'image'" class="pt-10">
              <a v-if="part.imageLinkUrl !== ''" :href="part.imageLinkUrl">
                <img class="rounded-sm" :src="part.imageUrl" />
              </a>
              <img v-else class="rounded-sm" :src="part.imageUrl" />
            </div>
            <div class="pt-10 pb-10 pr-10 pl-10 sm:pt-5 sm:pb-5 sm:pr-5 sm:pl-5" v-else>
              <p class="text-xl font-medium" v-html="part.content"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
