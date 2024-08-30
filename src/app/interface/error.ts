export type TErrorSource = {
  path: string | number;
  message: string;
}[];

export type TGGenericErrorResponse = {
  message: string;
  errorMessage: string;
};
