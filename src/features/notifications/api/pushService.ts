import axios from 'axios';
// DTO 타입 정의
export interface NotificationCreateDTO {
  title: string;
  message: string;
}

export interface TopicSendDTO {
  topic: string;
  title: string;
  message: string;
}

export interface TopicSendTypeDTO {
  topicId?: number;
  type: NotificationMessageType;
}

// 알림 메시지 타입 Enum
export enum NotificationMessageType {
  CHAT_NEW_MESSAGE = 'CHAT_NEW_MESSAGE',
  ACTIVITY_REMINDER = 'ACTIVITY_REMINDER',
  ACTIVITY_INVITED = 'ACTIVITY_INVITED',
  ACTIVITY_PARTICIPATE = 'ACTIVITY_PARTICIPATE'
}

// 알림 응답 타입
export interface NotificationResponse {
  notificationId: number;
  title: string;
  message: string;
}

class PushService {
  // 단일 알림 조회
  async getNotification(notificationId: number): Promise<NotificationResponse> {
    const response = await axios.get<NotificationResponse>(
      `/api/push/${notificationId}`
    );
    return response.data;
  }

  // 알림 목록 조회
  async getNotifications(): Promise<NotificationResponse[]> {
    const response =
      await axios.get<NotificationResponse[]>('/api/notifications');
    return response.data;
  }

  // 알림 생성
  async createNotification(
    data: NotificationCreateDTO
  ): Promise<NotificationResponse> {
    const response = await axios.post<NotificationResponse>(
      '/api/notifications',
      data
    );
    return response.data;
  }

  // 토픽 구독
  async subscribeToTopic(topic: string): Promise<void> {
    await axios.post(`/api/notification/subscription/${topic}`, {
      topic
    });
  }

  // 토픽 전체 메시지 발송
  async sendTopicMessage(data: TopicSendDTO): Promise<void> {
    await axios.post('/api/notification/topic/message', data);
  }

  // 특정 타입의 토픽 메시지 발송
  async sendTopicTypeMessage(data: TopicSendTypeDTO): Promise<void> {
    await axios.post('/api/notification', data);
  }

  // 알림 업데이트
  async updateNotification(
    notificationId: number
  ): Promise<NotificationResponse> {
    const response = await axios.put<NotificationResponse>(
      `/api/notification/${notificationId}`,
      {
        isRead: true
      }
    );
    return response.data;
  }
}

export const pushService = new PushService();
