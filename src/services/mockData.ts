import { Lesson, LessonCategory } from "../types/lesson";
import { Project } from "../types/project";
import { Resource } from "../types/resource";
import { User } from "../types/user";

const nowIso = () => new Date().toISOString();

export const mockUsers: User[] = [
  {
    id: "admin-1",
    name: "Admin",
    email: "admin@sustainability.edu",
    role: "admin",
    createdAt: nowIso()
  }
];

export const mockLessons: Lesson[] = [
  {
    id: "lesson-renewable-1",
    title: "Introduction to Renewable Energy",
    category: "Renewable Energy",
    shortDescription: "Understand the basics of renewable energy sources and why they matter.",
    content:
      "Renewable energy comes from sources that are naturally replenished, such as sunlight, wind, rain, tides, and geothermal heat. Unlike fossil fuels, renewable sources do not run out on a human time scale and typically produce far fewer greenhouse gas emissions. In this lesson you will explore the main types of renewable energy and how they can replace fossil fuels in electricity, heating, and transportation.",
    quiz: [
      {
        id: "q1",
        question: "Which of the following is a renewable energy source?",
        options: [
          { id: "a", label: "Coal", isCorrect: false },
          { id: "b", label: "Natural gas", isCorrect: false },
          { id: "c", label: "Solar power", isCorrect: true },
          { id: "d", label: "Diesel", isCorrect: false }
        ]
      },
      {
        id: "q2",
        question: "Why are renewable energy sources important for sustainability?",
        options: [
          {
            id: "a",
            label: "They reduce greenhouse gas emissions and air pollution.",
            isCorrect: true
          },
          { id: "b", label: "They are always cheaper than fossil fuels.", isCorrect: false },
          { id: "c", label: "They work only in warm climates.", isCorrect: false },
          { id: "d", label: "They do not require any infrastructure.", isCorrect: false }
        ]
      }
    ]
  },
  {
    id: "lesson-waste-1",
    title: "Waste Reduction at Home",
    category: "Waste Reduction",
    shortDescription: "Learn how to prevent waste, reuse materials, and recycle correctly.",
    content:
      "Reducing waste starts with refusing what you do not need, reusing items you already have, and recycling only when necessary. By analyzing your daily habits—such as food shopping, packaging use, and disposal practices—you can significantly cut the amount of waste that goes to landfill. Small actions like using reusable bags, bottles, and containers make a measurable difference over time.",
    quiz: [
      {
        id: "q1",
        question: "Which action follows the waste reduction hierarchy most closely?",
        options: [
          { id: "a", label: "Buying bottled water and recycling the bottles", isCorrect: false },
          { id: "b", label: "Using a reusable water bottle every day", isCorrect: true },
          { id: "c", label: "Throwing plastic in the trash", isCorrect: false },
          { id: "d", label: "Burning waste at home", isCorrect: false }
        ]
      }
    ]
  },
  {
    id: "lesson-lifestyle-1",
    title: "Eco-Friendly Lifestyle Habits",
    category: "Eco-Friendly Lifestyle",
    shortDescription: "Discover simple daily habits that lower your environmental footprint.",
    content:
      "Living an eco-friendly lifestyle means making conscious decisions about what you buy, how you travel, and how you use energy and water. Examples include choosing plant-rich meals, walking or cycling for short trips, and turning off devices when they are not in use. Over time, consistent habits like these can significantly reduce your personal carbon footprint.",
    quiz: [
      {
        id: "q1",
        question: "Which habit most directly lowers your carbon footprint?",
        options: [
          { id: "a", label: "Driving alone for every short trip", isCorrect: false },
          { id: "b", label: "Taking a bike or walking when possible", isCorrect: true },
          { id: "c", label: "Leaving lights on all day", isCorrect: false },
          { id: "d", label: "Using disposable cups every day", isCorrect: false }
        ]
      }
    ]
  }
];

export const mockProjects: Project[] = [
  {
    id: "project-compost",
    title: "Start a Home Compost System",
    description:
      "Design and set up a small compost system at home to turn food scraps and yard waste into nutrient-rich soil.",
    impact:
      "Diverts organic waste from landfill, reduces methane emissions, and creates natural fertilizer for plants.",
    difficulty: "Intermediate",
    estimatedDuration: "2–4 weeks"
  },
  {
    id: "project-energy-audit",
    title: "Conduct a Home Energy Audit",
    description:
      "Inspect your home to find where energy is wasted and create a simple action plan to improve efficiency.",
    impact:
      "Reduces electricity and heating demand, lowers energy bills, and cuts greenhouse gas emissions.",
    difficulty: "Beginner",
    estimatedDuration: "1–2 weeks"
  },
  {
    id: "project-plastic-free",
    title: "Plastic-Free Week Challenge",
    description:
      "Complete one week of daily life while avoiding single-use plastics wherever possible and documenting alternatives.",
    impact:
      "Raises awareness about hidden plastics in everyday products and inspires long-term behavior change.",
    difficulty: "Beginner",
    estimatedDuration: "1 week"
  }
];

export const mockResources: Resource[] = [
  {
    id: "res-article-1",
    title: "Beginner’s Guide to Sustainable Living",
    description: "A practical article that explains how to start living more sustainably today.",
    url: "https://www.un.org/en/climatechange/sustainable-lifestyle",
    category: "Article",
    source: "United Nations Climate Action"
  },
  {
    id: "res-pdf-1",
    title: "Household Energy Savings Checklist (PDF)",
    description: "A printable checklist of actions you can take to reduce energy use at home.",
    url: "https://example.org/energy-savings-checklist.pdf",
    category: "PDF",
    source: "Local Sustainability Council"
  },
  {
    id: "res-site-1",
    title: "Sustainable Development Goal 12 – Responsible Consumption",
    description: "Overview of the United Nations goal focused on sustainable consumption and production.",
    url: "https://sdgs.un.org/goals/goal12",
    category: "Website",
    source: "United Nations"
  }
];

export const lessonCategories: LessonCategory[] = [
  "Renewable Energy",
  "Waste Reduction",
  "Eco-Friendly Lifestyle"
];

