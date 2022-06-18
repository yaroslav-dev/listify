<template>
  <div>
    <AppBar />
    <v-card
      class="col-md-6 my-2 d-flex"
      v-for="(list, i) in lists"
      :key="list.id"
      :index="i"
      color="#f8f6ff"
      dense
      flat
    >
      <router-link
        :to="'list/' + list.id"
        class="flex-grow-1"
        style="text-decoration: none; color: rgba(0, 0, 0, 0.64)"
      >
        <v-card-title primary-title class="px-0 pl-1">
          {{ list.title }}
          <v-spacer></v-spacer>
          <span class="count">
            {{ list.items.filter((t) => t.completed).length }}/{{
              list.items.length
            }}</span
          >
        </v-card-title>
      </router-link>
      <v-card-actions class="px-0">
        <v-menu bottom left close-on-click close-on-content-click>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="deleteList(list.id)">
              <v-list-item-title class="delete">Delete</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-actions>
    </v-card>
    <div
      class="mx-auto my-auto d-flex flex-column justify-center"
      style="height: 80vh"
      v-if="!hasUser"
    >
      <h2
        class="mx-auto"
        style="
          font-weight: 500;
          color: rgba(0, 0, 0, 0.64);
          text-align: center;
          font-size: 1.6em;
        "
      >
        <router-link style="color: #9f98fd; text-decoration: none" to="/sign_in"
          >Sign in </router-link
        >to create<br />shopping lists
      </h2>
    </div>
    <div
      class="mx-auto my-auto d-flex flex-column justify-center"
      style="height: 80vh"
      v-else-if="!lists.length"
    >
      <h2
        class="mx-auto"
        style="
          font-weight: 500;
          color: rgba(0, 0, 0, 0.64);
          text-align: center;
          font-size: 1.6em;
        "
      >
        <router-link
          style="color: #9f98fd; text-decoration: none"
          to="/new_list"
          >Create</router-link
        >
        your first<br />shopping list
      </h2>
    </div>
  </div>
</template>

<script>
import AppBar from "../components/AppBar";
import firebase from "firebase/app";
import "firebase/firestore";
import { db } from "../main";

export default {
  computed: {
    lists() {
      return this.$store.getters.getLists;
    },
  },
  data() {
    return {
      dialog: false,
      listColl: [],
      hasUser: false,
    };
  },
  components: {
    AppBar,
  },
  methods: {
    deleteList(id) {
      db.collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("lists")
        .doc(id)
        .delete();
      this.$store.dispatch("deleteList", id);
    },
    async getLists() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          let listsRef = db
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .collection("lists");

          listsRef.onSnapshot((snap) => {
            this.listColl = [];
            snap.forEach((doc) => {
              var list = doc.data();
              list.id = doc.id;
              this.listColl.push(list);
            });
            this.$store.dispatch("updateLists", this.listColl);
          });
        }
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
    this.getLists();
    this.userIsSignedIn();
  },
  mounted() {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  },
};
</script>