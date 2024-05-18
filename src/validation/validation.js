import { errorHandler} from '../utils/errorHandler.js';

const validate = (schema, request) => {
    const result = schema.validate(request, {
        abortEarly: false
    })
    if (result.error){
        throw new errorHandler(400, false ,result.error.message);
    } else {
        return result.value
    }
}

export { validate }