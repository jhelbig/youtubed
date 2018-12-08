import { Component, OnInit, Input } from '@angular/core';
import { FormatsEntity } from '../video';
import { YoutubedService } from '../youtubed.service';

@Component({
  selector: 'app-video-info',
  templateUrl: './video-info.component.html',
  styleUrls: ['./video-info.component.css']
})
export class VideoInfoComponent implements OnInit {

  @Input() formats: FormatsEntity;
  @Input() bestFormat: string;
  @Input() loading: boolean;
  @Input() title: string;
  @Input() url: string;

  constructor(private youtubed: YoutubedService) { }

  ngOnInit() {
  }

  public download(format){
    this.youtubed.download(this.url, format.format_id, this.title, format.ext).subscribe((data: any) => {
      this.url = "";
    });
  }

}