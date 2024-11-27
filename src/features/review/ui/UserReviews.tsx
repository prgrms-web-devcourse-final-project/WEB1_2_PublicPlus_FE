'use client';
import { useState } from 'react';

interface Review {
  id: number;
  facilityName: string;
  content: string;
  rating: number;
  date: string;
}

export const UserReviews = () => {
  const [reviews] = useState<Review[]>([
    {
      id: 1,
      facilityName: '강남 체육관',
      content: '시설이 깨끗하고 좋았습니다. 다음에도 이용하고 싶어요.',
      rating: 5,
      date: '2024.02.28'
    }
  ]);

  if (reviews.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center text-sm text-gray-500">
        작성한 후기가 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-sm">내가 작성한 후기</h2>
      {reviews.map(review => (
        <div
          key={review.id}
          className="rounded-2xl bg-white p-6 shadow-md">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-base font-medium">{review.facilityName}</h3>
            <div className="flex items-center space-x-1">
              {[...Array(review.rating)].map((_, index) => (
                <span
                  key={index}
                  className="text-yellow-400">
                  ★
                </span>
              ))}
            </div>
          </div>
          <p className="mb-2 text-sm text-gray-600">{review.content}</p>
          <p className="text-xs text-gray-400">{review.date}</p>
        </div>
      ))}
    </div>
  );
};
