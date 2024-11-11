import * as z from "zod"
import { CompleteGroup, RelatedGroupModel, CompleteReservation, RelatedReservationModel } from "./index"

export const BookableItemModel = z.object({
  itemSlug: z.string(),
  name: z.string(),
  description: z.string(),
  allowsAlcohol: z.boolean(),
  groupSlug: z.string(),
})

export interface CompleteBookableItem extends z.infer<typeof BookableItemModel> {
  group: CompleteGroup
  reservation: CompleteReservation[]
}

/**
 * RelatedBookableItemModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedBookableItemModel: z.ZodSchema<CompleteBookableItem> = z.lazy(() => BookableItemModel.extend({
  group: RelatedGroupModel,
  reservation: RelatedReservationModel.array(),
}))
