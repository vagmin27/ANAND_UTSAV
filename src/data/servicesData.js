export const allServices = [
    {
        id: 101,
        name: "Royal Catering",
        categoryId: 1,
        price: 25000,
        priceInfo: "Starts at ₹25,000",
        rating: 4.8,
        description: "Exquisite culinary experiences for weddings, corporate events, and private parties, featuring diverse menus and professional service.",
        images: [
            "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
            "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&q=80",
            "https://images.unsplash.com/photo-1565299585323-15d11e383435?w=600&q=80",
            "https://images.unsplash.com/photo-1522239332085-c088a536f663?w=600&q=80"
        ],
        reviews: [
            { id: 'rev101-1', author: 'Priya Sharma', date: '2025-09-15', rating: 5, comment: 'Absolutely phenomenal service for our wedding! The food was divine and the presentation was a work of art. Highly recommended!' },
            { id: 'rev101-2', author: 'Rohan Gupta', date: '2025-08-02', rating: 4, comment: 'Great food and professional staff. There was a slight delay in the main course, but they handled it well. Overall, a very good experience.' },
            { id: 'rev101-3', author: 'Anjali Mehta', date: '2025-07-21', rating: 5, comment: 'Royal Catering made our corporate event a huge success. Every dish was a hit with our international guests.' }
        ]
    },
    {
        id: 102,
        name: "Sweet Cravings",
        categoryId: 1,
        price: 30000,
        priceInfo: "Starts at ₹30,000",
        rating: 4.6,
        description: "Artisanal desserts, custom cakes, and gourmet sweet tables that provide a memorable final course for any celebration.",
        images: [
            "https://images.unsplash.com/photo-1543353071-873f17a7a088?w=600&q=80",
            "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=600&q=80",
            "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80",
            "https://images.unsplash.com/photo-1579306240954-3ace2a93169e?w=600&q=80"
        ],
        reviews: [
            { id: 'rev102-1', author: 'Vikram Singh', date: '2025-09-05', rating: 5, comment: 'The dessert table was the star of our reception. Everything looked and tasted incredible.' },
            { id: 'rev102-2', author: 'Sunita Patil', date: '2025-07-18', rating: 4, comment: 'Beautiful cake and delicious pastries. The delivery was a bit later than scheduled, but the quality made up for it.' }
        ]
    },
    {
        id: 201,
        name: "Snapshot Crew",
        categoryId: 3,
        price: 40000,
        priceInfo: "From ₹40,000",
        rating: 4.7,
        description: "A team of creative photographers and videographers dedicated to capturing the essence of your most important moments.",
        images: [
            "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=600&q=80",
            "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80",
            "https://images.unsplash.com/photo-1542042161-d703d15d7821?w=600&q=80"
        ],
        reviews: [
            { id: 'rev201-1', author: 'Deepak Kumar', date: '2025-08-25', rating: 5, comment: 'The photos are stunning! They captured so many beautiful candid moments. The team was a joy to work with.' },
            { id: 'rev201-2', author: 'Neha Desai', date: '2025-06-11', rating: 4, comment: 'Very professional and talented photographers. We love our wedding album. Just wish the final video was delivered a bit sooner.' }
        ]
    },
    {
        id: 301,
        name: "Event Decor Masters",
        categoryId: 2,
        price: 20000,
        priceInfo: "Packages from ₹20,000",
        rating: 4.5,
        description: "Transforming venues with breathtaking floral arrangements, lighting, and thematic decor for an unforgettable ambiance.",
        images: [
            "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=600&q=80",
            "https://images.unsplash.com/photo-1487452066049-a710f7296405?w=600&q=80",
            "https://images.unsplash.com/photo-1530023367373-358863d6e52r?w=600&q=80"
        ],
        reviews: [
            { id: 'rev301-1', author: 'Aisha Khan', date: '2025-09-01', rating: 5, comment: 'They turned our simple hall into a fairytale setting. The attention to detail was impeccable.' },
            { id: 'rev301-2', author: 'Rajesh Nair', date: '2025-08-10', rating: 4, comment: 'The decor was beautiful. Communication could have been a bit better in the planning stages, but the final result was fantastic.' }
        ]
    },
    {
        id: 39,
        name: "Event Management",
        categoryId: 1,
        price: 30000,
        priceInfo: "Starts at ₹30,000",
        rating: 4.7,
        description: "Complete wedding, party, and corporate event planning. We handle everything from venue selection to vendor coordination.",
        images: [
            "https://images.unsplash.com/photo-1529634899794-9d3c3d0b61a6?w=600&q=80",
            "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80",
            "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=600&q=80"
        ],
        reviews: [
            { id: 'rev39-1', author: 'Sanjay Reddy', date: '2025-07-28', rating: 5, comment: 'Made our wedding planning process completely stress-free. They are organized, creative, and professional.' },
            { id: 'rev39-2', author: 'Pooja Agarwal', date: '2025-06-03', rating: 5, comment: 'Best decision we made! Our event was flawless from start to finish. Thank you!' }
        ]
    },
    {
        id: 31,
        name: "Interior Design",
        categoryId: 7,
        price: 50000,
        priceInfo: "Starts at ₹50,000",
        rating: 4.9,
        description: "Modern, functional, and aesthetic home and office interiors designed to reflect your personal style.",
        images: [
            "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&q=80",
            "https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&q=80",
            "https://images.unsplash.com/photo-1567016432779-1fee84e83713?w=600&q=80"
        ],
        reviews: [
            { id: 'rev31-1', author: 'Amit Trivedi', date: '2025-08-14', rating: 5, comment: 'Transformed our apartment into a dream home. Their design sense is brilliant and they really listen to your needs.' },
            { id: 'rev31-2', author: 'Meera Iyer', date: '2025-05-20', rating: 5, comment: 'So happy with our new office space. It has boosted productivity and morale. A truly professional team.' }
        ]
    },
    {
        id: 27,
        name: "Website Development",
        categoryId: 5,
        price: 20000,
        priceInfo: "Starts at ₹20,000",
        rating: 4.9,
        description: "Responsive and modern websites designed for businesses and startups, focusing on performance and user experience.",
        images: [
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
            "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80",
            "https://images.unsplash.com/photo-1559028006-44d081543144?w=600&q=80"
        ],
        reviews: [
            { id: 'rev27-1', author: 'Startup India', date: '2025-09-12', rating: 5, comment: 'Delivered a fantastic, high-performance website on a tight deadline. The communication was excellent throughout the project.' },
            { id: 'rev27-2', author: 'Local Biz', date: '2025-08-01', rating: 5, comment: 'Our new e-commerce site is fast, beautiful, and easy to manage. Our sales have increased since the launch. A+' }
        ]
    },
    {
        id: 29,
        name: "Content Writing",
        categoryId: 6,
        price: 50,
        priceInfo: "Starts at ₹50 per 50 words",
        rating: 4.8,
        description: "Engaging, SEO-friendly blogs, articles, and high-conversion copywriting for brands and websites.",
        images: [
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80",
            "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&q=80",
            "https://images.unsplash.com/photo-1488998427799-e3362cec87c3?w=600&q=80"
        ],
        reviews: [
            { id: 'rev29-1', author: 'Digital Agency', date: '2025-09-10', rating: 5, comment: 'Consistently high-quality articles that are well-researched and delivered on time. Our go-to for all content needs.' },
            { id: 'rev29-2', author: 'Fashion Blog', date: '2025-08-22', rating: 4, comment: 'Great writing style that matches our brand voice. Sometimes requires a bit of editing, but overall very satisfied.' }
        ]
    },
    {
        id: 32,
        name: "Fitness Coaching",
        categoryId: 7,
        price: 2000,
        priceInfo: "Starts at ₹2,000/month",
        rating: 4.8,
        description: "Personalized fitness and diet plans with expert trainers to help you achieve your health and wellness goals.",
        images: [
            "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80",
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
            "https://images.unsplash.com/photo-1540496905036-5937c10647cc?w=600&q=80"
        ],
        reviews: [
            { id: 'rev32-1', author: 'Aditya Roy', date: '2025-09-18', rating: 5, comment: 'Lost 10 kgs in 3 months! The workout plan was tough but effective, and the diet was easy to follow. Amazing coach.' },
            { id: 'rev32-2', author: 'Kavita Joshi', date: '2025-08-05', rating: 5, comment: 'The online sessions are very convenient and motivating. My trainer is knowledgeable and supportive.' }
        ]
    },
    {
        id: 34,
        name: "Music Lessons",
        categoryId: 8,
        price: 1000,
        priceInfo: "Starts at ₹1,000/session",
        rating: 4.7,
        description: "Learn guitar, piano, or vocals with expert musicians through personalized, one-on-one sessions.",
        images: [
            "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80",
            "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=80",
            "https://images.unsplash.com/photo-1558556403-31a9a4c44934?w=600&q=80"
        ],
        reviews: [
            { id: 'rev34-1', author: 'Ishaan Verma', date: '2025-09-02', rating: 5, comment: 'My guitar skills have improved so much in just a few months. The instructor is very patient and makes learning fun.' },
            { id: 'rev34-2', author: 'Riya Das', date: '2025-07-16', rating: 4, comment: 'Good vocal coaching. I have definitely seen an improvement in my range. Scheduling can sometimes be a bit tricky.' }
        ]
    },
    {
        id: 35,
        name: "Legal Consulting",
        categoryId: 9,
        price: 3000,
        priceInfo: "Starts at ₹3,000/hour",
        rating: 4.9,
        description: "Professional legal advice for personal and business cases from experienced and certified attorneys.",
        images: [
            "https://images.unsplash.com/photo-1555374018-13a8994ab246?w=600&q=80",
            "https://images.unsplash.com/photo-1590102426319-c72160152ce4?w=600&q=80",
            "https://images.unsplash.com/photo-1589216532372-1c2a36790239?w=600&q=80"
        ],
        reviews: [
            { id: 'rev35-1', author: 'Anand Enterprises', date: '2025-08-20', rating: 5, comment: 'Clear, concise, and invaluable advice for our startup. Helped us navigate complex legal documentation with ease.' },
            { id: 'rev35-2', author: 'Nikhil Rao', date: '2025-06-29', rating: 5, comment: 'Provided excellent guidance for my property dispute. Very knowledgeable and professional.' }
        ]
    },
];