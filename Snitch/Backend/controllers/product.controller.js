import productModel from "../models/product.model.js"
import { uploadFile } from "../services/storage.service.js"

export async function createProduct(request, response) {
    const { title, description, priceAmount, priceCurrency } = request.body
    const seller = request.user

    const images = await Promise.all(request.files.map(async (file) => {
        return await uploadFile(file.buffer, file.originalname)
    }))

    const product = new productModel({
        title,
        description,
        price: { amount: priceAmount, currency: priceCurrency || "INR" },
        images: images,
        seller: seller._id
    })

    await product.save()

    response.status(201).json({
        message: "Product created Successfully",
        success: true,
        product
    })
}

export async function viewProducts(request, response) {
    const { _id } = request.user
    // console.log(_id);


    const products = await productModel.find({ seller: _id })

    // console.log(products);
    response.status(200).json({
        message: "Products fetched successfully",
        success: true,
        products
    })


}

export async function viewAllProducts(request, response) {
    const productData = await productModel.find()

    return response.status(200).json({
        message: "Products fetched Successfully",
        success: true,
        productData
    })
}
