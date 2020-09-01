import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Image } from '../models/interfaces/Image'

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private http: HttpClient) {}

  getImages() {
    return this.http
      .get<any>('assets/data/photos.json')
      .toPromise()
      .then((res) => <Image[]>res.data)
      .then((data) => {
        return data;
      });
  }
}
