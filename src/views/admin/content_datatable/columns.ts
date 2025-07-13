import type {
  ColumnDef
} from '@tanstack/vue-table'
import { ArrowUpDown } from 'lucide-vue-next'
import { h } from 'vue'
import { Button } from '@/components/ui/button'
//import { Checkbox } from '@/components/ui/checkbox'
//import DropdownAction from './DataTableDropdown.vue'

export interface Content {
  id: number
  title: string
  slug: string
  sortOrder: number
}

export const columns: ColumnDef<Content>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => h('a', { href: '/admin/content/' + row.original.id }, row.getValue('title')),
  },
  {
    accessorKey: 'slug',
    header: () => h('div', { }, 'Slug'),
    cell: ({ row }) => {
      return h('div', { }, row.getValue('slug'))
    },
  },
  {
    accessorKey: 'sortOrder',
    header: ({ column }) => {
      return h(Button, {
        variant: 'ghost',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      }, () => ['Sort Order', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
    },
    cell: ({ row }) => h('div', { }, row.getValue('sortOrder')),
  },
  // {
  //   id: 'actions',
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const content = row.original

  //     return h(DropdownAction, {
  //       content,
  //       onExpand: row.toggleExpanded,
  //     })
  //   },
  // },
]
