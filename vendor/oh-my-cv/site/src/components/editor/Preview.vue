<template>
  <div
    class="pane-container preview-container bg-secondary"
    border="4 secondary"
  >
    <VueZoom ref="zoom" :scale="scale">
      <SharedResumeRender
        id="preview"
        :markdown="data.markdown"
        :css="data.css"
        :styles="styles"
      />
    </VueZoom>

    <div
      id="zoom-bar"
      class="hstack sticky bottom-2 ml-2 w-fit shadow-c rounded-full overflow-hidden text-primary-foreground bg-blue-500"
    >
      <button @click="scale = Math.min(2, scale * 1.1)" aria-label="Zoom in">
        <span i-lucide:zoom-in />
      </button>
      <button @click="scale = Math.max(0.2, scale / 1.1)" aria-label="Zoom out">
        <span i-lucide:zoom-out />
      </button>
      <button @click="fitWidth" aria-label="Fit width">
        <span i-fluent:arrow-autofit-width-20-filled />
      </button>
      <button @click="fitHeight" aria-label="Fit height">
        <span i-fluent:arrow-autofit-height-20-filled />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import VueZoom from "@ohmycv/vue-zoom";

const scale = ref(1);
const zoom = ref<InstanceType<typeof VueZoom>>();

const { width, height } = useElementSize(zoom);
const { styles } = useStyleStore();
const { data } = useDataStore();
const { PAPER } = useConstant();

const fitWidth = () => {
  if (width.value > 0) scale.value = Math.max(0.2, Math.min(2, width.value / PAPER.sizeToPx(styles.paper, "w")));
};

const fitHeight = () => {
  if (height.value > 0) scale.value = Math.max(0.2, Math.min(2, height.value / PAPER.sizeToPx(styles.paper, "h")));
};

watch([width, () => styles.paper], fitWidth);
</script>

<style scoped>
.preview-container { overflow: auto; position: relative; }
#zoom-bar button {
  @apply flex-center size-10 text-lg hover:bg-blue-600 focus-visible:bg-blue-600;
}
</style>
