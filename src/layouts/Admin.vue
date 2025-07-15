<script setup lang="ts">
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