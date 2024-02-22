export type DetailedReservation = {
  id: string;
  bookable_item: Item;
  start_time: string;
  end_time: string;
  state: 'CONFIRMED' | 'PENDING' | 'CANCELLED';
  description: string;
  created_at: string;
  author: string;
  group: string;
};

export type Item = {
  id: string;
  name: string;
  description: string;
}

export type DetailedItem = {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
};


export type User = {
  allergy: string;
  email: string;
  first_name: string;
  gender: number;
  image: string;
  last_name: string;
  tool: string;
  unread_notifications: number;
  user_id: string;
  unanswered_evaluations_count: number;
  number_of_strikes: number;
  public_event_registrations: boolean;
  accepts_event_rules: boolean;
  allows_photo_by_default: boolean;
  slack_user_id: string;
};

export interface PaginationResponse<T> {
  count: number;
  next: number | null;
  previous: number | null;
  results: Array<T>;
}

export type Membership = {
  user: User;
  membership_type: MembershipType;
  group: BaseGroup;
  created_at: string;
};

export enum MembershipType {
  LEADER = 'LEADER',
  MEMBER = 'MEMBER',
}

export type BaseGroup = {
  name: string;
  slug: string;
  type: GroupType;
  image: string | null;
  image_alt: string | null;
  viewer_is_member: boolean;
};

export enum GroupType {
  TIHLDE = 'TIHLDE',
  BOARD = 'BOARD',
  SUBGROUP = 'SUBGROUP',
  COMMITTEE = 'COMMITTEE',
  STUDYYEAR = 'STUDYYEAR',
  STUDY = 'STUDY',
  INTERESTGROUP = 'INTERESTGROUP',
  OTHER = 'OTHER',
}
