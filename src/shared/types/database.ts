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
      reservas: {
        Row: {
          id: string
          created_at: string
          nombre_paciente: string
          servicio: string
          medico: string
          fecha_hora: string
          tipo_consulta: string
          estado: string
          sala: string | null
          notas: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          nombre_paciente: string
          servicio: string
          medico: string
          fecha_hora: string
          tipo_consulta: string
          estado?: string
          sala?: string | null
          notas?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          nombre_paciente?: string
          servicio?: string
          medico?: string
          fecha_hora?: string
          tipo_consulta?: string
          estado?: string
          sala?: string | null
          notas?: string | null
        }
      }
      pipeline: {
        Row: {
          id: string
          created_at: string
          nombre_cliente: string
          empresa: string | null
          email: string | null
          telefono: string | null
          servicio: string
          estado: string
          valor_estimado: number
          probabilidad: number
          fecha_cierre_estimada: string | null
          notas: string | null
          fuente: string | null
          ultima_interaccion: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          nombre_cliente: string
          empresa?: string | null
          email?: string | null
          telefono?: string | null
          servicio: string
          estado?: string
          valor_estimado: number
          probabilidad?: number
          fecha_cierre_estimada?: string | null
          notas?: string | null
          fuente?: string | null
          ultima_interaccion?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          nombre_cliente?: string
          empresa?: string | null
          email?: string | null
          telefono?: string | null
          servicio?: string
          estado?: string
          valor_estimado?: number
          probabilidad?: number
          fecha_cierre_estimada?: string | null
          notas?: string | null
          fuente?: string | null
          ultima_interaccion?: string | null
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
  }
}

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']

export type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T]
