export interface Video {
  upload_date: string;
  protocol: string;
  extractor: string;
  series?: null;
  format: string;
  format_note: string;
  chapters?: null;
  height: number;
  like_count: number;
  duration: string;
  fulltitle: string;
  player_url: string;
  quality: number;
  playlist_index?: null;
  view_count: number;
  playlist?: null;
  title: string;
  _filename: string;
  creator?: null;
  ext: string;
  id: string;
  dislike_count: number;
  average_rating: number;
  abr: number;
  uploader_url: string;
  categories?: (string)[] | null;
  season_number?: null;
  annotations?: null;
  webpage_url_basename: string;
  acodec: string;
  display_id: string;
  automatic_captions: AutomaticCaptionsOrSubtitles;
  description: string;
  tags?: (string)[] | null;
  track?: null;
  requested_subtitles?: null;
  start_time?: null;
  uploader: string;
  format_id: string;
  episode_number?: null;
  uploader_id: string;
  subtitles: AutomaticCaptionsOrSubtitles;
  http_headers: HttpHeaders;
  thumbnails?: (ThumbnailsEntity)[] | null;
  license?: null;
  artist?: null;
  url: string;
  extractor_key: string;
  vcodec: string;
  alt_title?: null;
  thumbnail: string;
  channel_id: string;
  is_live?: null;
  end_time?: null;
  webpage_url: string;
  formats?: (FormatsEntity)[] | null;
  channel_url: string;
  resolution: string;
  width: number;
  age_limit: number;
  _duration_raw: number;
  _duration_hms: string;
};

export interface AutomaticCaptionsOrSubtitles {
};

export interface HttpHeaders {
  'Accept-Charset': string;
  'Accept-Language': string;
  'Accept-Encoding': string;
  Accept: string;
  'User-Agent': string;
};

export interface ThumbnailsEntity {
  url: string;
  id: string;
};

export interface FormatsEntity {
  http_headers: HttpHeaders;
  format_note: string;
  protocol: string;
  format: string;
  url: string;
  vcodec: string;
  tbr?: number | null;
  abr?: number | null;
  player_url: string;
  downloader_options?: DownloaderOptions | null;
  ext: string;
  filesize?: number | null;
  format_id: string;
  quality?: number | null;
  acodec: string;
  container?: string | null;
  width?: number | null;
  fps?: number | null;
  height?: number | null;
  resolution?: string | null;
};

export interface DownloaderOptions {
  http_chunk_size: number;
};