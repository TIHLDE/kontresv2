// import { User } from '@/types/User';

// import { type BaseGroup, GroupType } from '@/utils/apis/types';
// import { cn } from '@/utils/cn';

// import { Avatar, AvatarFallback, AvatarImage } from './avatar';
// import { Card } from './card';
// import { HoverCard, HoverCardContent, HoverCardTrigger } from './hover-card';
// import {
//     ArrowUpLeftFromCircle,
//     BadgeInfo,
//     MailIcon,
//     UserRound,
//     Wrench,
// } from 'lucide-react';
// import Link from 'next/link';

// interface ProfilePillProps
//     extends Omit<React.HTMLProps<HTMLDivElement>, 'ref'> {
//     label?: string;
//     image?: string;
// }

// interface UserProfilePillProps extends React.HTMLProps<HTMLDivElement> {
//     firstName: string;
//     image: string;
//     gender: number;
//     lastName: string;
//     userId: string;
//     tool: string;
//     email: string;
//     showHoverCard?: boolean;
// }

// const genderMap: Record<number, string> = {
//     1: 'Mann',
//     2: 'Kvinne',
//     3: 'Annet',
// };

// const groupTypeMap: Record<GroupType, string> = {
//     BOARD: 'Styre',
//     COMMITTEE: 'Komité',
//     INTERESTGROUP: 'Interessegruppe',
//     OTHER: 'Annet',
//     STUDY: 'Studie',
//     STUDYYEAR: 'Kull',
//     SUBGROUP: 'Undergruppe',
//     TIHLDE: 'TIHLDE',
// };

// export const UserProfilePill = ({
//     firstName,
//     image,
//     gender,
//     lastName,
//     userId,
//     email,
//     showHoverCard = true,
//     tool,
//     ...props
// }: UserProfilePillProps) => {
//     return (
//         <HoverCard>
//             <HoverCardTrigger>
//                 <ProfileButton {...props} label={firstName} image={image} />
//             </HoverCardTrigger>
//             {showHoverCard && (
//                 <HoverCardContent className="w-80">
//                     <div className="flex justify-between space-x-4">
//                         <Avatar>
//                             <AvatarImage
//                                 src={image}
//                                 alt={'Profilbilde'}
//                                 className="rounded-lg"
//                             />
//                             <AvatarFallback>
//                                 <UserRound className="text-foreground" />
//                             </AvatarFallback>
//                         </Avatar>
//                         <div className="space-y-1 w-full [&_svg]:mr-2 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:opacity-70">
//                             <h4 className="text-sm font-semibold">
//                                 {firstName + ' ' + lastName}
//                             </h4>
//                             <Link
//                                 className="hover:underline text-muted-foreground"
//                                 href={`https://tihlde.org/profil/${userId}/`}
//                             >
//                                 @{userId}
//                             </Link>
//                             <BioSection
//                                 className="pt-2"
//                                 items={[
//                                     {
//                                         icon: <MailIcon />,
//                                         label: (
//                                             <Link
//                                                 className="hover:underline"
//                                                 href={`mailto:${email}`}
//                                             >
//                                                 {email}
//                                             </Link>
//                                         ),
//                                     },
//                                     {
//                                         icon: <ArrowUpLeftFromCircle />,
//                                         label: genderMap[gender ?? 2],
//                                     },
//                                     ...(tool
//                                         ? [
//                                               {
//                                                   icon: <Wrench />,
//                                                   label: tool ?? 'Ikke oppgitt',
//                                               },
//                                           ]
//                                         : []),
//                                 ]}
//                             />
//                         </div>
//                     </div>
//                 </HoverCardContent>
//             )}
//         </HoverCard>
//     );
// };

// interface GroupProfilePillProps extends React.HTMLProps<HTMLDivElement> {
//     group?: BaseGroup;
// }

// export const GroupProfilePill = ({
//     group,
//     ...props
// }: GroupProfilePillProps) => {
//     return (
//         <HoverCard>
//             <HoverCardTrigger>
//                 <ProfileButton
//                     {...props}
//                     label={group?.name}
//                     image={group?.image ?? ''}
//                 />
//             </HoverCardTrigger>
//             <HoverCardContent className="w-80 border-2 border-[#1d458b]">
//                 <div className="flex justify-between space-x-4">
//                     <Avatar>
//                         <AvatarImage
//                             src={group?.image ?? ''}
//                             alt={'Profilbilde'}
//                             className="rounded-lg"
//                         />
//                         <AvatarFallback>
//                             <UserRound className="text-foreground" />
//                         </AvatarFallback>
//                     </Avatar>
//                     <div className="space-y-1 w-full [&_svg]:mr-2 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:opacity-70">
//                         <h4 className="text-sm font-semibold">{group?.name}</h4>
//                         <BioSection
//                             className="pt-2"
//                             items={[
//                                 {
//                                     icon: <BadgeInfo />,
//                                     label: groupTypeMap[
//                                         group?.type ?? GroupType.OTHER
//                                     ],
//                                 },
//                             ]}
//                         />
//                     </div>
//                 </div>
//             </HoverCardContent>
//         </HoverCard>
//     );
// };

// interface BioSectionProps extends React.HTMLProps<HTMLDivElement> {
//     items?: { icon: React.ReactNode; label: React.ReactNode }[];
// }

// const BioSection = ({ items, className, ...props }: BioSectionProps) => {
//     return (
//         <div className={cn('flex flex-col space-y-1', className)}>
//             {items?.map((item, index) => (
//                 <div key={index} className="flex items-center">
//                     {item.icon}
//                     <p className="text-sm">{item.label}</p>
//                 </div>
//             ))}
//         </div>
//     );
// };

// const ProfileButton = ({
//     label,
//     image,
//     className,
//     ...props
// }: ProfilePillProps) => {
//     return (
//         <Card
//             {...props}
//             className={cn(
//                 'flex p-1 pr-3 items-center gap-3 cursor-pointer',
//                 className,
//             )}
//         >
//             <Avatar className="rounded-lg">
//                 <AvatarImage src={image} alt="profilbilde" />
//                 <AvatarFallback>
//                     <UserRound className="text-foreground" />
//                 </AvatarFallback>
//             </Avatar>
//             <span>{label}</span>
//         </Card>
//     );
// };
