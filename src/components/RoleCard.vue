<template>
  <div>
    Most played role : {{gamesNumberInRole}} matches as {{roleName}}
  </div>
</template>

<script>
export default {
  name: 'myComponent',
  props: [
    'roleName',
    'gamesNumberInRole',
    'totalGamesNumber'
  ],
  created () {
  },
  methods: {
  },
  data () {
    return {
    }
  },
  computed: {
  }
}
</script>

<style scoped>
</style>
