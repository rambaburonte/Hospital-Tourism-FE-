import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const blogs = [
  {
    title: "Understanding Migraines: Causes and Management",
    image: "https://images.unsplash.com/photo-1581579438747-104c53d7fbc4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    excerpt: "Learn about the common causes of migraines and effective management strategies to reduce their impact.",
    fullDescription: "Migraines are more than just headaches; they can significantly affect daily life. Common triggers include stress, certain foods, and hormonal changes. This article explores evidence-based strategies such as medication, lifestyle adjustments, and stress management techniques to help manage and prevent migraines effectively.",
    category: "Specialty Care",
    author: "Dr. Sarah Thompson",
    date: "April 15, 2025"
  },
  {
    title: "Nutrition Essentials: Spotting Nutrient Deficiencies",
    image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    excerpt: "Discover the subtle symptoms your body uses to signal nutrient deficiencies and how to address them.",
    fullDescription: "Nutrient deficiencies can manifest as fatigue, brittle nails, or poor concentration. This guide covers key signs of deficiencies in vitamins like B12, D, and iron, along with dietary recommendations and supplementation tips to restore optimal health.",
    category: "Primary Care",
    author: "Emily Carter, RD",
    date: "March 22, 2025"
  },
  {
    title: "Pregnancy Care: Tips for a Healthy Journey",
    image: "https://images.unsplash.com/photo-1557825835-70d97c4aa567?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    excerpt: "Expert advice for maintaining health and wellness throughout each phase of pregnancy.",
    fullDescription: "Pregnancy is a transformative journey. This article provides trimester-specific advice, including nutritional needs, exercise guidelines, and prenatal care tips to ensure a healthy pregnancy for both mother and baby.",
    category: "Pediatric Care",
    author: "Dr. Lisa Nguyen",
    date: "February 10, 2025"
  },
  {
    title: "Exercise for Mental Wellness",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    excerpt: "Explore how physical activity can boost mood, reduce stress, and improve mental well-being.",
    fullDescription: "Regular exercise is a powerful tool for mental health. From releasing endorphins to improving sleep quality, physical activity can alleviate symptoms of anxiety and depression. Learn practical ways to incorporate exercise into your routine for lasting benefits.",
    category: "Mental Health Care",
    author: "Dr. Michael Brooks",
    date: "January 5, 2025"
  },
  {
    title: "Heart Health: Building a Stronger Heart",
    image: "https://images.unsplash.com/photo-1576765607924-3a7bd1c73d84?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    excerpt: "Practical steps to maintain a healthy heart through diet, exercise, and lifestyle changes.",
    fullDescription: "A strong heart is key to overall health. This article outlines actionable steps like adopting a Mediterranean diet, regular aerobic exercise, and stress reduction techniques to lower the risk of heart disease and improve cardiovascular function.",
    category: "Specialty Care",
    author: "Dr. James Patel",
    date: "December 12, 2024"
  },
  {
    title: "Managing Chronic Pain Effectively",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    excerpt: "Effective techniques for coping with chronic pain and improving quality of life.",
    fullDescription: "Chronic pain can be debilitating, but there are ways to manage it. This guide covers multidisciplinary approaches, including physical therapy, mindfulness, and pharmacological options, to help individuals regain control and enhance their quality of life.",
    category: "Rehabilitative Services",
    author: "Dr. Rachel Lee",
    date: "November 8, 2024"
  },
  {
    title: "Emergency Care: What to Expect in the ER",
    image: "https://images.unsplash.com/photo-1516549655169-df83a1aabe59?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    excerpt: "Understand the process and expectations when seeking emergency care for acute conditions.",
    fullDescription: "Emergency rooms provide critical care for life-threatening conditions. This article explains what to expect during an ER visit, including triage, diagnostic tests, and treatment plans, to help you feel prepared in urgent situations.",
    category: "Emergency Care",
    author: "Dr. Alan Foster",
    date: "October 20, 2024"
  },
  {
    title: "Preparing for Surgery: A Patient’s Guide",
    image: "https://images.unsplash.com/photo-1579684453423-8a6b57f3e1c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    excerpt: "Learn how to prepare for surgery and what to expect during recovery.",
    fullDescription: "Surgery can be daunting, but preparation is key. This guide covers pre-surgical steps, anesthesia options, and post-operative care to ensure a smooth recovery, whether it's general or orthopedic surgery.",
    category: "Surgical Services",
    author: "Dr. Karen White",
    date: "September 15, 2024"
  },
  {
    title: "Healthy Aging: Tips for Seniors",
    image: "https://images.unsplash.com/photo-1500048993953-d23a436266cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    excerpt: "Discover ways to maintain health and vitality in older age.",
    fullDescription: "Aging gracefully involves proactive healthcare. This article offers tips for seniors, including exercise, nutrition, and regular checkups, to support mobility, cognitive health, and overall well-being.",
    category: "Geriatric Care",
    author: "Dr. Susan Miller",
    date: "August 10, 2024"
  },
  {
    title: "Dental Health: Beyond Brushing",
    image: "https://images.unsplash.com/photo-1595687130435-21a8d3e65b6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    excerpt: "Explore comprehensive oral health practices for a brighter smile.",
    fullDescription: "Good dental care goes beyond brushing. This article covers flossing, regular dental checkups, and orthodontic options to prevent cavities, gum disease, and other oral health issues.",
    category: "Dental Care",
    author: "Dr. Mark Evans, DDS",
    date: "July 5, 2024"
  },
  {
    title: "Understanding Your Medications",
    image: "https://images.unsplash.com/photo-1576092768241-dec1a1aabe59?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    excerpt: "Learn how to manage prescriptions and avoid common medication errors.",
    fullDescription: "Proper medication management is crucial for effective treatment. This guide explains how to understand prescriptions, avoid interactions, and work with pharmacists to optimize your pharmaceutical care.",
    category: "Pharmaceutical Services",
    author: "Dr. Linda Hayes, PharmD",
    date: "June 12, 2024"
  },
  {
    title: "The Role of Diagnostic Imaging in Healthcare",
    image: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    excerpt: "Understand how X-rays, MRIs, and other tests aid in diagnosis.",
    fullDescription: "Diagnostic imaging, such as X-rays and MRIs, plays a vital role in identifying health issues. This article explains common imaging techniques, their uses, and what to expect during testing.",
    category: "Diagnostic Services",
    author: "Dr. Robert Kim",
    date: "May 20, 2024"
  },
  {
    title: "Home Health Care: Support at Your Doorstep",
    image: "https://images.unsplash.com/photo-1576765974159-84f7f16ed5b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    excerpt: "Explore the benefits of medical and personal care at home.",
    fullDescription: "Home health care provides medical and personal support in the comfort of your home. This guide covers services like nursing, therapy, and assistance with daily activities for those with chronic conditions or recovery needs.",
    category: "Home Health Care",
    author: "Dr. Nancy Brown",
    date: "April 15, 2024"
  },
  {
    title: "Palliative Care: Enhancing Quality of Life",
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    excerpt: "Learn how palliative care supports patients with serious illnesses.",
    fullDescription: "Palliative care focuses on improving quality of life for patients with serious or terminal illnesses. This article explains how it manages symptoms, provides emotional support, and coordinates care for patients and families.",
    category: "Palliative and Hospice Care",
    author: "Dr. Emily Stone",
    date: "March 10, 2024"
  },
  {
    title: "The Power of Preventive Care",
    image: "https://images.unsplash.com/photo-1576092768119-3b79db88f46d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    excerpt: "Discover how screenings and checkups can prevent health issues.",
    fullDescription: "Preventive care, including vaccinations, screenings, and wellness checkups, is key to early detection and health maintenance. This article highlights the importance of routine care to prevent serious conditions.",
    category: "Preventive Care",
    author: "Dr. Thomas Reed",
    date: "February 5, 2024"
  },
  {
    title: "Public Health: Protecting Communities",
    image: "https://images.unsplash.com/photo-1584036561566-baf72f92c296?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    excerpt: "Learn about initiatives that safeguard community health.",
    fullDescription: "Public health services focus on preventing disease and promoting wellness at a community level. This article explores vaccination campaigns, health education, and environmental health efforts that protect populations.",
    category: "Public Health Services",
    author: "Dr. Laura Wilson",
    date: "January 10, 2024"
  }
];

const HealthBlogsSection = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Primary Care',
    'Specialty Care',
    'Emergency Care',
    'Surgical Services',
    'Mental Health Care',
    'Pediatric Care',
    'Geriatric Care',
    'Rehabilitative Services',
    'Dental Care',
    'Pharmaceutical Services',
    'Diagnostic Services',
    'Home Health Care',
    'Palliative and Hospice Care',
    'Preventive Care',
    'Public Health Services'
  ];

  const filteredBlogs = selectedCategory === 'All'
    ? blogs
    : blogs.filter(blog => blog.category === selectedCategory).slice(0, 3);

  const handleViewAll = () => {
    navigate('/health-blogs');
  };

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-6 md:px-8">
        <div className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 tracking-tight">
              Health Insights
            </h2>
            <button
              onClick={handleViewAll}
              className="text-blue-600 font-medium hover:text-blue-800 flex items-center transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="View all health blogs"
            >
              View All <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-wrap gap-3 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-200 text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                aria-label={`Filter by ${category}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog, index) => (
              <Card
                key={index}
                className="overflow-hidden border-0 shadow-md rounded-2xl transition-all duration-300 bg-white hover:shadow-lg hover:scale-[1.03]"
              >
                <div className="relative h-48 sm:h-64">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" aria-hidden="true"></div>
                  <span className="absolute top-4 left-4 bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 py-1.5 text-sm font-medium rounded-full shadow-sm">
                    {blog.category}
                  </span>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>
                  <span
                    onClick={() => navigate('/blogs')}
                    className="text-blue-600 text-sm md:text-base font-medium hover:text-blue-800 flex items-center cursor-pointer transition-colors duration-300"
                    aria-label={`Read more about ${blog.title}`}
                  >
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-gray-600 col-span-full text-center text-lg">
              No blogs available for this category.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default HealthBlogsSection;