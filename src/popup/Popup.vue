<template>
  <p>Hello vue popup</p>
</template>
<script setup>
import { PPTRService } from '../services'

onMounted(async () => {
  await PPTRService.tester()
})
</script>
