'use client'

import { DollarSign, Calendar, TrendingUp } from 'lucide-react'
import type { Tables } from '@/shared/types/database'

type Pipeline = Tables<'pipeline'>

interface KanbanCardProps {
  item: Pipeline
  onCardClick?: (item: Pipeline) => void
}

export function KanbanCard({ item, onCardClick }: KanbanCardProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(value)
  }

  const formatDate = (date: string | null) => {
    if (!date) return 'Sin fecha'
    return new Date(date).toLocaleDateString('es-CL', {
      day: 'numeric',
      month: 'short',
    })
  }

  const getProbabilityColor = (prob: number) => {
    if (prob >= 75) return 'text-green-600 bg-green-50'
    if (prob >= 50) return 'text-blue-600 bg-blue-50'
    if (prob >= 25) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  return (
    <div
      onClick={() => onCardClick?.(item)}
      className="group cursor-pointer rounded-xl bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-1 border border-gray-100"
    >
      {/* Header */}
      <div className="mb-3">
        <h3 className="text-base font-semibold text-gray-900 line-clamp-2 mb-1 group-hover:text-primary-600 transition-colors">
          {item.nombre_cliente}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-1">{item.servicio}</p>
      </div>

      {/* Valor */}
      <div className="mb-3 flex items-center gap-2 rounded-lg bg-primary-50 px-3 py-2">
        <DollarSign className="h-4 w-4 text-primary-600" />
        <span className="text-lg font-bold text-primary-700">
          {formatCurrency(Number(item.valor_estimado))}
        </span>
      </div>

      {/* Detalles */}
      <div className="space-y-2 border-t border-gray-100 pt-3">
        {/* Probabilidad */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Probabilidad</span>
          </div>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getProbabilityColor(
              item.probabilidad
            )}`}
          >
            {item.probabilidad}%
          </span>
        </div>

        {/* Fecha Cierre */}
        {item.fecha_cierre_estimada && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Calendar className="h-3.5 w-3.5" />
              <span>Cierre est.</span>
            </div>
            <span className="text-xs font-medium text-gray-700">
              {formatDate(item.fecha_cierre_estimada)}
            </span>
          </div>
        )}

      </div>

      {/* Notas Preview */}
      {item.notas && (
        <div className="mt-3 border-t border-gray-100 pt-2">
          <p className="text-xs text-gray-500 line-clamp-2 italic">{item.notas}</p>
        </div>
      )}
    </div>
  )
}
