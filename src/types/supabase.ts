export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          plan: string
          stripe_customer_id: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          plan?: string
          stripe_customer_id?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          plan?: string
          stripe_customer_id?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      stripe_customers: {
        Row: {
          id: number
          user_id: string
          customer_id: string
          created_at: string | null
          updated_at: string | null
          deleted_at: string | null
        }
        Insert: {
          id: number
          user_id: string
          customer_id: string
          created_at?: string | null
          updated_at?: string | null
          deleted_at?: string | null
        }
        Update: {
          id?: number
          user_id?: string
          customer_id?: string
          created_at?: string | null
          updated_at?: string | null
          deleted_at?: string | null
        }
      }
      stripe_subscriptions: {
        Row: {
          id: number
          customer_id: string
          subscription_id: string | null
          price_id: string | null
          current_period_start: number | null
          current_period_end: number | null
          cancel_at_period_end: boolean | null
          payment_method_brand: string | null
          payment_method_last4: string | null
          status: Database['public']['Enums']['stripe_subscription_status']
          created_at: string | null
          updated_at: string | null
          deleted_at: string | null
        }
        Insert: {
          id: number
          customer_id: string
          subscription_id?: string | null
          price_id?: string | null
          current_period_start?: number | null
          current_period_end?: number | null
          cancel_at_period_end?: boolean | null
          payment_method_brand?: string | null
          payment_method_last4?: string | null
          status: Database['public']['Enums']['stripe_subscription_status']
          created_at?: string | null
          updated_at?: string | null
          deleted_at?: string | null
        }
        Update: {
          id?: number
          customer_id?: string
          subscription_id?: string | null
          price_id?: string | null
          current_period_start?: number | null
          current_period_end?: number | null
          cancel_at_period_end?: boolean | null
          payment_method_brand?: string | null
          payment_method_last4?: string | null
          status?: Database['public']['Enums']['stripe_subscription_status']
          created_at?: string | null
          updated_at?: string | null
          deleted_at?: string | null
        }
      }
      stripe_orders: {
        Row: {
          id: number
          checkout_session_id: string
          payment_intent_id: string
          customer_id: string
          amount_subtotal: number
          amount_total: number
          currency: string
          payment_status: string
          status: Database['public']['Enums']['stripe_order_status']
          created_at: string | null
          updated_at: string | null
          deleted_at: string | null
        }
        Insert: {
          id: number
          checkout_session_id: string
          payment_intent_id: string
          customer_id: string
          amount_subtotal: number
          amount_total: number
          currency: string
          payment_status: string
          status?: Database['public']['Enums']['stripe_order_status']
          created_at?: string | null
          updated_at?: string | null
          deleted_at?: string | null
        }
        Update: {
          id?: number
          checkout_session_id?: string
          payment_intent_id?: string
          customer_id?: string
          amount_subtotal?: number
          amount_total?: number
          currency?: string
          payment_status?: string
          status?: Database['public']['Enums']['stripe_order_status']
          created_at?: string | null
          updated_at?: string | null
          deleted_at?: string | null
        }
      }
    }
    Views: {
      stripe_user_subscriptions: {
        Row: {
          customer_id: string | null
          subscription_id: string | null
          subscription_status: Database['public']['Enums']['stripe_subscription_status'] | null
          price_id: string | null
          current_period_start: number | null
          current_period_end: number | null
          cancel_at_period_end: boolean | null
          payment_method_brand: string | null
          payment_method_last4: string | null
        }
      }
      stripe_user_orders: {
        Row: {
          customer_id: string | null
          order_id: number | null
          checkout_session_id: string | null
          payment_intent_id: string | null
          amount_subtotal: number | null
          amount_total: number | null
          currency: string | null
          payment_status: string | null
          order_status: Database['public']['Enums']['stripe_order_status'] | null
          order_date: string | null
        }
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      stripe_subscription_status: 'not_started' | 'incomplete' | 'incomplete_expired' | 'trialing' | 'active' | 'past_due' | 'canceled' | 'unpaid' | 'paused'
      stripe_order_status: 'pending' | 'completed' | 'canceled'
    }
  }
}