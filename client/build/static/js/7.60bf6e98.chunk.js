(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[7],{693:function(e,t,c){"use strict";var n=c(14),a=c(0),r=c.n(a),i=c(1);t.a=function(e){var t=e.input,c=e.tips,a=e.label,l=e.required,s=e.meta,o=s.touched,d=s.error,u=s.warning;return Object(i.jsxs)(r.a.Fragment,{children:[a&&Object(i.jsx)("label",{className:"form-label ".concat(l?"required":""),htmlFor:t.name,children:a}),Object(i.jsx)("input",Object(n.a)(Object(n.a)(Object(n.a)({},t),e),{},{id:t.name,className:"form-control"})),c&&Object(i.jsx)("div",{className:"form-text",children:c}),o&&(d&&Object(i.jsx)("div",{className:"invalid-feedback",children:d})||u&&Object(i.jsx)("span",{children:u}))]})}},706:function(e,t,c){"use strict";c.d(t,"b",(function(){return n.a})),c.d(t,"d",(function(){return s})),c.d(t,"a",(function(){return o})),c.d(t,"e",(function(){return d})),c.d(t,"c",(function(){return u}));var n=c(693),a=c(14),r=c(0),i=c.n(r),l=c(1),s=function(e){var t=e.input,c=e.label,n=e.tips,r=e.required,i=e.meta,s=i.touched,o=i.error,d=i.warning,u=e.icon;return Object(l.jsxs)("div",{className:"form-group ".concat(e.className),children:[c&&Object(l.jsx)("label",{className:"form-label ".concat(r?"required":""),htmlFor:t.name,children:c}),Object(l.jsxs)("div",{className:"input-group",children:[Object(l.jsx)("span",{className:"input-group-text",children:Object(l.jsx)(u,{})}),Object(l.jsx)("input",Object(a.a)(Object(a.a)(Object(a.a)({},t),e),{},{id:t.name,className:"form-control"})),s&&(o&&Object(l.jsx)("div",{className:"invalid-feedback",children:o})||d&&Object(l.jsx)("span",{children:d}))]}),n&&Object(l.jsx)("div",{className:"form-text",children:n})]})},o=function(e){var t=e.input,c=e.label,n=e.id,r=e.meta,i=r.touched,s=r.error,o=r.warning;return Object(l.jsxs)("div",{className:"form-check form-check-inline",children:[Object(l.jsx)("input",Object(a.a)(Object(a.a)(Object(a.a)({},t),e),{},{className:"form-check-input",type:"checkbox"})),Object(l.jsx)("label",{className:"form-check-label",htmlFor:n,children:c}),i&&(s&&Object(l.jsx)("div",{className:"invalid-feedback",children:s})||o&&Object(l.jsx)("span",{children:o}))]})},d=function(e){var t=e.input,c=e.label,n=e.placeholder,r=e.tips,s=e.required,o=e.meta,d=o.touched,u=o.error,b=o.warning;return Object(l.jsxs)(i.a.Fragment,{children:[Object(l.jsx)("label",{className:"form-label ".concat(s?"required":""),htmlFor:t.name,children:c}),Object(l.jsx)("textarea",Object(a.a)(Object(a.a)(Object(a.a)({},t),e),{},{id:t.name,className:"form-control",placeholder:n})),r&&Object(l.jsx)("div",{className:"form-text",children:r}),d&&(u&&Object(l.jsx)("div",{className:"invalid-feedback",children:u})||b&&Object(l.jsx)("span",{children:b}))]})},u=function(e){var t=e.input,c=e.onImageChange,n=e.tips,a=e.meta,r=a.touched,s=a.error,o=a.warning;return Object(l.jsx)(i.a.Fragment,{children:Object(l.jsx)("div",{className:"input-group mb-3",children:Object(l.jsxs)("div",{className:"form-file form-file-sm",children:[Object(l.jsx)("input",{type:"file",name:"formFile",className:"form-file-input",id:t.name,accept:"image/x-png,image/jpeg",onChange:function(e){return function(e,t,c){e.preventDefault();var n=e.target.files[0];if(n)if(!1===/\.(jpe?g|png)$/i.test(null===n||void 0===n?void 0:n.name))t.onChange(null),c(null),alert("Please select image file only!");else{var a=n.size/1024/1024;a>5?alert("Photo size must be less or equal to 5MB. Your photo size is ".concat(a)):(t.onChange(n),c(n))}else t.onChange(null),c(null)}(e,t,c)},required:!0}),Object(l.jsxs)("label",{className:"form-file-label",htmlFor:t.name,children:[Object(l.jsx)("span",{className:"form-file-text",children:"Choose file..."}),Object(l.jsx)("span",{className:"form-file-button",children:"Browse"})]}),n&&Object(l.jsx)("div",{className:"form-text",children:n}),r&&(s&&Object(l.jsx)("div",{className:"invalid-feedback",children:s})||o&&Object(l.jsx)("span",{children:o}))]})})})}},780:function(e,t,c){"use strict";c.r(t),c.d(t,"default",(function(){return O}));var n=c(40),a=c.n(n),r=c(14),i=c(76),l=c(13),s=c(0),o=c.n(s),d=c(94),u=c(48),b=c(174),j=c.n(b),m=c(205),p=c(706),h=c(1);function O(e){var t=Object(u.g)(),c=o.a.useState(!1),n=Object(l.a)(c,2),s=(n[0],n[1]),b=o.a.useState(!0),O=Object(l.a)(b,2),x=O[0],f=O[1],g=o.a.useState(""),v=Object(l.a)(g,2),N=v[0],y=v[1],k=o.a.useState(""),P=Object(l.a)(k,2),S=P[0],q=P[1],w=function(){},F=function(){var e=Object(i.a)(a.a.mark((function e(c){var n,i,l,o,d;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=c.originPrice,i=c.price,l=c.productImage,o={discountPrice:n-i,discountPercentage:Math.round((n-i)/n*100),img:"../../images/products/".concat(l.name),link:"product/detail",star:5},e.prev=2,e.next=5,j.a.post("http://localhost:5000/products/addProduct",Object(r.a)(Object(r.a)({},c),o));case 5:(d=e.sent)&&201===d.status&&(s(!0),q("Product has been Added Successfully"),t.push("/")),e.next=14;break;case 9:e.prev=9,e.t0=e.catch(2),f(!1),s(!1),y("Could not Create Product. Kindly try again");case 14:case"end":return e.stop()}}),e,null,[[2,9]])})));return function(t){return e.apply(this,arguments)}}();return Object(h.jsxs)("div",{className:"container mt-3",children:[Object(h.jsx)("h4",{children:"Admin Inventory"}),Object(h.jsx)(d.b,{onSubmit:F,subscription:{submitting:x},initialValues:Object(r.a)({},{isProductNew:!1,isHot:!1,isFreeShipping:!1,inStock:!1}),render:function(e){var t=e.handleSubmit;return Object(h.jsx)("form",{onSubmit:t,children:Object(h.jsxs)("div",{className:"row",children:[Object(h.jsx)(d.a,{name:"category",type:"text",label:"Category",component:p.b,placeholder:"Enter Type Of Category",required:!0}),Object(h.jsx)(d.a,{name:"name",type:"text",label:"Product Name",component:p.b,placeholder:"Enter Product Name",required:!0}),Object(h.jsx)(d.a,{name:"price",type:"number",label:"Product Price",component:p.b,placeholder:"Product Price",required:!0}),Object(h.jsx)(d.a,{name:"productQuantity",type:"number",label:"Product Quntity",component:p.b,placeholder:"Product Quntity",required:!0}),Object(h.jsx)(d.a,{name:"soldBy",type:"text",label:"Sold By",component:p.b,placeholder:"Sold By",required:!0}),Object(h.jsx)(d.a,{id:"inStock",label:"In Stock",name:"inStock",type:"checkbox",component:p.a}),Object(h.jsx)(d.a,{name:"description",type:"text",label:"Product Description:",component:p.b,placeholder:"Product Description:",required:!0}),Object(h.jsx)(d.a,{name:"originPrice",type:"number",label:"Original Price",component:p.b,placeholder:"Original Price",required:!0}),Object(h.jsxs)("div",{className:"col-md-12",children:[Object(h.jsx)(d.a,{id:"newStock",label:"New stock",name:"isProductNew",type:"checkbox",component:p.a}),Object(h.jsx)(d.a,{id:"trending",label:"Trenidng",name:"isHot",type:"checkbox",component:p.a}),Object(h.jsx)(d.a,{id:"freeShopping",label:"Free Shipping",name:"isFreeShipping",type:"checkbox",component:p.a}),Object(h.jsx)(d.a,{id:"productImage",label:"Product Image",name:"productImage",component:p.c,onImageChange:w}),N?Object(h.jsx)("h6",{style:{color:"red",textAlign:"center"},children:N}):null,S?Object(h.jsx)("h6",{style:{color:"green",textAlign:"center"},children:S}):null,Object(h.jsx)(m.a,{sx:{mt:3,mb:2},color:"primary",fullWidth:!0,children:"Submit"})]})]})})}})]})}}}]);
//# sourceMappingURL=7.60bf6e98.chunk.js.map