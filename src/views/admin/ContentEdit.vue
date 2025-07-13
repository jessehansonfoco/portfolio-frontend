<script setup lang="ts">
import { ref, onMounted } from 'vue'
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
const contentId = route.params.id ?? null
const form$ = ref(null)

onMounted(async () => {
    if (contentId) {
        loading.value = true
        try {
            let rawResponse = await ContentService.getContentEdit(contentId)
            post.value = rawResponse.data
            await form$.value.load(post.value)
        } catch (err) {
            console.log('Error: ' + err.toString())
        } finally {
            loading.value = false
        }
    }
})

function hideMessage() {
  setTimeout(() => { form$.value.messageBag.clear() }, 2000)
}

</script>
<template>
  <div>

    <div class="breadcrumbs mb-10">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/admin/">Admin</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbLink href="/admin/contents">Content</BreadcrumbLink>
        <BreadcrumbSeparator />
        <BreadcrumbItem>Edit</BreadcrumbItem>
        </BreadcrumbList>
    </Breadcrumb>
    </div>

    <Vueform ref="form$" :endpoint="false" @submit="async (form$, FormData) => {
  const requestData = form$.requestData
  form$.submitting = true
  let response

  try {
    response = await ContentService.saveContent(requestData)
    post.value = response.data
    form$.load(post.value)
    form$.messageBag.append('Successfully Saved', 'success')
    hideMessage()
  } catch (error) {
    console.error('error', error)
    return
  } finally {
    form$.submitting = false
  }
}">
      <ButtonElement name="button" button-label="Save Post" :submits=true />
      <HiddenElement name="id" />
      <TextElement name="title" label="Page Title" placeholder="Page Title" />
      <DateElement name="createdAt" label="Timestamp" />
      <TextElement name="slug" label="Page URL Slug" placeholder="lowercase-and-dashes" />
      <TextElement name="category" label="Category" placeholder="Javascript" />
      <TextElement name="shortDescription" label="Short Description" placeholder="a short description" />
      <TextElement name="imageUrl" label="Image URL" placeholder="http://server/file.png" />
      <TextElement name="sortOrder" label="Sort Order" placeholder="1" :force-numbers="true" />
    
      <ListElement
          name="contentRows"
          :min="1"
          add-text="+ Add Row"
        >
          <template #default="{ index }">
            <ObjectElement :name="index">

              <StaticElement name="row_divider" tag="hr" />
              <StaticElement name="row_header"><h1>Content Row</h1></StaticElement>

              <HiddenElement name="id" />
              <HiddenElement name="sortOrder" :force-numbers="true" />
              <TextElement name="title" label="Row Title" placeholder="Row Title" />
              
              <ListElement
                name="contentRowParts"
                :min="1"
                add-text="+ Add Slot"
                >
                <template #default="{ index }">
                    <ObjectElement :name="index">
                      <StaticElement name="row_divider" tag="hr" />
                      <StaticElement name="row_header"><h1>Slot</h1></StaticElement>

                        <HiddenElement name="id" />
                        <HiddenElement name="sortOrder" :force-numbers="true" />
                        <TextElement name="title" label="Part Title" placeholder="Row Title" />
                        <SelectElement name="typeCode" label="Content Type" :items="[
                          {
                            value: 'text',
                            label: 'Text'
                          },
                          {
                            value: 'image',
                            label: 'Image'
                          }
                        ]" />
                        <EditorElement name="content" label="HTML Content" placeholder="<p>Hello</p>" :conditions="[['contentRows.*.contentRowParts.*.typeCode', 'text']]" />
                        <TextElement name="imageUrl" label="Image URL" placeholder="text" :conditions="[['contentRows.*.contentRowParts.*.typeCode', 'image']]" />
                        <TextElement name="imageLinkUrl" label="Image Link URL" placeholder="text" :conditions="[['contentRows.*.contentRowParts.*.typeCode', 'image']]" />
                    </ObjectElement>
                </template>
              </ListElement>

            </ObjectElement>
          </template>
        </ListElement>

    </Vueform>
  </div>
</template>
<style>
h1 {
  font-weight: bold;
  font-size:large;
}
</style>