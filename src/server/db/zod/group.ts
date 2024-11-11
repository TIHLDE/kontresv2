import * as z from "zod"
import { CompleteBookableItem, RelatedBookableItemModel } from "./index"

export const GroupModel = z.object({
  groupSlug: z.string(),
  name: z.string(),
})

export interface CompleteGroup extends z.infer<typeof GroupModel> {
  BookableItems: CompleteBookableItem[]
}

/**
 * RelatedGroupModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedGroupModel: z.ZodSchema<CompleteGroup> = z.lazy(() => GroupModel.extend({
  BookableItems: RelatedBookableItemModel.array(),
}))
