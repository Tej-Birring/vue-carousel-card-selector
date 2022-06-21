<template>
  <input
    type="text"
    v-model="entry"
    :placeholder="label"
    :disabled="disabled"
  />
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      entry: null,
    };
  },
  methods: {
    clearEntry() {
      this.entry = "";
      this.$emit("input", "");
    },
  },
  props: {
    label: {
      type: String,
      default: "Search",
    },
    disabled: {
      type: Boolean,
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/functions.scss";
@import "@/styles/vars.scss";

input {
  &:disabled {
    background-color: $disabled-input-background-color;
    color: $disabled-input-color;
    cursor: not-allowed;
  }
  border: 0;
  font-size: 1.55rem;
  padding: 1rem;
  @media (min-width: 769px) {
    font-size: 3rem;
    padding: 2.55rem;
  }
  background-color: $input-background-color;
  color: $input-color;
  caret-color: transparent;
  width: 80%;
  max-width: $width-full;
  @media (min-width: 769px) {
    max-width: $width-full * 2.55;
  }
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  display: block;
  border-radius: $input-border-radius;
  outline: 0;
  transition: all 0.3s ease-in;

  &:enabled:hover {
    transform: scale(1.05);
    background-color: $highlighted-input-background-color;
    color: $highlighted-input-color;
    @include shadow;
  }
}
</style>