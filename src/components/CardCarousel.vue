<template>
  <div class="carousel">
    <div class="carousel__list" v-if="items && items.length > 0">
      <div
        class="carousel__item"
        :class="{ active: idx === 0, hoverable: idx !== 0, disabled: disabled }"
        v-for="(item, idx) in items"
        :key="`item-${idx}`"
        @click="selectItem(idx)"
      >
        <div class="carousel__item__content">
          <slot v-bind:props="item" />
        </div>
      </div>
    </div>
    <div v-else class="noResultsDisplay">
      <slot name="noResults" />
    </div>
  </div>
</template>


<script>
import gsap from "gsap";

export default {
  emits: ["selectItem"],
  props: {
    dataItems: {
      type: Array,
    },
    disabled: {
      type: Boolean,
    },
  },
  data() {
    return {
      items: [],
      tween: null,
      blurAmountPx: 8,
      busy: false,
    };
  },
  methods: {
    map(value, inMin, inMax, outMin, outMax) {
      return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
    },
    // puts the selected item on top
    selectItem(idx) {
      if (this.disabled) return;
      if (idx === 0) return;
      this.busy = true;

      // useful variables for animation, do not delete!
      //   const nItems = this.items.length;
      //   const pos = (idx) => this.positionFromIdx(idx);
      //   const absPos = (idx) => Math.abs(pos(idx));

      gsap
        .to(".carousel__item", {
          filter: "blur(5px) grayscale(50%)",
          duration: 0.3,
          ease: "sine.in",
        })
        .then(() => {
          return gsap.to(".carousel__item", {
            x: 0,
            y: 0,
            transform: `scale(1)`,
            duration: 0.5,
            stagger: 0.15,
            ease: "expo.out",
          });
        })
        .then(() => {
          // do array change
          const thisItem = this.items[idx];
          const otherItems = this.items.filter((item, _idx) => _idx != idx);
          this.items = [thisItem, ...otherItems];
          // not busy
          this.busy = false;
        });
    },
    // gets position in accordance to index
    positionFromIdx(idx) {
      if (idx === 0) {
        return 0;
      }
      if (idx % 2 === 0) {
        // if even
        return idx / 2;
      } else {
        // else if odd
        // if last
        // if (idx === this.items.length - 1) {
        //   return (idx + 1) / 2;
        // }
        // if not last
        return -((idx + 1) / 2);
      }
    },
    animate() {
      this.busy = true;
      const nItems = this.items.length;
      const pos = (idx) => this.positionFromIdx(idx);
      const absPos = (idx) => Math.abs(pos(idx));
      // animate
      gsap
        .to(".carousel__item", {
          opacity: 1,
          transform: (idx) =>
            `translateX(${pos(idx) * (50 / nItems)}vw) scale(${this.map(
              nItems - absPos(idx),
              0,
              nItems,
              0.5,
              1
            )})`,
          zIndex: (idx) => nItems - absPos(idx),
          filter: (idx) =>
            `blur(${absPos(idx)}px) grayscale(${absPos(idx) * 10}%)`,
          stagger: 0.15,
          ease: "power1.inOut",
        })
        .then(() => {
          this.busy = false;
        });
    },
  },
  mounted() {
    this.animate();
  },
  updated() {
    if (this?.items && Array.isArray(this.items) && this.items.length > 0) {
      const retItem = this.items[0];
      this.$emit("selectItem", retItem);
    }
    this.animate();
  },
  watch: {
    dataItems: {
      immediate: true,
      deep: true,
      handler(val) {
        if (!val || !Array.isArray(val)) return;
        // set data
        this.items = Array.from(val);
      },
    },
  },
};
</script>
    

<style scoped lang="scss">
@import "@/styles/functions.scss";
@import "@/styles/vars.scss";
.noResultsDisplay {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  animation: 1s fade-in;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.carousel {
  display: flex;
  align-items: flex-start;
  height: $height-mob + (2 * $card-padding);
  @media (min-width: 769px) {
    height: $height-full + (2 * $card-padding);
  }

  &__list {
    display: flex;
    list-style: none;
    position: relative;
    width: 100%;
    justify-content: center;
    perspective: 300px;
  }

  &__item {
    &.disabled {
      cursor: not-allowed;
      background-color: $disabled-card-background-color;
      &.hoverable:hover {
        outline: none;
      }
      &.active {
        outline: none;
      }
    }
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    cursor: pointer;
    opacity: 0;
    transition: background-color 0.3s ease-in, outline-width 0.15s ease-in;
    &.hoverable:hover {
      outline: $highlighted-card-outline-width $highlighted-card-outline-color
        solid;
      outline-offset: -2px;
    }
    &.active {
      outline: $highlighted-card-outline-width $highlighted-card-outline-color
        solid;
      outline-offset: -2px;
    }
    display: block;
    height: $height_mob;
    width: $width_mob;
    @media (max-width: 768px) {
      .title {
        font-size: 1.25rem;
      }
    }
    @media (min-width: 769px) {
      height: $height_full;
      width: $width_full;
    }
    padding: $card-padding;
    overflow: hidden;
    border-radius: $card-border-radius;
    position: absolute;
    background: $card-background-color;
    @include shadow;
  }
}
</style>