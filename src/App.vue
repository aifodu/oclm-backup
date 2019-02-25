<template>
  <v-app :dark="darkMode">
    <v-toolbar dark color="pink darken-3" extended prominent>
      <v-btn icon to="/">
        <v-icon>home</v-icon>
      </v-btn>
      <v-toolbar-title slot="extension" class="headline text-uppercase">
        <span>OCLM Assignment</span>
        <span class="font-weight-light">&nbsp;Backup</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat to="backup">
        <span class="mr-2">Backup</span>
      </v-btn>
      <v-btn flat to="restore">
        <span class="mr-2">Restore</span>
      </v-btn>
      <v-btn icon @click.prevent="switchModes">
        <v-icon>invert_colors</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      darkMode: false
    };
  },
  methods: {
    switchModes() {
      this.darkMode = !this.darkMode;
    }
  }
};
</script>

<style>
</style>
