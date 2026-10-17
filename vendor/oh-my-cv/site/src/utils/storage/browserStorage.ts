import localForage from "localforage";

// Keep resume data separate from other Hello Me tools, using localStorage only.
export const browserStorage = localForage.createInstance({
  name: "hello_me_resume_builder",
  storeName: "resumes",
  driver: localForage.LOCALSTORAGE
});
