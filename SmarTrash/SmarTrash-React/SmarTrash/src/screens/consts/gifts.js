const gifts =[ {
    GiftId: 1,
    GiftName: 'קשים ממתכת',
    Price: 1800,
    GiftDescription: 'קשים רב פעמיים ממתכת איכותית ניתנים לשטיפה במדיח',
    Brand: 'Majestic Straw',
    GiftCategory: 'לבית',
    img: 'https://www.cristalica.de/media/image/product/89332/md/glass-straws-10-pack-with-cleaning-brush-21cmx8mm.jpg',
},

{
    GiftId: 2,
    GiftName: '1+1 במחלקת הנוי',
    Price: 2500,
    GiftDescription: '1+1 במחלקת הנוי של IKEA הקופון תקף בכל סניפי הרשת',
    Brand: 'IKEA',
    GiftCategory: 'לבית',
    img: 'https://www.ikea.com/global/assets/navigation/images/decorative-accessories-24924.jpeg?imwidth=300',
},
{
    GiftId: 3,
    GiftName: '100 ש"ח מתנה ברשת נייק',
    Price: 2800,
    GiftDescription: 'קופון בסך 100 שקלים תקף על כל מחלקות החנות בכל סניפי הרשת',
    Brand: 'NIKE',
    GiftCategory:'ביגוד',
    img: 'data:image/png;base64,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',
},
];

export default gifts;