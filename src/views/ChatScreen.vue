<template>
  <v-container class="chatWrapper" height="100%">
    <h3>Welcome, {{ username }}</h3>
    <ChatBox />
    <TextBox />
  </v-container>
</template>

<script>
import TextBox from "@/components/TextBox.vue";
import ChatBox from "@/components/ChatBox.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ChatScreen",
  computed: {
    ...mapGetters(["username", "userId"])
  },
  methods: {
    ...mapActions(["insertUser"])
  },
  created() {
    if (!this.username && !this.userId) {
      if (this.$route.query.username && this.$route.params.userId) {
        this.insertUser({
          userId: this.$route.params.userId,
          username: this.$route.query.username
        });
      } else {
        this.$router.push({
          path: `/`
        });
      }
    }
    setInterval(async () => {
      console.log("update online")
      await this.$apollo.mutate({
        mutation: require("../graphql/emitOnlineEvent.gql"),
        variables: {
          userId: this.userId
        }
      });
    }, 3000);
  },
  components: {
    ChatBox,
    TextBox
  }
};
</script>
