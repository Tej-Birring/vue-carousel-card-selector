<template>
  <TopLevel
    :data-items="inputData"
    @selectItem="onItemSelected"
    :disabled="disabled"
  >
    <template v-slot:default="slotProps">
      <h2>{{ slotProps.item.name }}</h2>
      <p
        v-for="(author, idx) in slotProps.item.authors"
        :key="`${slotProps.item.name}-${idx}`"
      >
        {{ author }}
      </p>
    </template>
    <template v-slot:noResults> Nothing available to select. </template>
  </TopLevel>
  <div class="result">
    <h3>Selected Item</h3>
    <p>{{ selectedItem ?? "— Nothing selected! —" }}</p>
  </div>
</template>

<script setup>
import TopLevel from "@/components/TopLevel.vue";
import { ref } from "vue";

const inputData = [
  // <= Test data, you can change this, but make sure it remains an array!
  {
    name: "The Go Programming Language",
    authors: ["Alan A. A. Donovan", "Brian W. Kernighan"],
  },
  {
    name: "JavaScript: The Definitive Guide",
    authors: ["David Flanagan"],
  },
  {
    name: "Data: Modeling Made Simple",
    authors: ["Steve Hoberman"],
  },
  { name: "Game Programming Patterns", authors: ["Robert Nystrom"] },
  {
    name: "Designing Software Architectures: A Practical Approach",
    authors: ["Humberto Cervantes", "Rick Kazman"],
  },
];
const disabled = ref(false); // <= Change this to toggle enable/disable state of the component

const selectedItem = ref(null);
const onItemSelected = (val) => {
  selectedItem.value = val;
};
</script>

<style>
.result {
  margin-top: 4rem;
  text-align: center;
}
</style>
