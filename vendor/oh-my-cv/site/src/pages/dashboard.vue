<template>
  <div id="dashboard-page">
    <SharedHeader />

    <div class="workspace max-w-310 mx-auto" flex="~ col" p="x-4 y-8">
      <div class="px-2 space-y-2" md="hstack justify-between">
        <h1 font-bold text-3xl>{{ $t("dashboard.my_resumes") }}</h1>
        <DashboardFile @update="refresh" />
      </div>

      <div class="px-2 mt-4 space-y-2">
        <p class="text-sm text-muted-foreground">{{ resumes.length }} resumes saved in this browser. Create separate versions for each role, or duplicate an existing resume.</p>
        <input v-model="search" type="search" aria-label="Search resumes" placeholder="Search resumes by name" class="w-full max-w-sm rounded-md border bg-background px-3 py-2 text-sm" />
        <p class="text-xs text-muted-foreground">Data stays on this device. Use Save As to back up all resumes before clearing browser data.</p>
      </div>

      <UiScrollArea class="flex-1 mt-4 px-2">
        <div class="gap-x-4 gap-y-8 pt-4" flex="~ wrap">
          <DashboardNewResume />

          <template v-if="status === 'success'">
            <DashboardResumeItem
              v-for="resume in filteredResumes"
              :key="resume.id"
              :resume="resume"
              @update="refresh"
            />
          </template>
          <template v-else>
            <div v-for="i in 4" :key="i" class="w-56 h-80">
              <UiSkeleton class="w-[210px] h-[299px] bg-secondary mx-auto" />
            </div>
          </template>
        </div>
        <p v-if="status === 'success' && search && !filteredResumes.length" class="px-2 py-6 text-muted-foreground" role="status">No resumes match your search.</p>
      </UiScrollArea>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { DbResume } from "~/utils/storage";

const search = ref("");

const {
  data: resumes,
  refresh,
  status
} = useAsyncData<DbResume[]>("resume-list", () => storageService.getResumes(), {
  server: false,
  immediate: false,
  default: () => []
});

onMounted(refresh);

const filteredResumes = computed(() => resumes.value.filter(resume =>
  resume.name.toLocaleLowerCase().includes(search.value.trim().toLocaleLowerCase())
));
</script>
