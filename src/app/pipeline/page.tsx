import { KanbanBoard } from '@/features/pipeline/components/KanbanBoard'
import { TrendingUp } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function PipelinePage() {
  return (
    <div className="min-h-screen">
      <div className="space-y-8">
        {/* Header Profesional */}
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 p-4 shadow-lg">
            <TrendingUp className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Pipeline de Ventas
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Gestiona y visualiza tus oportunidades de negocio
            </p>
          </div>
        </div>

        {/* Kanban Board */}
        <KanbanBoard />
      </div>
    </div>
  )
}
