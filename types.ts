export interface AgendaItem {
  id: number;
  time: string;
  title: string;
  speaker?: string;
  photoUrl?: string;
  type: 'title' | 'speaker' | 'event' | 'break';
}