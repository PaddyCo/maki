export enum Status {
  Initializing = "INITIALIZING",
  Caching = "CACHING",
  Ok = "OK",
}

export interface IInformation {
  status: Status;
  cacheProgress: number;
}


export interface IGameEntry {
  id: string;
  title: string;
  developers: string[];
  publishers: string[];
  releaseDate: string;
  clearLogoImagePath: string;
}

export interface IGame {
  id: string;
  title: string;
  developers: string[];
  publishers: string[];
  releaseDate: string;
  genres: string[];
  playModes: string[];
  region: string;
  platform: string;
  notes: string;
  clearLogoImagePath: string;
  backgroundImagePath: string;
  videoPath: string;
}

export interface IPageInfo {
  hassNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
  endCursor: string;
}

export interface IConnection<T> {
  edges: Array<IEdge<T>>;
  pageInfo: IPageInfo;
  totalCount: number;
}

export interface IEdge<T> {
  node: T;
  cursor: string;
}

export interface IQueryProps<T> {
  loading: boolean;
  error: string;
  data: T;
}
