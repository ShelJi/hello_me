let prepare: (() => Promise<void>) | undefined;
export const setPreviewPreparation = (callback?: () => Promise<void>) => { prepare = callback; };
export const preparePreview = async () => { await prepare?.(); };
