import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
      orderId: Number,
      address1: String,
      address2: String,
      billingAddress1: String,
      billingAddress2: String,
      billingCountry: String,
      billingName: String,
      billingProvince: String,
      billingZip: String,
      cardNumber: String,
      country: String,
      cvv: String,
      email: String,
      expirationMonth: String,
      expirationYear: String,
      name: String,
      nameOnCard: String,
      phone: String,
      province: String,
      sameShipping: String,
      zip: String,
      products: Object,
      customerId: String
})

var Orders = mongoose.model('Order', orderSchema);

export default Orders;