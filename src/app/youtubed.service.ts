import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Video } from './video';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubedService {

  constructor(private http: HttpClient) {
    
  }

  getInfo(url): Observable<Video> {
    let req_params = new HttpParams().set("url", url);
    return this.http.get<Video>(environment.youtubed_api + '/info', {headers: {}, params: req_params});
  }

  download(url: string, format: string, title: string, ext: string): Observable<any> {
    let req_params = new HttpParams().set("url", url).set("format", format).set("filename", title+"."+ext);
    return this.http.get<Video>(environment.youtubed_api + '/download', {headers: {}, params: req_params});
  }
}
