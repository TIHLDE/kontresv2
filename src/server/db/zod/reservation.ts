import * as z from "zod"
import { ReservationState } from "@prisma/client"
import { CompleteBookableItem, RelatedBookableItemModel } from "./index"

export const ReservationModel = z.object({
  reservationId: z.string(),
  authorId: z.string(),
  bookableItemSlug: z.string(),
  startTime: z.date(),
  endTime: z.date(),
  status: z.nativeEnum(ReservationState),
  description: z.string(),
  acceptedRules: z.boolean(),
  groupId: z.string(),
  servesAlcohol: z.boolean(),
  soberWatch: z.string().nullish(),
  approvedById: z.string().nullish(),
})

export interface CompleteReservation extends z.infer<typeof ReservationModel> {
  bookableItem: CompleteBookableItem
}

/**
 * RelatedReservationModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedReservationModel: z.ZodSchema<CompleteReservation> = z.lazy(() => ReservationModel.extend({
  bookableItem: RelatedBookableItemModel,
}))
