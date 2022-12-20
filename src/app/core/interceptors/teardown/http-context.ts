import {HttpContextToken} from "@angular/common/http";

export const FULL_RESPONSE = new HttpContextToken<boolean>(() => false);
export const SNACKBAR_OPTIONS = new HttpContextToken<SnackbarOptions>(() => ({
  successMessage: null,
  errorMessage: null
}));


interface SnackbarOptions {
  successMessage?: string | null;
  errorMessage?: string | null;
}
