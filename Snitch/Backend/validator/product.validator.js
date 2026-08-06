import {body,validationResult} from "express-validator"

function validateRequest(request,response,next){
    const errors = validationResult(request)
    
    if(!errors.isEmpty()){
        return response.status(400).json({
            message: "Validation Error",
            success: false,
            errors: errors.array()
        })
    }
    next()
}

export const createProductValidator = [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("priceAmount").isFloat({gt:0}).withMessage("Price amount must be a positive number"),
    body("priceCurrency").optional().isString().withMessage("Price currency must be a string"),
    validateRequest
]