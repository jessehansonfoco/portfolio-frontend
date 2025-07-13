<script setup lang="ts">
import router from '../router'
import ApiService from '../services/api-service'
if (!ApiService.isAuthenticated()) {
    router.push("/login")
}

import AdminSidebar from '@/components/admin/Sidebar.vue'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

</script>
<template>
  <SidebarProvider>
    <AdminSidebar />
    <main class="w-full p-10">
      <RouterView />
    </main>
  </SidebarProvider>
</template>