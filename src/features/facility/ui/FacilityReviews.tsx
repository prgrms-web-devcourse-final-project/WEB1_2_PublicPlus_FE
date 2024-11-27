import { FacilityDetailsResponseDTO } from '@/api/generated';
import { Card } from '@/components/common/Cards/Card';

interface FacilityReviewsProps {
  facility: FacilityDetailsResponseDTO;
}

export const FacilityReviews = ({ facility }: FacilityReviewsProps) => {
  return (
    <div className="space-y-4 p-4 pb-20">
      {facility.reviews?.map(review => (
        <Card
          key={review.id}
          title={review.userName}
          content={review.content}
          imageSrc={review.userImage}
          imageAlt={review.content}
          className="cursor-pointer hover:bg-gray-50"
          footer={review.date}
        />
      ))}
    </div>
  );
};
