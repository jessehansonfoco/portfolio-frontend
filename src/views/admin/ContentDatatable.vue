<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ContentService from '../../services/content-service'
import type { Content } from './content_datatable/columns'
import { columns } from './content_datatable/columns'
import DataTable from './content_datatable/DataTable.vue'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

const posts = ref<(Content[])>([])
const loading = ref(false)

async function fetchData() {
  loading.value = true

  try {
    let rawResponse = await ContentService.getContentListing()
    let rawPosts = rawResponse.data
    posts.value = rawPosts
  } catch (err) {
    console.log('Error: ' + err.toString())
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  fetchData()
})
</script>
<template>
  
  <div class="breadcrumbs mb-10">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/admin/">
              Admin
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>Content</BreadcrumbItem>
        </BreadcrumbList>
    </Breadcrumb>
  </div>

  <p>
    <a class="vf-btn vf-btn-primary" href="/admin/content">Create</a>
  </p>
  <div class="pt-10 mx-auto">
    <DataTable :columns="columns" :data="posts" />
  </div>
</template>