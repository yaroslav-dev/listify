<template>
  <v-text-field
    @keydown.enter.prevent="addItem"
    @focus="scrollDown"
    @click="scrollDown"
    id="add-item"
    type="text"
    label="Add item"
    color="#9F98FD"
    hide-details
    solo
    flat
    rounded
    outlined
    v-model="title"
  >
    <v-btn
      class="mr-n3"
      @click="addItem"
      slot="append"
      color="#9F98FD"
      icon
      rounded
      text
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-text-field>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      id: null,
      completed: false,
    };
  },
  methods: {
    addItem() {
      if (this.title.trim()) {
        const item = {
          id: Date.now(),
          title: this.title,
          completed: false,
        };
        this.$emit("add-item", item);
        this.title = "";
       setTimeout(function() {
          window.scrollTo({
            top: 9999,
            behavior: 'smooth'
          });
        }, 0);
      }
    },
    scrollDown() {
      setTimeout(function() {
        window.scrollTo({
          top: 9999,
          behavior: 'smooth'
        });
      }, 1000);
    }
  },
};
</script>

<style lang="scss" scoped>
</style>