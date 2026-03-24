export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          status: 'active' | 'classified' | 'inactive'
          level: number // 1-5, 1 is highest
          created_at: string
          full_name: string | null
        }
        Insert: {
          id?: string
          email: string
          status?: 'active' | 'classified' | 'inactive'
          level?: number
          created_at?: string
          full_name?: string | null
        }
        Update: {
          id?: string
          email?: string
          status?: 'active' | 'classified' | 'inactive'
          level?: number
          created_at?: string
          full_name?: string | null
        }
      }
      entities: {
        Row: {
          id: string
          name: string
          category: string
          description: string
          image_url: string | null
          recovery_info: string
          containment_info: string
          access_level: number // 1-5, 1 means only level 1 can view, 5 means everyone
          created_by: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          category: string
          description: string
          image_url?: string | null
          recovery_info: string
          containment_info: string
          access_level?: number
          created_by: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: string
          description?: string
          image_url?: string | null
          recovery_info?: string
          containment_info?: string
          access_level?: number
          created_by?: string
          created_at?: string
        }
      }
    }
  }
}
