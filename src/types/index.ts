export interface Goal {
  id: string;
  image: string;
  description: string;
  why?: string;
  deadline: string;
  createdAt: string;
  achieved: boolean;
  achievedAt?: string;
}

export interface UserAchievement {
  id: string;
  user_id: string;
  goal_id?: string;
  achievement_type: string;
  achievement_data?: Record<string, unknown>;
  impact_metrics?: Record<string, unknown>;
  testimonial?: string;
  is_featured: boolean;
  opt_in_sharing: boolean;
  created_at: string;
  updated_at: string;
}

export interface NPSFeedback {
  id: string;
  user_id: string;
  score: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10';
  feedback_text?: string;
  created_at: string;
  updated_at: string;
}