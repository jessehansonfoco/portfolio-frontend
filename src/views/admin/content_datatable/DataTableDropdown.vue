<script setup lang="ts">
import { MoreHorizontal } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

defineProps<{
  content: {
    id: number
    slug: string
  }
}>()

function getEditUrl(id: number) {
  return '/admin/content/' + id;
}

function getViewUrl(slug: string) {
  return '/content/' + slug;
}

</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-8 h-8 p-0">
        <span class="sr-only">Open menu</span>
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem>
        <a :href="getEditUrl(content.id)">Edit</a>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <a :href="getViewUrl(content.slug)">View</a>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>