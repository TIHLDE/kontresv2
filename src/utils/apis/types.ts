export type DetailedReservation = {
    id: string;
    bookable_item: string;
    start_time: string;
    end_time: string;
    state: 'CONFIRMED' | 'PENDING' | 'CANCELLED';
    description: string;
    created_at: string;
    author: string;
};

export type Reservations = {
    reservations: DetailedReservation[];
};

export type ErrorMessage = {
    message: string;
};

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

export type Memberships = {
    count: number;
    next: null;
    previous: null;
    results: Membership[];
};

export type Membership = {
    group: Group;
    membership_type: string;
    created_at: string;
    expiration_date: string;
    user: GroupUser;
};

export type Group = {
    name: string;
    slug: string;
    type: string;
    viewer_is_member: boolean;
    image: string;
    image_alt: string | null;
};

export type GroupUser = {
    user_id: string;
    first_name: string;
    last_name: string;
    email: string;
    gender: number;
    image: string;
    study: Study;
    studyyear: StudyYear;
};

export type Study = {
    group: Group;
    membership_type: string;
    created_at: string;
    expiration_date: string | null;
};

export type StudyYear = {
    group: Group;
    membership_type: string;
    created_at: string;
    expiration_date: string | null;
};
