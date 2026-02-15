export enum TripStatus {
  Upcoming = 'upcoming',
  InProgress = 'in_progress',
  Completed = 'completed',
  Cancelled = 'cancelled',
}

export enum ReservationStatus {
  Confirmed = 'confirmed',
  Pending = 'pending',
  Cancelled = 'cancelled',
}

export interface Trip {
  id: string;
  from: string;
  to: string;
  date: string;
  time: string;
  status: TripStatus;
  driverName: string;
  driverRating: number;
  price: number;
  vehiclePlate: string;
}

export interface Reservation {
  id: string;
  referenceNo: string;
  tripId: string;
  status: ReservationStatus;
  createdAt: string;
  seatCount: number;
}

export interface UserProfile {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  department: string;
  memberSince: string;
  totalTrips: number;
  rating: number;
}

export interface QuickStat {
  label: string;
  value: string;
  icon: string;
  color: string;
}

export interface UpcomingService {
  id: string;
  status: 'active' | 'waiting' | 'completed';
  statusLabel: string;
  countdownMinutes: number;
  progress: number;
  routeFrom: string;
  routeTo: string;
  departureTime: string;
  stopName: string;
  vehiclePlate: string;
  driverName: string;
  driverInitials: string;
  driverRole: string;
  driverRating: number;
}

export interface StopInfo {
  name: string;
  distanceText: string;
}

export interface WeatherInfo {
  city: string;
  temperature: string;
  condition: string;
}

export interface LatestNotification {
  title: string;
  subtitle: string;
  timeAgo: string;
}

export type NotificationType = 'info' | 'warning' | 'success';

export interface Notification {
  id: string;
  title: string;
  body: string;
  type: NotificationType;
  timeAgo: string;
  read: boolean;
  group: 'today' | 'earlier';
}
