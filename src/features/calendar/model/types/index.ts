import { Dispatch, SetStateAction } from 'react';

export interface SelectDateEvent {
  date: Date;
  dateStr: string;
  allDay: boolean;
  dayEl: HTMLElement;
}

export type DateSelectHandler = (info: Date | SelectDateEvent) => void;

export interface CalendarModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedDate: Date;
  onDateSelect: DateSelectHandler;
}

export interface DateSelectorProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedDate: Date;
  onDateSelect: DateSelectHandler;
}
