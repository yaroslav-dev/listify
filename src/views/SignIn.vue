<template>
  <div
    class="d-flex flex-column justify-center align-stretch"
    style="height: 70vh"
  >
    <app-bar @save-list="$router.push('/')" />
    <v-sheet class="mx-auto" style="width: 100%; max-width: 500px">
      <v-form class="pa-4 mt-6">
        <v-btn
          color="rgba(0, 0, 0, 0.64)"
          class="mb-4"
          outlined
          text
          block
          large
          @click="signInWithGoogle"
          ><span
            ><v-img
              src="../assets/Google__G__Logo.svg.webp"
              width="23"
              height="23"
              class="mr-3"
            ></v-img></span
          >Sign in with google</v-btn
        >
      </v-form>
    </v-sheet>
  </div>
</template>

<script>
import firebase from "firebase/app";
import { db } from "../main";
import AppBar from "../components/AppBar.vue";

export default {
  components: { AppBar },
  methods: {
    async signInWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();

      await firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = credential.accessToken;
          // The signed-in user info.
          let user = result.user;
          // ...

          db.collection("users")
            .doc(user.uid)
            .set({
              name: user.displayName,
              email: user.email,
              photo: user.photoURL,
            });

          this.$store.dispatch("user/setUserData", {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
          });
          this.$router.replace({ name: "Home" });
        });
    },
  },
};
</script>