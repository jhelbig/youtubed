import { Component, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { YoutubedService } from './youtubed.service';
import { Video, FormatsEntity } from './video';
import { VideoInfoComponent } from './video-info/video-info.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private _url: string;
  @Input() set url(value: string){
    if (value != "") {
      this._url = value
      this.getInfo()
    }
  }
  get url(){ return this._url }
  public info: Video;
  public formats: FormatsEntity[];
  public bestFormat: string;
  public title: string;
  public gettingInfo: boolean = false;

  constructor(private youtubed: YoutubedService) {
  }


  private getInfo(){
    if (this._url == ""){
      return false
    }
    this.info = null;
    this.formats = null;
    this.bestFormat = ""
    this.gettingInfo = true;
    this.youtubed.getInfo(this._url).subscribe((data: Video) => {
      this.info = data;
      this.formats = data.formats;
      this.bestFormat = data.format_id;
      this.title = data.title;
      this.gettingInfo = false;
    });
  }
}
