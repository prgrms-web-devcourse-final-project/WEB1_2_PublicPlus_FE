export interface Review {
  id: string;
  userName: string;
  userImage: string;
  content: string;
  date: string;
}

export interface ExternalReview {
  title: string;
  content: string;
  thumbnail: string;
  url: string;
  date: string;
}
