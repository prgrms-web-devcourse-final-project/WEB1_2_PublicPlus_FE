export interface LikeState {
  isLiked: boolean;
  count: number;
}

export interface LikeStates {
  [facilityId: string]: LikeState;
}

export interface InitializeLikeParams {
  isLiked: boolean | undefined;
  count: number | undefined;
}
