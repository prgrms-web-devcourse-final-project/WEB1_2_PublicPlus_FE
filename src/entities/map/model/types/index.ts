export interface KakaoMapProps {
  latitude: number | undefined;
  longitude: number | undefined;
  name: string | undefined;
  options?: {
    level?: number;
    draggable?: boolean;
    zoomable?: boolean;
  };
}

export type CategoryGroupCode = 'CS2' | 'FD6' | 'SW8' | 'PK6' | 'CE7';

export interface PlaceType {
  place_name: string;
  category_name: string;
  x: string;
  y: string;
  distance: string;
}

export interface KakaoLatLng {
  getLat(): number;
  getLng(): number;
}

export interface KakaoMarker {
  setMap(map: KakaoMapType | null): void;
  getPosition(): KakaoLatLng;
}

export interface KakaoInfoWindow {
  open(map: KakaoMapType, marker: KakaoMarker): void;
  close(): void;
}

export interface KakaoCircle {
  setMap(map: KakaoMapType | null): void;
}

export interface KakaoMapType {
  setCenter(latlng: KakaoLatLng): void;
  getCenter(): KakaoLatLng;
  setLevel(level: number): void;
  getLevel(): number;
  setMapTypeId(mapTypeId: number): void;
  getMapTypeId(): number;
  setDraggable(draggable: boolean): void;
  setZoomable(zoomable: boolean): void;
}

export interface MapOptions {
  center: KakaoLatLng;
  level: number;
}
export interface KakaoPlaces {
  categorySearch(
    categoryCode: CategoryGroupCode,
    callback: (result: PlaceType[], status: string) => void,
    options: {
      location: KakaoLatLng;
      radius: number;
      sort: number;
    }
  ): void;
}

export interface KakaoMapsService {
  Places: new () => KakaoPlaces;
  Status: {
    OK: string;
  };
  SortBy: {
    DISTANCE: number;
  };
}

export interface KakaoType {
  maps: {
    Map: new (container: HTMLElement, options: MapOptions) => KakaoMapType;
    LatLng: new (lat: number, lng: number) => KakaoLatLng;
    Marker: new (options: {
      position: KakaoLatLng;
      map: KakaoMapType | null;
    }) => KakaoMarker;
    InfoWindow: new (options: { content: string }) => KakaoInfoWindow;
    Circle: new (options: {
      center: KakaoLatLng;
      radius: number;
      strokeWeight: number;
      strokeColor: string;
      strokeOpacity: number;
      strokeStyle: string;
      fillColor: string;
      fillOpacity: number;
    }) => KakaoCircle;
    event: {
      addListener: (
        target: KakaoMarker,
        type: string,
        handler: () => void
      ) => void;
    };
    services: KakaoMapsService;
    load: (callback: () => void) => void;
  };
}
