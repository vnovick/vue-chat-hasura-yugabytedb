<template>
  <v-app>
    <Drawer v-if="showDrawer" :isOpen="drawer"></Drawer>
    <v-app-bar app light clipped-left>
      <v-app-bar-nav-icon
        v-if="showDrawer"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <div class="d-flex align-center">
        <router-link to="/">
          <v-img
            alt="Yugabyte Logo"
            class="shrink mr-2"
            contain
            src="https://www.yugabyte.com/wp-content/uploads/2019/07/ybDB-Dark-v2.svg"
            transition="scale-transition"
            width="300"
          />
        </router-link>
      </div>

      <v-spacer></v-spacer>
      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Source Code</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <router-view />
    </v-content>
    <v-footer app>
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
import Drawer from "./components/Drawer";

export default {
  name: "App",
  created() {
    this.$vuetify.theme.dark = true;
  },
  data: () => ({
    drawer: true
  }),
  computed: {
    showDrawer() {
      return this.$route.name === "chat";
    }
  },
  components: {
    Drawer
  }
};
</script>
