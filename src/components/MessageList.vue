<template>
  <v-row>
    <v-col cols="12">
      <div  light class="wrapper">
        <v-card
          class="message"
          :class="username === m.username ? `selfMessage` : ``"
          v-for="(m, key) in messages"
          :key="key"
        >
          <div>
            <div class="messageNameTime">
              <div class="messageName">
                <b>{{ m.username }}</b>
              </div>
              <div class="messsageTime">
                <i>{{ getMessageTime(m.timestamp) }}</i>
              </div>
            </div>
            <div class="messageText">{{ m.text }}</div>
          </div>
        </v-card>
        <div id="lastMessage"></div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";

export default {
  name: "MessageList",
  props: ["messages"],
  computed: {
    ...mapGetters(["username"])
  },
  methods: {
    getMessageTime(timestamp) {
      return moment(timestamp).fromNow();
    }
  }
};
</script>

<style scoped>
.messageName,
.messsageTime {
  width: 49%;
  display: inline-block;
}

.messageName {
  color: #ff6e42;
}
.message {
  font-size: 16px;
  background-color: #fff;
  padding-left: 5px;
  margin: 0.6rem;
  border-radius: 5px;
  width: 80%;
  color: black;
}

.selfMessage {
  background-color: #eee;
  align-self: flex-end;
}

.messsageTime {
  text-align: right;
  padding-right: 5px;
  font-size: 12px;
  color: #312964;
}

.wrapper {
  display: flex;
  flex-direction: column;
}
</style>
