<template>
    <div @click="navigate(href)">
        <slot></slot>
    </div>
</template>

<script>

export default {
  name: 'index',
  props: {
      href: String
  },
  methods: {
      navigate: function(href) {
        if (href !== this.$router.history.current.path) {
            this.$router.push(href);
        }
      }
  }
}
</script>

<style lang="scss" scoped>
    div {
        display: inline-block;
        cursor: pointer;
    }
</style>>
</style>
