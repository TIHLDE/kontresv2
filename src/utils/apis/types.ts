export type DetailedReservation = {
    id: string;
    bookable_item_detail: DetailedItem;
    start_time: string;
    end_time: string;
    state: ReservationState;
    description: string;
    author_detail: User;
    group_detail: BaseGroup | undefined;
    serves_alcohol?: boolean;
    sober_watch?: User;
} & BaseModel;

export type ReservationState = 'CONFIRMED' | 'PENDING' | 'CANCELLED';

export type PostReservation = {
    bookable_item: string;
    group: string;
} & Omit<
    DetailedReservation,
    | 'state'
    | 'id'
    | 'author_detail'
    | 'bookable_item_detail'
    | 'group_detail'
    | keyof BaseModel
>;

/**
 * Base type for all models.
 */
export type BaseModel = {
    created_at: string;
    updated_at: string;
};

export type DetailedItem = {
    id: string;
    name: string;
    description: string;
    allows_alcohol: boolean;
    image?: string;
} & BaseModel;

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
} & BaseModel;

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
} & BaseModel;

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
} & BaseModel;

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

export type UserPermissions = {
    permissions: Record<PermissionApp, Permissions>;
};

export enum PermissionApp {
    CHEATSHEET = 'cheatsheet',
    EVENT = 'event',
    GROUP = 'group',
    JOBPOST = 'jobpost',
    NEWS = 'news',
    PAGE = 'page',
    STRIKE = 'strike',
    USER = 'user',
    GALLERY = 'album',
    PICTURE = 'picture',
    FORMS = 'form',
    TODDEL = 'toddel',
    BANNERS = 'banner',
}

export interface Permissions {
    write: boolean;
    read: boolean;
    write_all?: boolean;
    destroy?: boolean;
}

export interface PaginationResponse<T> {
    count: number;
    next: number | null;
    previous: number | null;
    results: Array<T>;
}

export const AdminPermissions = [PermissionApp.USER];

export const validationTags = {
    reservations: 'reservations',
    bookableItems: 'bookableItems',
};
