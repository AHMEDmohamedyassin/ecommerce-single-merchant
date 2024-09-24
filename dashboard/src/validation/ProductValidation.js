import { z } from "zod";


export const CreateProductValidation = z.object({
    size : z.array(z.string()).optional()
})