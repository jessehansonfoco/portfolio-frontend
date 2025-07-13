<script setup lang="ts">
import router from '../../router'
import ApiService from '../../services/api-service'
import { useAuthStore } from '../../stores/auth'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { h } from 'vue'
import * as z from 'zod'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = toTypedSchema(z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
}))

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema,
})

const authStore = useAuthStore()

const onSubmit = handleSubmit((user) => {

  authStore.login(user).then(
        () => {
          router.push("/admin")
        },
        (error) => {
          this.loading = false;
          this.message =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString()
        }
    )
})

</script>
<template>
  <div class="bg-white py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form @submit="onSubmit">
            <div class="flex flex-col gap-6">

              <FormField v-slot="{ componentField }" name="username" :validate-on-blur="!isFieldDirty">
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input id="email" type="email" v-bind="componentField" required />
                  </FormControl>
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="password">
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input id="password" type="password" v-bind="componentField" :validate-on-blur="!isFieldDirty" required />
                  </FormControl>
                </FormItem>
              </FormField>

              <FormItem>
                <Button type="submit" class="w-full">
                  Login
                </Button>
              </FormItem>
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
