<template>
  <UiTooltipProvider :delay-duration="0">
    <UiTooltip>
      <UiTooltipTrigger as-child>
        <UiButton
          class="gap-x-1.5 w-full h-8 justify-start"
          variant="ghost"
          size="sm"
          :disabled="exporting"
          @click="exportPDF"
        >
          <span i-mdi:file-pdf text-base />
          {{ $t("toolbar.file.export_pdf.title") }}
        </UiButton>
      </UiTooltipTrigger>
      <UiTooltipContent side="bottom" class="w-54 p-0 rounded border-destructive/60">
        <UiAlert variant="destructive" class="border-none rounded-none">
          <UiAlertTitle>
            {{ $t("toolbar.file.export_pdf.alert.title") }}
          </UiAlertTitle>
          <UiAlertDescription v-html="$t('toolbar.file.export_pdf.alert.content')" />
        </UiAlert>
      </UiTooltipContent>
    </UiTooltip>
  </UiTooltipProvider>

  <UiButton
    class="gap-x-1.5 w-full h-8 justify-start"
    variant="ghost"
    size="sm"
    @click="exportMd"
  >
    <span i-ri:markdown-fill text-base />
    {{ $t("toolbar.file.export_md") }}
  </UiButton>
</template>

<script lang="ts" setup>
import { downloadFile } from "@renovamen/utils";
import { preparePreview } from '~/utils/preview';

const { data } = useDataStore();
const saveName = computed(() => data.resumeName.trim().replace(/\s+/g, "_"));

const exporting = ref(false);

// Export as PDF
const exportPDF = async () => {
  if (exporting.value) return;
  exporting.value = true;
  const title = document.title;
  try {
    await preparePreview();
    await document.fonts.ready;
    await nextTick();
    await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
    document.title = saveName.value || "Resume";
    window.print();
  } finally {
    document.title = title;
    exporting.value = false;
  }
};

// Export as Markdown
const exportMd = () => {
  downloadFile(`${saveName.value}.md`, data.markdown);
};
</script>
