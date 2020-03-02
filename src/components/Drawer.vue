<template>
  <v-navigation-drawer :value="isOpen" app clipped class="pl-5">
    <v-list dense>
      <v-list-item-title>Online Users ({{!usersOnline ? 0 : usersOnline.length}}) </v-list-item-title>
      <v-list-item v-for="(user, key) in usersOnline" :key="key">
        <v-list-item-content>
          <v-list-item-title>{{user.username}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      usersOnline: [],
      text: '',
    };
  },
  apollo: {
    $subscribe: {
      users: {
        query: require("../graphql/fetchOnlineUsersSubscription.gql"),
        result({ data, loading, error }) {
          if (error) {
            this.text = "Error loading online";
          }
          if (loading) {
            this.text = "Loading...";
          }
          this.usersOnline = data.user_online;
        }
      }
    }
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  }
};
</script>
