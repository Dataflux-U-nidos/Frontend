import { z } from "zod";

export const itemSchema = z.object({
    key: z.string(),
    description: z.string(),
});
export const itemsSchema = z.array(itemSchema);
