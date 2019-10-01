<template>
  <div id="app">
    <Layout>
      <router-view></router-view>
    </Layout>
  </div>
</template>

<script>
import Layout from './components/Layout'

export default {
  name: 'app',
  components: {
    Layout
  }
}
</script>

<style>
</style>
