<template>
  <v-form @submit="sendMessage">
    <TypingIndicator :userId="userId" :username="username" />
    <v-row align="center">
      <v-col cols="9">
        <v-text-field type="text" placeholder="Type your message" v-model="text" />
      </v-col>
      <v-col cols="3">
        <v-btn primary @click.prevent="sendMessage">Send</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import TypingIndicator from "@/components/TypingIndicator";
import { mapGetters } from "vuex";

export default {
  name: "TextBox",
  computed: {
    ...mapGetters(["username", "userId"])
  },
  data() {
    return {
      text: ""
    };
  },
  watch: {
    text: function(value) {
      const textLength = value.length;
      if ((textLength !== 0 && textLength % 5 === 0) || textLength === 1) {
        this.emitTypingEvent();
      }
    }
  },
  methods: {
    emitTypingEvent() {
      if (this.userId) {
        this.$apollo.mutate({
          mutation: require("../graphql/emitTypingEvent.gql"),
          variables: {
            userId: this.userId
          }
        });
      }
    },
    sendMessage() {
      if (this.text === "") return;
      this.$apollo.mutate({
        mutation: require("../graphql/insertMessage.gql"),
        variables: {
          message: {
            username: this.username,
            text: this.text
          }
        }
      });
      this.text = "";
    }
  },
  components: {
    TypingIndicator
  }
};
</script>

<style scoped></style>
