<template>
  <div>
    <v-list-item class="pa-0 item">
      <v-sheet class="sheet d-flex px-3" width="100%">
        <v-checkbox
          class="pa-0 ma-0 pl-1 align-self-center"
          hide-details
          v-model="item.completed"
          :checked="item.completed == true"
          :ripple="false"
        ></v-checkbox>
        <v-text-field
          background-color="transparent"
          @focus="rmButton = true"
          @blur.prevent="blurDelay"
          :disabled="item.completed"
          :class="
            (item.completed && 'text-decoration-line-through') ||
            'text-decoration-none'
          "
          class=""
          type="text"
          full-width
          solo
          flat
          single-line
          hide-details
          v-model="item.title"
        ></v-text-field>
        <v-spacer></v-spacer>
        <transition name="fade">
          <v-btn
            v-if="rmButton || item.completed"
            @click="$emit('remove-item', item.id)"
            class="align-self-center"
            icon
            text
          >
            <v-icon color="#9F98FD" class="remove-icon"
              >mdi-trash-can-outline</v-icon
            >
          </v-btn>
        </transition>
        <v-icon
          @touchstart="vibro"
          ref="dragIcon"
          class="drag-icon material-icons handle"
          >drag_indicator</v-icon
        >
      </v-sheet>
    </v-list-item>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rmButton: false,
      completed: false,
    };
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    index: Number,
  },
  methods: {
    blurDelay() {
      const TM = setTimeout(() => {
        this.$data.rmButton = false;
      }, 100);
    },
    vibro() {
      setTimeout(() => {
        window.navigator.vibrate(50);
      }, 100);
    },
  },
};
</script>

<style lang="scss" scoped>
.sheet {
  border-bottom: 1px solid rgba($color: #000000, $alpha: 0.16);
}
.drag-icon {
  font-size: 27px;
  cursor: grab;
  user-select: none;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>