window.DB = (() => {
  const categories = [
    { slug: "tech", name: "Tech & Gadgets" },
    { slug: "fashion", name: "Fashion" },
    { slug: "home", name: "Home & Living" },
    { slug: "fitness", name: "Fitness" },
  ];

  const now = Date.now();
  const daysAgo = d => new Date(now - d*24*60*60*1000).toISOString();

  const products = [
    {
      id: "p1",
      title: "Noise-Cancelling Headphones",
      description: "Immersive sound with 30h battery life.",
      image: "https://images.unsplash.com/photo-1518442883307-1d21b06cbf46?q=80&w=1200&auto=format&fit=crop",
      price: 129.99,
      category: "tech",
      tags: ["trending","new"],
      popularity: 98,
      createdAt: daysAgo(5)
    },
    {
      id: "p2",
      title: "Smartwatch Pro",
      description: "Track health, sleep, and workouts.",
      image: "https://images.unsplash.com/photo-1517414204284-0d316fbdd1bf?q=80&w=1200&auto=format&fit=crop",
      price: 199.00,
      category: "tech",
      tags: ["trending"],
      popularity: 93,
      createdAt: daysAgo(22)
    },
    {
      id: "p3",
      title: "Minimal Sneakers",
      description: "Lightweight everyday comfort.",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
      price: 84.50,
      category: "fashion",
      tags: ["new"],
      popularity: 76,
      createdAt: daysAgo(2)
    },
    {
      id: "p4",
      title: "Ergo Office Chair",
      description: "Lumbar support for long sessions.",
      image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef5?q=80&w=1200&auto=format&fit=crop",
      price: 249.99,
      category: "home",
      tags: [],
      popularity: 81,
      createdAt: daysAgo(40)
    },
    {
      id: "p5",
      title: "Insulated Bottle",
      description: "Keeps drinks cold for 24h.",
      image: "https://images.unsplash.com/photo-1588929548563-6f13643f2b72?q=80&w=1200&auto=format&fit=crop",
      price: 22.00,
      category: "fitness",
      tags: ["trending"],
      popularity: 88,
      createdAt: daysAgo(7)
    },
    {
      id: "p6",
      title: "Yoga Mat Pro",
      description: "Non-slip grip • eco material.",
      image: "https://images.unsplash.com/photo-1603988363607-e1e4a66962c1?q=80&w=1200&auto=format&fit=crop",
      price: 35.00,
      category: "fitness",
      tags: [],
      popularity: 72,
      createdAt: daysAgo(14)
    },
    {
      id: "p7",
      title: "LED Desk Lamp",
      description: "Adjustable color temperature.",
      image: "https://images.unsplash.com/photo-1557800636-894a64c1696f?q=80&w=1200&auto=format&fit=crop",
      price: 39.99,
      category: "home",
      tags: ["new"],
      popularity: 69,
      createdAt: daysAgo(1)
    },
    {
      id: "p8",
      title: "Denim Jacket",
      description: "Classic fit, durable stitching.",
      image: "https://images.unsplash.com/photo-1618354691438-c1d7f3b32d49?q=80&w=1200&auto=format&fit=crop",
      price: 59.00,
      category: "fashion",
      tags: [],
      popularity: 66,
      createdAt: daysAgo(19)
    },
    // add more as needed
  ];

  return { categories, products };
})();
