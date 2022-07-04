import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
      productId: Number,
      category: String,
      link: String,
      name: String,
      img: String,
      price: Number,
      originPrice: Number,
      discountPrice: Number,
      discountPercentage: Number,
      isProductNew: Boolean,
      isHot: Boolean,
      star: Number,
      isFreeShipping: Boolean,
      inStock: Boolean,
      soldBy: String,
      description: String,
      remainingInventory: Number
})

var Products = mongoose.model('Products', productSchema);

export default Products;