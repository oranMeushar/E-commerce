const catchAsync = require('../util/catchAsync');
const Order = require('../models/Order');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const Product = require('../models/Product');

const postOrder = catchAsync(async(req, res, next) => {
    const data = {...req.body}
    data.userId = req.user._id;
    await Order.create(data);
    res.status(201).json({
        status:'Succes',
        message:'Order created successfully'
    })
});
const getOrders = catchAsync(async(req, res, next) => {
    const data = await Order.find({userId:req.user._id}).select('-__v');
    res.status(200).json({
        status:'Succes',
        orders:data.length,
        data,
    })
});
const deleteOrder = catchAsync(async(req, res, next) => {
    const orderId = req.params.orderId;
    await Order.findByIdAndDelete(orderId);
    res.status(200).json({
        status:'Succes',
        message:'Order was successfully deleted'
    })
});

const getOrder = catchAsync(async(req, res, next) => {
    const orderId = req.params.orderId
    const order =  await Order.findById(orderId);
    const fileName = `details-${orderId}.pdf`;

    res.setHeader('Content-Type','application/pdf');
    res.setHeader('Content-disposition', `inline; filename=${fileName}`)

    const images = [];

    for (let i = 0; i < order.items.length; i++) {
        const image = await Product.findById(order.items[i]._id).select('image') 
        images.push(image.image.data)
    }

    let imageXpos = 300;
    let imageYpos = 140;
     
    const doc = new PDFDocument();
    doc.pipe(res);
    doc.fontSize(30)
    doc.text(`Order Details`, 230, 50,{underline:true,stroke:true})
    doc.fontSize(10)
    doc.text(`Hello ${req.user.name}`,20,20)
    doc.text(`${order.createdAt}`,430,20)
    doc.x = 100;
    doc.y = 100;

    doc.on('pageAdded', () => {
        imageXpos = 300;
        imageYpos = 100;
    });

    for (let i = 0; i < order.items.length; i++) {
        doc.fontSize(25)
        doc.fillColor('#8f4f4f').text(` ${order.items[i].name}`,{lineGap:15})
        doc.fontSize(10)
        doc.fillColor('#046582').fontSize(17).text(`Type: `,{continued:true})
        .fillColor('black').fontSize(15).text(`${order.items[i].type}`,{continued:false, lineGap:8})

        doc.fillColor('#046582').fontSize(17).text(`Category: `,{continued:true})
        .fillColor('black').fontSize(15).text(`${order.items[i].category}`,{continued:false, lineGap:8})

        doc.fillColor('#046582').fontSize(17).text(`Price: `,{continued:true})
        .fillColor('black').fontSize(15).text(`$${order.items[i].price}`,{continued:false, lineGap:8})

        doc.fillColor('#046582').fontSize(17).text(`Quantity: `,{continued:true})
        .fillColor('black').fontSize(15).text(`${order.items[i].amount}`,{continued:false, lineGap:60})
        doc.image(images[i],imageXpos,imageYpos,{width:100, height:100});
        imageYpos = imageYpos + 200
    }
    doc.fillColor('red').fontSize(25).text(`Total Price: `,{continued:true})
        .fillColor('black').fontSize(20).text(`$${order.totalPrice}`,{continued:false, lineGap:8})
    doc.fillColor('red').fontSize(25).text(`Total Items: `,{continued:true})
        .fillColor('black').fontSize(20).text(`${order.totalItems}`,{continued:false, lineGap:8})
    doc.end();
});

module.exports.postOrder = postOrder
module.exports.getOrders = getOrders
module.exports.deleteOrder = deleteOrder
module.exports.getOrder = getOrder