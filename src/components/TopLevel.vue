<template>
  <div :key="key">
    <CardCarousel :data-items="items" v-bind="$attrs" :disabled="disabled">
      <template v-slot:default="item">
        <slot v-bind:item="item.props" />
      </template>
      <template v-slot:noResults>
        <slot name="noResults" />
      </template>
    </CardCarousel>
    <SearchBar v-model="entry" :disabled="disabled" />
  </div>
</template>

<script>
import CardCarousel from "@/components/CardCarousel.vue";
import SearchBar from "@/components/SearchBar.vue";
import defaultFilterFunct from "@/helpers/defaultFilterFunct";

export default {
  components: { CardCarousel, SearchBar },
  props: {
    dataItems: {
      type: Array,
    },
    filterFunct: {
      type: Function,
    },
    disabled: {
      type: Boolean,
    },
  },
  data() {
    return {
      key: 1,
      entry: null,
    };
  },
  computed: {
    items() {
      if (!this.entry) return this.dataItems;
      else if (this.filterFunct) {
        return this.filterFunct(this.dataItems);
      } else {
        return this.defaultFilterFunct(this.dataItems, this.entry);
      }
    },
  },
  methods: {
    onResize() {
      this.key++; // chaning key more reliable than .$forceUpdate()
    },
    defaultFilterFunct,
  },
  beforeMount() {
    window.addEventListener("resize", this.onResize);
  },
};
</script>
