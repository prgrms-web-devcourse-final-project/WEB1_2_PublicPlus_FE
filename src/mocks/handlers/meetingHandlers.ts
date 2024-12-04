import { http, HttpResponse } from 'msw';
import { Meeting } from '../data/meetingBoardData';
import { db } from '../db/meetingDb';

export const meetingHandlers = [
  http.post('/api/meetingboard', async ({ request }) => {
    const meetingData = (await request.json()) as Omit<Meeting, 'mbId'>;
    const newMeeting = db.createMeeting(meetingData);
    return HttpResponse.json(newMeeting, { status: 201 });
  }),

  http.get('/api/meetingboard', () => {
    const meetings = db.getMeetings();
    return HttpResponse.json(meetings);
  }),

  http.get('/api/meetingboard/:mbId', ({ params }) => {
    const { mbId } = params;
    const meeting = db.getMeetingById(Number(mbId));

    if (!meeting) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(meeting);
  }),

  http.put('/api/meetingboard/:mbId', async ({ params, request }) => {
    const { mbId } = params;
    const data = (await request.json()) as Partial<Meeting>;
    const updatedMeeting = db.updateMeeting(Number(mbId), data);

    if (!updatedMeeting) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(updatedMeeting);
  }),

  http.delete('/api/meetingboard/:mbId', ({ params }) => {
    const { mbId } = params;
    const success = db.deleteMeeting(Number(mbId));

    if (!success) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json({ message: 'Meeting deleted successfully' });
  })
];
