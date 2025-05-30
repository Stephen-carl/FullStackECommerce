import _ from "lodash";
import { Request, Response,NextFunction } from "express";
import { z, ZodError} from 'zod'

export function validationData(schema: z.ZodObject<any, any>) {
    return(req: Request, res: Response, next:NextFunction) => {
        try {
            schema.parse(req.body);
            // take the request body, only pick the keys as in the schema and go to the next function
            req.cleanBody = _.pick(req.body, Object.keys(schema.shape));
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = error.errors.map((issue: any) => ({
                    message: `${issue.path.join('.')} is ${issue.message}`,
                }));
                res.status(400).json({ error: 'Invalid data', details : errorMessages});
            } else {
                res.status(500).json({ error: 'Interval Server Error'});
            }
        }
    }
}

// module.exports = validationData