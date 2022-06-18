<template>
  <div class="d-flex flex-column justify-center align-stretch">
    <app-bar @save-list="$router.push('/')" />
    <v-sheet class="mx-auto" style="width: 100%; max-width: 500px">
      <v-overlay :value="isLoading">
        <v-progress-circular
          indeterminate
          color="#9F98FD"
          size="64"
        ></v-progress-circular>
      </v-overlay>
      <v-form ref="form" v-model="form" class="pa-4 mt-6">
        <v-text-field
          v-model="name"
          :rules="[rules.required]"
          label="Name"
        ></v-text-field>
        <v-text-field
          v-model="email"
          :rules="[rules.email]"
          label="Email"
          type="email"
        ></v-text-field>
        <v-text-field
          v-model="password"
          :rules="[rules.password, rules.length(6)]"
          counter="6"
          label="Password"
          type="password"
          style="min-height: 96px"
        ></v-text-field>
        <v-btn
          text
          @click="$refs.form.reset()"
          style="color: rgba(0, 0, 0, 0.64)"
          >Clear</v-btn
        >
        <v-btn
          :disabled="!form"
          color="#9F98FD"
          style="color: #fff"
          :loading="isLoading"
          depressed
          @click="signUpWithEmail"
          >Sign up</v-btn
        >
      </v-form>
      <v-alert v-if="errorMsg" border="top" color="red" class="ml-5 mr-5">
        {{ errorMsg }}
      </v-alert>
    </v-sheet>
  </div>
</template>

<script>
import firebase from "firebase/app";
import { db } from "../main";
import AppBar from "../components/AppBar.vue";

export default {
  data: () => ({
    name: "",
    email: "",
    password: "",
    errorMsg: "",
    form: false,
    isLoading: false,
    rules: {
      email: (v) => !!(v || "").match(/@/) || "Please enter a valid email",
      length: (len) => (v) =>
        !!(v || "").length <= len ||
        `Invalid character length, requires ${len}`,
      password: (v) =>
        !!(v || "").match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/
        ) ||
        "Password must contain uppercase, lowercase, number and special character",
      required: (v) => !!v || "This field is required",
    },
  }),
  methods: {
    async signUpWithEmail() {
      this.isLoading = true;
      try {
        let authRes = await firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password);

        await db
          .collection("users")
          .doc(authRes.user.uid)
          .set({ name: this.name, email: this.email });

        this.$store.dispatch("user/setUserData", {
          id: authRes.user.uid,
          name: this.name,
          email: this.email,
        });

        this.$router.replace({ name: "Home" });
      } catch (error) {
        this.errorMsg = "An unexpected error has occurred!";
        if (error.message) {
          this.errorMsg = error.message;
        }
      }
      this.isLoading = false;
    },
  },
  components: {
    AppBar,
  },
};
</script>

<style>
</style>