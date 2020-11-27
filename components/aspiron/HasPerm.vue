<!-- Not Use -->
<template>
  <div v-if="visible">
    <slot></slot>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HasPerm',
  props: {
    any: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters({
      userPerms: 'auth/userPerms',
    }),
    visible () {

      console.log('USER Permission', this.userPerms)

      return this.userPerms[this.any] === 1
    }
  }
}
</script>