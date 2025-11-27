'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/shared/lib/supabase'
import type { Tables } from '@/shared/types/database'
import { KanbanCard } from './KanbanCard'
import { Plus, DollarSign, TrendingUp } from 'lucide-react'

type Pipeline = Tables<'pipeline'>

type EstadoPipeline = 'lead' | 'contactado' | 'consulta_agendada' | 'propuesta' | 'ganado' | 'perdido'

interface KanbanColumn {
  id: EstadoPipeline
  title: string
  color: string
  bgColor: string
  icon: string
}

const columns: KanbanColumn[] = [
  {
    id: 'lead',
    title: 'Nuevo Lead',
    color: 'text-gray-700',
    bgColor: 'bg-gray-50',
    icon: '💡',
  },
  {
    id: 'contactado',
    title: 'Contactado',
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    icon: '📞',
  },
  {
    id: 'consulta_agendada',
    title: 'Consulta Agendada',
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-50',
    icon: '📅',
  },
  {
    id: 'propuesta',
    title: 'Propuesta Enviada',
    color: 'text-purple-700',
    bgColor: 'bg-purple-50',
    icon: '📄',
  },
  {
    id: 'ganado',
    title: 'Ganado',
    color: 'text-green-700',
    bgColor: 'bg-green-50',
    icon: '✅',
  },
  {
    id: 'perdido',
    title: 'Perdido',
    color: 'text-red-700',
    bgColor: 'bg-red-50',
    icon: '❌',
  },
]

export function KanbanBoard() {
  const [data, setData] = useState<Pipeline[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPipeline()
  }, [])

  async function fetchPipeline() {
    setLoading(true)
    const { data, error } = await supabase
      .from('pipeline')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching pipeline:', error)
    } else {
      setData(data || [])
    }
    setLoading(false)
  }

  const getItemsByStatus = (status: EstadoPipeline) => {
    return data.filter((item) => item.estado === status)
  }

  const getTotalValueByStatus = (status: EstadoPipeline) => {
    const items = getItemsByStatus(status)
    const total = items.reduce((sum, item) => sum + Number(item.valor_estimado), 0)
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(total)
  }

  const getWeightedValueByStatus = (status: EstadoPipeline) => {
    const items = getItemsByStatus(status)
    const total = items.reduce(
      (sum, item) => sum + Number(item.valor_estimado) * (item.probabilidad / 100),
      0
    )
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(total)
  }

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600"></div>
          <p className="text-lg font-medium text-gray-600">Cargando pipeline...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 p-6 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="h-6 w-6" />
            <h3 className="text-sm font-medium opacity-90">Valor Total Pipeline</h3>
          </div>
          <p className="text-3xl font-bold">
            {new Intl.NumberFormat('es-CL', {
              style: 'currency',
              currency: 'CLP',
              minimumFractionDigits: 0,
            }).format(data.reduce((sum, item) => sum + Number(item.valor_estimado), 0))}
          </p>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-green-500 to-green-600 p-6 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="h-6 w-6" />
            <h3 className="text-sm font-medium opacity-90">Valor Ponderado</h3>
          </div>
          <p className="text-3xl font-bold">
            {new Intl.NumberFormat('es-CL', {
              style: 'currency',
              currency: 'CLP',
              minimumFractionDigits: 0,
            }).format(
              data.reduce(
                (sum, item) => sum + Number(item.valor_estimado) * (item.probabilidad / 100),
                0
              )
            )}
          </p>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 p-6 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h3 className="text-sm font-medium opacity-90">Oportunidades Activas</h3>
          </div>
          <p className="text-3xl font-bold">{data.length}</p>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="overflow-x-auto pb-4 scrollbar-custom">
        <div className="flex gap-4 min-w-max">
          {columns.map((column) => {
            const items = getItemsByStatus(column.id)
            const totalValue = getTotalValueByStatus(column.id)
            const weightedValue = getWeightedValueByStatus(column.id)

            return (
              <div
                key={column.id}
                className="w-80 flex-shrink-0 rounded-xl bg-gray-50 p-4 shadow-sm"
              >
                {/* Column Header */}
                <div className="mb-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{column.icon}</span>
                      <h3 className={`text-base font-bold ${column.color}`}>
                        {column.title}
                      </h3>
                    </div>
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700">
                      {items.length}
                    </span>
                  </div>

                  {/* Column Stats */}
                  <div className={`rounded-lg ${column.bgColor} p-3 space-y-1`}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-gray-600">Total:</span>
                      <span className={`font-bold ${column.color}`}>{totalValue}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-gray-600">Ponderado:</span>
                      <span className={`font-semibold ${column.color}`}>
                        {weightedValue}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Cards Container */}
                <div className="space-y-3 max-h-[calc(100vh-28rem)] overflow-y-auto scrollbar-custom pr-1">
                  {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                      <svg
                        className="mb-3 h-12 w-12"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                        />
                      </svg>
                      <p className="text-sm font-medium">Sin oportunidades</p>
                    </div>
                  ) : (
                    items.map((item) => <KanbanCard key={item.id} item={item} />)
                  )}
                </div>

                {/* Add Button */}
                <button className="mt-3 w-full rounded-lg border-2 border-dashed border-gray-300 p-3 text-sm font-medium text-gray-500 transition-all hover:border-primary-400 hover:bg-primary-50 hover:text-primary-600">
                  <div className="flex items-center justify-center gap-2">
                    <Plus className="h-4 w-4" />
                    <span>Agregar oportunidad</span>
                  </div>
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
