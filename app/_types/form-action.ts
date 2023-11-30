export type FormAction<T> = (_: T, formData: FormData) => Promise<T>
