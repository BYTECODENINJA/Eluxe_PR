import {db} from "@/server/db";
import {initTRPC} from "@trpc/server";
import {ZodError} from "zod";
import superjson from "superjson";

export const createTRPCContext = async(opts: {headers: Headers}) => {
    return {
        db,
        headers: opts.headers
    }
}

const t = initTRPC.context<typeof createTRPCContext>().create({
    transformer: superjson,
    errorFormatter({shape, error}) {
        return {
            ...shape,
            data: {
                ...shape.data,
                zodError: error.cause instanceof ZodError? error.cause.flatten() : null
            }
        }
    },
})

export const createCallerFactory = t.createCallerFactory;
export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;