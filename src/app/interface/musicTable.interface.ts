import { photoInterface } from "./photo.interface";

export interface musicTableInterface {
  id: number;
  key: string;
  photo: photoInterface;
  playlistName?: string;
  musicName?: string;
  name?: string;
  authorName: string;
  view?: string;
  time?: string;
  music?: string;
  file?: string;
}
