<template>
  <div class="pt-0">
    <AppBar @save-list="saveList" />
    <v-text-field
      class="col"
      label="Title"
      type="text"
      background-color="transparent"
      v-model="list.title"
      full-width
      solo
      flat
      single-line
      hide-details
    >
    </v-text-field>
    <v-alert
      v-show="!list.items.length"
      border="left"
      color="#9F98FD"
      tile
      text
      type="info"
      >No items</v-alert
    >
    <v-list class="pt-0 mb-11">
      <draggable
        v-model="list.items"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
        handle=".handle"
      >
        <transition-group name="list">
          <ListItem
            class="list"
            v-for="(item, i) of list.items"
            :item="item"
            :key="item.id"
            :completed="item.completed"
            :index="i"
            @remove-item="removeItem"
          />
        </transition-group>
      </draggable>
    </v-list>
    <v-app-bar
      class="mx-auto"
      fixed
      bottom
      flat
      color="transparent"
      max-width="1200px"
      height="70px"
    >
      <ListItemInput @add-item="addItem" />
    </v-app-bar>
  </div>
</template>

<script>
import ListItemInput from "@/components/ListItemInput";
import ListItem from "@/components/ListItem";
import AppBar from "@/components/AppBar";
import draggable from "vuedraggable";
import firebase from "firebase/app";
import { db } from "../main";

export default {
  mixins: {
    data() {
      return {
        list: {
          items: [],
          title: "",
          id: null,
        },
      };
    },
  },
  computed: {
    list() {
      return (
        this.$store.getters.getListById(this.$route.params.id) || this.$data
      );
    },
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
        delay: 100,
      };
    },
  },
  data() {
    return {
      items: [],
      title: "",
      id: null,
    };
  },
  methods: {
    addItem(item) {
      this.list.items.push(item);
    },
    removeItem(id) {
      this.list.items = this.list.items.filter((t) => t.id !== id);
    },
    saveList() {
      if (!this.list.items.length) {
        this.$router.push("/");
      } else if (this.$route.name === "ListEditing") {
        const list = {
          id: this.id || Date.now(),
          title: this.title || "Shopping list",
          items: this.items,
        };

        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            let uid = user.uid;

            db.collection("users")
              .doc(uid)
              .collection("lists")
              .doc(`${list.id}`)
              .set(list, { merge: true });
          }
        });

        // this.$store.dispatch("createList", list);
        this.$router.push("/");
      } else {
        let uid = firebase.auth().currentUser.uid;

        db.collection("users")
          .doc(uid)
          .collection("lists")
          .doc(`${this.list.id}`)
          .set({
            id: this.list.id,
            items: this.list.items,
            title: this.list.title,
          });
        this.$router.push("/");
      }
    },
  },
  components: {
    ListItemInput,
    ListItem,
    draggable,
    AppBar,
  },
};
</script>

<style lang="scss" scoped>
.list:first-child {
  border-top: 1px solid rgba($color: #000000, $alpha: 0.16);
}
.list-enter-active {
  transition: all 0.5s;
}
.list-leave-active {
  transition: all 0.2s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
}
.add-move {
  transition: 1s;
}
</style>