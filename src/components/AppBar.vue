<template>
  <div>
    <v-app-bar app elevate-on-scroll color="#fff">
      <v-app-bar-nav-icon color="#9F98FD" @click.stop="drawer = !drawer">
        <v-btn
          icon
          v-if="$route.path != '/'"
          color="#9F98FD"
          @click.stop="saveList"
        >
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-app-bar-nav-icon>
      <v-app-bar-title class="logo">Listify </v-app-bar-title>
      <v-progress-linear
        :active="isLoading"
        :indeterminate="isLoading"
        absolute
        top
        color="#9F98FD"
      ></v-progress-linear>
      <v-spacer></v-spacer>
      <v-btn
        v-if="
          $route.path != '/' &&
          $route.path != '/sign_up' &&
          $route.path != '/sign_in'
        "
        depressed
        text
        rounded
        color="#9F98FD"
        @click="saveList"
        >done</v-btn
      >
      <v-btn
        v-if="$route.path == '/' && hasUser"
        to="/new_list"
        text
        rounded
        color="#9F98FD"
        >new list</v-btn
      >
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar size="63" color="#f0f0f0">
            <v-avatar v-if="photo" size="avatarSize" color="red">
              <img :src="photo" :alt="user" />
            </v-avatar>
            <span v-else-if="user" class="text-h5 mx-auto">{{
              user.charAt(0)
            }}</span>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content v-if="user">
            <v-list-item-title class="text-h6">{{ user }}</v-list-item-title>
            <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item link v-if="!user" to="/sign_in">
          <v-list-item-title>Sign in</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="signOut" v-if="user">
          <v-list-item-title>Sign out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import firebase from "firebase/app";

export default {
  computed: {
    userId() {
      return this.$store.getters["user/getUserId"];
    },
    user() {
      return this.$store.getters["user/getUserName"];
    },
    email() {
      return this.$store.getters["user/getUserEmail"];
    },
    photo() {
      return this.$store.getters["user/getUserPhoto"];
    },
  },
  data() {
    return {
      isLoading: false,
      drawer: false,
      hasUser: false,
    };
  },
  methods: {
    saveList() {
      this.$emit("save-list");
    },
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.dispatch("user/setUserData", {
            id: null,
            name: null,
            email: null,
            photo: null,
          });
          this.$store.dispatch("updateLists", []);
          this.drawer = false;
        });
    },
    userIsSignedIn() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.hasUser = true;
        } else {
          this.hasUser = false;
        }
      });
    },
  },
  created() {
    this.userIsSignedIn();
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Krona+One&display=swap");

.logo {
  font-family: "Krona One", sans-serif;
  font-size: 1.5rem;
  /* background: linear-gradient(to top, #92b2fd, #ac7ffc); */
  color: #9f98fd;
  /* background-clip: text; */
  /* -webkit-text-fill-color: transparent; */
}
</style>