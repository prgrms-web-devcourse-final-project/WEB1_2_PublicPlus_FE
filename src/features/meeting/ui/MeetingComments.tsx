import { Button } from '@/components/common/Button/Button';
import { Card } from '@/components/common/Cards/Card';
import { useAuthStore } from '@/entities/User/model/store/authStore';

// 테스트용 임시 데이터
const MOCK_COMMENTS = [
  {
    id: '1',
    author: '테스트 사용자1',
    authorId: 'user1',
    content: '첫 번째 댓글입니다.',
    createdAt: '2024-02-20',
    likes: 5,
    views: 10,
    tags: ['태그1', '태그2']
  },
  {
    id: '2',
    author: '테스트 사용자2',
    authorId: 'user2',
    content: '두 번째 댓글입니다.',
    createdAt: '2024-02-21',
    likes: 3,
    views: 8,
    tags: ['태그3']
  }
];

export function MeetingComments() {
  const { userId } = useAuthStore();
  const isLoading = false; // 테스트를 위해 false로 고정
  const comments = MOCK_COMMENTS; // 임시 데이터 사용

  return (
    <div className="space-y-4 p-4">
      <div className="space-y-4">
        {isLoading ? (
          <p className="text-center text-gray-500">댓글을 불러오는 중...</p>
        ) : (
          comments?.map(comment => (
            <div
              key={comment.id}
              className="space-y-2">
              <Card className="p-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">{comment.author}</p>
                      <p className="text-sm text-gray-600">{comment.content}</p>
                    </div>
                    {userId && userId === comment.authorId && (
                      <div className="flex gap-2">
                        <Button
                          variant="line"
                          size="sm"
                          onclickHandler={e => {
                            e.stopPropagation();
                          }}>
                          수정
                        </Button>
                        <Button
                          variant="gray"
                          size="sm"
                          onclickHandler={e => {
                            e.stopPropagation();
                          }}>
                          삭제
                        </Button>
                      </div>
                    )}
                  </div>
                  {comment.tags && comment.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {comment.tags.map(tag => (
                        <span
                          key={tag}
                          className="rounded-full bg-gray-100 px-2 py-1 text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2 text-sm text-gray-500">
                    <span>작성일: {comment.createdAt}</span>
                  </div>
                </div>
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
