import { Meeting } from '../data/meetingBoardData';

class Database {
  private meetings: Meeting[] = [];

  createMeeting(meeting: Omit<Meeting, 'mbId'>) {
    const newMeeting = {
      ...meeting,
      mbId: this.meetings.length + 1,
      mbHost: 'user1',
      createdAt: new Date().toISOString()
    };
    this.meetings.push(newMeeting);
    return newMeeting;
  }

  getMeetings() {
    return [...this.meetings].sort((a, b) => b.mbId - a.mbId);
  }

  getMeetingById(mbId: number) {
    return this.meetings.find(m => m.mbId === mbId);
  }

  updateMeeting(mbId: number, data: Partial<Meeting>) {
    const index = this.meetings.findIndex(m => m.mbId === mbId);
    if (index === -1) return null;

    this.meetings[index] = { ...this.meetings[index], ...data };
    return this.meetings[index];
  }

  deleteMeeting(mbId: number) {
    const index = this.meetings.findIndex(m => m.mbId === mbId);
    if (index === -1) return false;

    this.meetings.splice(index, 1);
    return true;
  }
}

export const db = new Database();
