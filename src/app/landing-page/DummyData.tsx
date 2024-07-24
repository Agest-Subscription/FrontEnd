import { PricingPlan } from "@/interfaces/model/pricingplan.type";

export const DummyData: PricingPlan[] = [
  {
    id: "1",
    name: "Basic",
    start_date: "",
    end_date: "",
    price: 50,
    description: "Perfect for side or hobby projects",
    features: [
      {
        id: "1",
        name: "Up to 5 users",
        description: null,
        permissions: [],
        is_active: false,
        created_at: "",
        updated_at: "",
      },
      {
        id: "2",
        name: "Collaboration features",
        description: null,
        permissions: [],
        is_active: false,
        created_at: "",
        updated_at: "",
      },
    ],
    is_free_trial: false,
    free_trial_period: null,
    free_trial_period_count: null,
    is_active: false,
    recurrence_fee_name: "Monthly", // Include this if required by the type
  },
  // Add similar for other items
];
