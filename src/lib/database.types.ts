export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      sermon: {
        Row: {
          audioUrl: string
          created_at: string | null
          description: string | null
          id: string
          recordingDate: string
          series: string | null
          speaker: string
          tags: string[]
          thumbnailUrl: string
          title: string
        }
        Insert: {
          audioUrl: string
          created_at?: string | null
          description?: string | null
          id?: string
          recordingDate: string
          series?: string | null
          speaker?: string
          tags?: string[]
          thumbnailUrl: string
          title: string
        }
        Update: {
          audioUrl?: string
          created_at?: string | null
          description?: string | null
          id?: string
          recordingDate?: string
          series?: string | null
          speaker?: string
          tags?: string[]
          thumbnailUrl?: string
          title?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
