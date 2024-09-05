import { photoInterface } from "./photo.interface";

export interface ArtistTableInterFace {
  id: number;
  key: string;
  photo:photoInterface;
  firstName: string;
  lastName: string;
  albums?: string;
  musics?: string;
  description?: string;
  biography?: string;
  url?:any;
}
