<template>
  <div class="pane-container code-pane bg-background">
    <div class="editor-tabs" role="tablist" aria-label="Editing mode">
      <button v-for="tab in tabs" :id="`edit-tab-${tab.value}`" :key="tab.value"
        role="tab" :aria-selected="mode === tab.value" :aria-controls="`edit-panel-${tab.value}`"
        @click="mode = tab.value; if (mode === 'fields') fieldsOpened = true">{{ tab.label }}</button>
    </div>
    <div v-if="fieldsOpened" v-show="mode === 'fields'" id="edit-panel-fields"
      role="tabpanel" aria-labelledby="edit-tab-fields" class="fields-panel">
      <EditorFields :key="fieldsVersion" @reload="fieldsVersion++" />
    </div>
    <textarea v-if="mode !== 'fields'" :id="`edit-panel-${mode}`" :key="mode"
      :value="data[mode]" @input="setData(mode, ($event.target as HTMLTextAreaElement).value)"
      :aria-label="mode === 'markdown' ? 'Resume Markdown' : 'Resume CSS'"
      :spellcheck="false" autocapitalize="off" autocomplete="off" class="source-editor" />
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '~/composables/stores/data';
const { data, setData } = useDataStore();
const mode = ref<'markdown' | 'fields' | 'css'>('markdown');
const fieldsOpened = ref(false);
const fieldsVersion = ref(0);
const tabs = [{ value: 'markdown' as const, label: 'Markdown' },
  { value: 'fields' as const, label: 'Input fields' }, { value: 'css' as const, label: 'CSS' }];
</script>

<style scoped>
.code-pane { display: flex; flex-direction: column; min-height: 0; }
.editor-tabs { display: flex; flex-shrink: 0; border-bottom: 1px solid #8886; }
.editor-tabs button { flex: 1; padding: 10px 4px; font-size: 13px; white-space: nowrap; border-bottom: 2px solid transparent; }
.editor-tabs button[aria-selected="true"] { border-color: #2563eb; color: #60a5fa; }
.fields-panel { flex: 1; min-height: 0; overflow: auto; }
.source-editor { flex: 1; min-height: 0; width: 100%; resize: none; padding: 14px; background: transparent;
  font: 14px/1.6 Consolas, 'Courier New', monospace; tab-size: 2; overflow: auto; }
.source-editor:focus-visible { outline: 2px solid #2563eb; outline-offset: -2px; }
</style>
