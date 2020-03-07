<template>
  <div id="chatbox" class="black--text pa-5">
    <MessageList :messages="messages" />
    <div class="bottom"></div>
  </div>
</template>

<script>
import MessageList from "@/components/MessageList.vue";

export default {
  name: "ChatBox",
  data() {
    return {
      messages: []
    };
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  updated() {
    this.scrollToBottom();
  },
  methods: {
    scrollToBottom() {
      document
        .getElementById("lastMessage")
        .scrollIntoView({ behavior: "instant" });
    }
  },
  components: {
    MessageList
  },
  apollo: {
    messages: {
      query: require("../graphql/fetchMessages.gql"),
      loadingKey: "loading",
      variables() {
        return {
          last_received_id: "11111111-1111-1111-1111-111111111111",
          last_received_ts: "2018-08-21T19:58:46.987552+00:00"
        };
      },
      update(data) {
        const receivedmessages = data.message;
        return receivedmessages;
      },
      fetchPolicy: "cache-and-network",
      subscribeToMore: {
        document: require("../graphql/subscribeToNewMessages.gql"),
        updateQuery: (previousResult, { subscriptionData }) => {
          if (previousResult) {
            return {
              message: [
                ...previousResult.message,
                ...subscriptionData.data.message
              ]
            };
          }
        }
      },
      error() {
        alert("Error occured");
      }
    }
  }
};
</script>

<style scoped>
#chatbox {
  overflow: auto;
  height: calc(100vh - 250px);
  background-color: #f8f9f9;
  border-radius: 5px;
}
</style>
