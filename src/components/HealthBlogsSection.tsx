
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from 'lucide-react';

const blogs = [
  {
    title: "Understanding Migraines: Causes and Management",
    image: "https://images.unsplash.com/photo-1581579438747-104c53d7fbc4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    excerpt: "Learn about the common causes of migraines and effective management strategies.",
    category: "Neurology"
  },
  {
    title: "Common Signs of Nutrient Deficiencies",
    image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    excerpt: "Understanding the subtle symptoms your body uses to signal nutrient deficiencies.",
    category: "Nutrition"
  },
  {
    title: "Pregnancy Care: Essential Tips for Every Trimester",
    image: "https://images.unsplash.com/photo-1557825835-70d97c4aa567?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    excerpt: "Expert advice for maintaining health throughout each phase of pregnancy.",
    category: "Obstetrics"
  }
];

const HealthBlogsSection = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Health Blogs</h2>
          <a href="#" className="text-primary font-medium hover:underline flex items-center">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((blog, index) => (
            <Card key={index} className="overflow-hidden border-0 shadow-md blog-card">
              <div className="relative h-48">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-primary text-white px-2 py-1 text-xs rounded">
                  {blog.category}
                </span>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2">{blog.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{blog.excerpt}</p>
                <a href="#" className="text-primary text-sm font-medium hover:underline flex items-center">
                  Read More <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HealthBlogsSection;
