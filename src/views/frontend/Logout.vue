<script setup lang="ts">
import router from '../../router'
import ApiService from '../../services/api-service'

ApiService.logout()
router.push("/")

</script>