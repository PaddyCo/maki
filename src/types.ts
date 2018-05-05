export enum Status {
  Initializing = "INITIALIZING",
  Caching = "CACHING",
  Ok = "OK",
}

export interface IInformation {
  status: Status;
  cacheProgress: number;
}
