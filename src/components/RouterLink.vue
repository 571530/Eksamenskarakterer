<template>
    <div @click="navigate(href)">
        <span v-if="label">{{label}}</span>
        <slot></slot>
    </div>
</template>

<script>

export default {
  name: 'index',
  props: {
      label: String,
      href: String,
      value: Boolean,
  },
  methods: {
      navigate: function(href) {
        if (href !== this.$router.history.current.path) {
            this.$emit('input', true);
            setTimeout(() => {
                this.$router.push(href).then(() => {
                    this.$emit('input', false);
                });
            });

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
</style>