<template>
  <div class="resume-render" :id="`resume-${id}`" ref="target" />
</template>

<script lang="ts" setup>
import { useSmartPages } from "@ohmycv/vue-smart-pages";
import type { ResumeStyles } from "~/composables/stores/style";
import { setPreviewPreparation } from '~/utils/preview';

const props = defineProps<{
  id: string | number;
  markdown: string;
  css?: string;
  styles: ResumeStyles;
}>();

const constant = useConstant();
const target = ref<HTMLElement>();

const size = computed(() => ({
  height: constant.PAPER.sizeToPx(props.styles.paper, "h"),
  width: constant.PAPER.SIZES[props.styles.paper].w
}));
const margins = computed(() => ({
  top: props.styles.marginV,
  bottom: Math.max(props.styles.marginV - 10, constant.RENDER.PRINT_BOTTOM),
  left: props.styles.marginH,
  right: props.styles.marginH
}));
const markdown = ref(props.markdown);
watchDebounced(() => props.markdown, value => { markdown.value = value; }, { debounce: 300, maxWait: 1000 });
const html = computed(() => markdownService.renderResume(markdown.value));

const { render } = useSmartPages(target, html, size, margins, {
  beforeRender: async () => {
    // Wait for the fonts to be loaded
    await googleFontsService.presetObserver(props.styles);
  },
  watchThrottledOptions: {
    throttle: 200
  }
});

watchThrottled(
  () => [
    props.styles.lineHeight,
    props.styles.paragraphSpace,
    props.styles.fontSize,
    props.css,
    props.styles.fontCJK,
    props.styles.fontEN
  ],
  render,
  {
    throttle: 200,
    leading: false
  }
);

defineExpose({
  render
});
onMounted(() => {
  if (props.id === 'preview') setPreviewPreparation(async () => {
    markdown.value = props.markdown;
    await nextTick();
    await render();
  });
});
onBeforeUnmount(() => { if (props.id === 'preview') setPreviewPreparation(); });
</script>
