export const DUMMYDATA: any = [
    {
      id: "sub_001",
      user_id: "user_001",
      email: "user1@example.com",
      pricing_plan: {
        id: "plan_001",
        name: "Basic Plan",
        start_date: "2024-01-01",
        end_date: "2024-03-01",
        price: 9.99,
        description: "Basic subscription plan",
        features: [
          {
            id: "feat_001",
            name: "Feature 1",
            description: "Access to feature 1",
            permissions: [
              {
                id: "perm_001",
                name: "read",
                display_name: "Read Permission",
                description: "Allows read access",
                is_active: true
              }
            ],
            is_active: true,
            created_at: "2024-01-01",
            updated_at: "2024-01-01"
          }
        ],
        is_free_trial: false,
        free_trial_period: null,
        free_trial_period_count: null,
        recurrence_fee_name: "Monthly Fee",
        is_active: true
      },
      is_cancelled: false,
      start_date: new Date("2024-01-01"),
      end_date: null,
      suspended_date: null,
      due_date_free_trial: null,
      next_billing_date: new Date("2024-02-01"),
      auto_renew: true
    },
    {
      id: "sub_002",
      user_id: "user_002",
      email: "user2@example.com",
      pricing_plan: {
        id: "plan_002",
        name: "Pro Plan",
        start_date: "2024-01-01",
        end_date: "2025-01-01",
        price: 19.99,
        description: "Pro subscription plan",
        features: [
          {
            id: "feat_002",
            name: "Feature 2",
            description: "Access to feature 2",
            permissions: [
              {
                id: "perm_002",
                name: "write",
                display_name: "Write Permission",
                description: "Allows write access",
                is_active: true
              }
            ],
            is_active: true,
            created_at: "2024-01-01",
            updated_at: "2024-01-01"
          }
        ],
        is_free_trial: true,
        free_trial_period: null,
        free_trial_period_count: 30,
        recurrence_fee_name: "Monthly Fee",
        is_active: true
      },
      is_cancelled: false,
      start_date: new Date("2024-01-01"),
      end_date: null,
      suspended_date: null,
      due_date_free_trial: new Date("2024-02-01"),
      next_billing_date: new Date("2024-03-01"),
      auto_renew: true
    },
    {
      id: "sub_003",
      user_id: "user_003",
      email: "user3@example.com",
      pricing_plan: {
        id: "plan_003",
        name: "Premium Plan",
        start_date: "2024-01-01",
        end_date: "2025-01-01",
        price: 29.99,
        description: "Premium subscription plan",
        features: [
          {
            id: "feat_003",
            name: "Feature 3",
            description: "Access to feature 3",
            permissions: [
              {
                id: "perm_003",
                name: "admin",
                display_name: "Admin Permission",
                description: "Allows admin access",
                is_active: true
              }
            ],
            is_active: true,
            created_at: "2024-01-01",
            updated_at: "2024-01-01"
          }
        ],
        is_free_trial: false,
        free_trial_period: null,
        free_trial_period_count: null,
        recurrence_fee_name: "Monthly Fee",
        is_active: true
      },
      is_cancelled: false,
      start_date: new Date("2024-01-01"),
      end_date: null,
      suspended_date: null,
      due_date_free_trial: null,
      next_billing_date: new Date("2024-02-01"),
      auto_renew: true
    },
    {
      id: "sub_004",
      user_id: "user_004",
      email: "user4@example.com",
      pricing_plan: {
        id: "plan_001",
        name: "Basic Plan",
        start_date: "2024-02-01",
        end_date: "2025-02-01",
        price: 9.99,
        description: "Basic subscription plan",
        features: [
          {
            id: "feat_001",
            name: "Feature 1",
            description: "Access to feature 1",
            permissions: [
              {
                id: "perm_001",
                name: "read",
                display_name: "Read Permission",
                description: "Allows read access",
                is_active: true
              }
            ],
            is_active: true,
            created_at: "2024-02-01",
            updated_at: "2024-02-01"
          }
        ],
        is_free_trial: true,
        free_trial_period: null,
        free_trial_period_count: 30,
        recurrence_fee_name: "Monthly Fee",
        is_active: true
      },
      is_cancelled: false,
      start_date: new Date("2024-02-01"),
      end_date: null,
      suspended_date: null,
      due_date_free_trial: new Date("2024-03-01"),
      next_billing_date: new Date("2024-04-01"),
      auto_renew: true
    },
    {
      id: "sub_005",
      user_id: "user_005",
      email: "user5@example.com",
      pricing_plan: {
        id: "plan_002",
        name: "Pro Plan",
        start_date: "2024-03-01",
        end_date: "2025-03-01",
        price: 19.99,
        description: "Pro subscription plan",
        features: [
          {
            id: "feat_002",
            name: "Feature 2",
            description: "Access to feature 2",
            permissions: [
              {
                id: "perm_002",
                name: "write",
                display_name: "Write Permission",
                description: "Allows write access",
                is_active: true
              }
            ],
            is_active: true,
            created_at: "2024-03-01",
            updated_at: "2024-03-01"
          }
        ],
        is_free_trial: false,
        free_trial_period: null,
        free_trial_period_count: null,
        recurrence_fee_name: "Monthly Fee",
        is_active: true
      },
      is_cancelled: false,
      start_date: new Date("2024-03-01"),
      end_date: null,
      suspended_date: null,
      due_date_free_trial: null,
      next_billing_date: new Date("2024-04-01"),
      auto_renew: true
    },
    {
      id: "sub_006",
      user_id: "user_006",
      email: "user6@example.com",
      pricing_plan: {
        id: "plan_003",
        name: "Premium Plan",
        start_date: "2024-04-01",
        end_date: "2025-04-01",
        price: 29.99,
        description: "Premium subscription plan",
        features: [
          {
            id: "feat_003",
            name: "Feature 3",
            description: "Access to feature 3",
            permissions: [
              {
                id: "perm_003",
                name: "admin",
                display_name: "Admin Permission",
                description: "Allows admin access",
                is_active: true
              }
            ],
            is_active: true,
            created_at: "2024-04-01",
            updated_at: "2024-04-01"
          }
        ],
        is_free_trial: true,
        free_trial_period: null,
        free_trial_period_count: 30,
        recurrence_fee_name: "Monthly Fee",
        is_active: true
      },
      is_cancelled: false,
      start_date: new Date("2024-04-01"),
      end_date: null,
      suspended_date: null,
      due_date_free_trial: new Date("2024-05-01"),
      next_billing_date: new Date("2024-06-01"),
      auto_renew: true
    },
    {
      id: "sub_007",
      user_id: "user_007",
      email: "user7@example.com",
      pricing_plan: {
        id: "plan_001",
        name: "Basic Plan",
        start_date: "2024-05-01",
        end_date: "2025-05-01",
        price: 9.99,
        description: "Basic subscription plan",
        features: [
          {
            id: "feat_001",
            name: "Feature 1",
            description: "Access to feature 1",
            permissions: [
              {
                id: "perm_001",
                name: "read",
                display_name: "Read Permission",
                description: "Allows read access",
                is_active: true
              }
            ],
            is_active: true,
            created_at: "2024-05-01",
            updated_at: "2024-05-01"
          }
        ],
        is_free_trial: false,
        free_trial_period: null,
        free_trial_period_count: null,
        recurrence_fee_name: "Monthly Fee",
        is_active: true
      },
      is_cancelled: false,
      start_date: new Date("2024-05-01"),
      end_date: null,
      suspended_date: null,
      due_date_free_trial: null,
      next_billing_date: new Date("2024-06-01"),
      auto_renew: true
    },
    {
      id: "sub_008",
      user_id: "user_008",
      email: "user8@example.com",
      pricing_plan: {
        id: "plan_002",
        name: "Pro Plan",
        start_date: "2024-06-01",
        end_date: "2025-06-01",
        price: 19.99,
        description: "Pro subscription plan",
        features: [
          {
            id: "feat_002",
            name: "Feature 2",
            description: "Access to feature 2",
            permissions: [
              {
                id: "perm_002",
                name: "write",
                display_name: "Write Permission",
                description: "Allows write access",
                is_active: true
              }
            ],
            is_active: true,
            created_at: "2024-06-01",
            updated_at: "2024-06-01"
          }
        ],
        is_free_trial: true,
        free_trial_period: null,
        free_trial_period_count: 30,
        recurrence_fee_name: "Monthly Fee",
        is_active: true
      },
      is_cancelled: false,
      start_date: new Date("2024-06-01"),
      end_date: null,
      suspended_date: null,
      due_date_free_trial: new Date("2024-07-01"),
      next_billing_date: new Date("2024-08-01"),
      auto_renew: true
    },
    {
      id: "sub_009",
      user_id: "user_009",
      email: "user9@example.com",
      pricing_plan: {
        id: "plan_003",
        name: "Premium Plan",
        start_date: "2024-07-01",
        end_date: "2025-07-01",
        price: 29.99,
        description: "Premium subscription plan",
        features: [
          {
            id: "feat_003",
            name: "Feature 3",
            description: "Access to feature 3",
            permissions: [
              {
                id: "perm_003",
                name: "admin",
                display_name: "Admin Permission",
                description: "Allows admin access",
                is_active: true
              }
            ],
            is_active: true,
            created_at: "2024-07-01",
            updated_at: "2024-07-01"
          }
        ],
        is_free_trial: false,
        free_trial_period: null,
        free_trial_period_count: null,
        recurrence_fee_name: "Monthly Fee",
        is_active: true
      },
      is_cancelled: false,
      start_date: new Date("2024-07-01"),
      end_date: null,
      suspended_date: null,
      due_date_free_trial: null,
      next_billing_date: new Date("2024-08-01"),
      auto_renew: true
    },
    {
      id: "sub_010",
      user_id: "user_010",
      email: "user10@example.com",
      pricing_plan: {
        id: "plan_001",
        name: "Basic Plan",
        start_date: "2024-08-01",
        end_date: "2025-08-01",
        price: 9.99,
        description: "Basic subscription plan",
        features: [
          {
            id: "feat_001",
            name: "Feature 1",
            description: "Access to feature 1",
            permissions: [
              {
                id: "perm_001",
                name: "read",
                display_name: "Read Permission",
                description: "Allows read access",
                is_active: true
              }
            ],
            is_active: true,
            created_at: "2024-08-01",
            updated_at: "2024-08-01"
          }
        ],
        is_free_trial: true,
        free_trial_period: null,
        free_trial_period_count: 30,
        recurrence_fee_name: "Monthly Fee",
        is_active: true
      },
      is_cancelled: false,
      start_date: new Date("2024-08-01"),
      end_date: null,
      suspended_date: null,
      due_date_free_trial: new Date("2024-09-01"),
      next_billing_date: new Date("2024-10-01"),
      auto_renew: true
    }
  ];
  