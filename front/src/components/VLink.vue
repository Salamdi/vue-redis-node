<template>
  <a
    v-bind:href="href"
    v-bind:class="{ disabled: isActive }"
    v-on:click="go"
    class="nav-link"
  >
    <slot></slot>
  </a>
</template>

<script>
  import routes from '../routes'

  export default {
    props: {
      href: {
        type:String,
        required: true 
      }
    },
    computed: {
      isActive () {
        if (this.href === '/addData') {
          return this.href === this.$root.currentRoute || this.$root.currentRoute === '/'
        }
        return this.href === this.$root.currentRoute
      }
    },
    methods: {
      go (event) {
        event.preventDefault()
        this.$root.currentRoute = this.href
        window.history.pushState(
          null,
          routes[this.href],
          this.href
        )
      }
    }
  }
</script>
