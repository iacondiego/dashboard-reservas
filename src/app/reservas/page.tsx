import { ReservasTable } from '@/features/reservas/components/ReservasTable'
import { CalendarDays } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function ReservasPage() {
  return (
    <div className="min-h-screen">
      <div className="space-y-8">
        {/* Header Profesional */}
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 p-4 shadow-lg">
            <CalendarDays className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Gestión de Reservas
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Panel de control y administración de citas médicas
            </p>
          </div>
        </div>

        {/* Contenido Principal */}
        <ReservasTable />
      </div>
    </div>
  )
}
