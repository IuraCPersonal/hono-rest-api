import createMessageObjectSchema from "~/utils/create-message-object";
import * as HttpStatusPhrases from "~/utils/http-status-phrases";

export const notFoundSchema = createMessageObjectSchema(HttpStatusPhrases.NOT_FOUND);
