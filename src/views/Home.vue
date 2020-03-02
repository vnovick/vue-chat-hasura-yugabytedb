<template>
  <ApolloMutation
    :mutation="require('../graphql/AddUserMutation.gql')"
    :variables="{
    username
  }"
    @done="login"
  >
    <template v-slot="{ mutate, loading, error }">
      <v-container fluid fill-height class="background">
        <v-row align="center">
          <v-col>
            <v-card light raised shaped class="mx-auto loginCard" max-width="600">
              <v-form v-model="valid" @submit="validateUserAndInsert(mutate)">
                <v-card-title>Realtime Chat App</v-card-title>
                <v-card-text>
                  <div class="formGroupWrapper">
                    <div>
                      <v-text-field
                        type="text"
                        placeholder="Enter your username"
                        v-model="username"
                      />
                      <v-btn
                        color="primary"
                        :disabled="loading || username === ''"
                        ripple
                        @click.prevent="validateUserAndInsert(mutate)"
                      >{{loading ? "Please wait ..." : "Get Started"}}</v-btn>

                      <!-- <div class="input-group-append groupAppend">
                    <button
                      class="btn btn-outline-secondary"
                      type="submit"
                      v-on:click.prevent="validateUserAndInsert(mutate)"
                      :disabled="loading || username === ''"
                    >{{ loading ? "Please wait ..." : "Get Started" }}</button>
                      </div>-->
                      <div
                        v-if="error"
                        class="alert alert-danger addPaddTop"
                      >{{error && "Error occurred. Probably user already exists"}}</div>
                    </div>
                  </div>
                </v-card-text>
              </v-form>
            </v-card>
          </v-col>
          <v-col cols="7">
            <v-card raised light>
              <v-container>
                <v-img :src="require('../assets/chats.png')"></v-img>
              </v-container>
            </v-card>
            <!-- <HelloWorld /> -->
          </v-col>
        </v-row>
      </v-container>
    </template>
  </ApolloMutation>
</template>

<script>
import { mapActions } from "vuex";
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  data: () => ({
    valid: false,
    username: ""
  }),
  methods: {
    ...mapActions(["insertUser"]),
    validateUserAndInsert(insertUser) {
      if (this.username.match(/^[a-z0-9_-]{3,15}$/g)) {
        insertUser()
      } else {
        alert(
          "Invalid username. Spaces and special characters not allowed. Max 15 charachters. Please try again"
        );
        this.username = "";
      }
    },
    login({ data }) {
      const userId = data.insert_user.returning[0].id;
      this.insertUser({
        userId,
        username: this.username
      });
      this.$router.push({
        path: `/chat/${userId}`,
        query: {
          username: this.username
        }
      });
    }
  },
  components: {
    // HelloWorld
  }
};
</script>

<style scoped>
.background {
  background-image: url("https://images.unsplash.com/photo-1519337718347-749509f114a8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80");
  background-size: cover;
  background-blend-mode: darken;
  height: 100vh;
}
.headerWrapper {
  padding: 10px 0;
  padding-left: 15px;
  min-height: 15vh;
}
.headerDescription {
  font-size: 20px;
  color: #fff;
  font-family: "Roboto";
  font-weight: 700;
  z-index: 100;
  position: relative;
}
.loginCard {
  color: black;
}
</style>
