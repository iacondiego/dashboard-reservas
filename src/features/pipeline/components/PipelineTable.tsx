'use client'

import { useEffect, useState } from 'react'
import { Table } from '@/shared/components/Table'
import { Card } from '@/shared/components/Card'
import { supabase } from '@/shared/lib/supabase'
import type { Tables } from '@/shared/types/database'

type Pipeline = Tables<'pipeline'>

const estadoColors: Record<string, string> = {
  lead: 'bg-gray-100 text-gray-800',
  contactado: 'bg-blue-100 text-blue-800',
  consulta_agendada: 'bg-yellow-100 text-yellow-800',
  propuesta: 'bg-purple-100 text-purple-800',
  ganado: 'bg-green-100 text-green-800',
  perdido: 'bg-red-100 text-red-800',
}

const estadoLabels: Record<string, string> = {
  lead: 'Lead',
  contactado: 'Contactado',
  consulta_agendada: 'Consulta Agendada',
  propuesta: 'Propuesta',
  ganado: 'Ganado',
  perdido: 'Perdido',
}

export function PipelineTable() {
  const [data, setData] = useState<Pipeline[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPipeline() {
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

    fetchPipeline()
  }, [])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(value)
  }

  const formatDate = (date: string | null) => {
    if (!date) return '-'
    return new Date(date).toLocaleDateString('es-CL')
  }

  const columns = [
    { header: 'Paciente', accessor: 'nombre_paciente' as keyof Pipeline },
    { header: 'Servicio', accessor: 'servicio' as keyof Pipeline },
    {
      header: 'Estado',
      accessor: (row: Pipeline) => (
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${estadoColors[row.estado]}`}>
          {estadoLabels[row.estado] || row.estado}
        </span>
      ),
    },
    {
      header: 'Valor Estimado',
      accessor: (row: Pipeline) => formatCurrency(Number(row.valor_estimado)),
    },
    {
      header: 'Probabilidad',
      accessor: (row: Pipeline) => `${row.probabilidad}%`,
    },
    {
      header: 'Fecha Cierre Est.',
      accessor: (row: Pipeline) => formatDate(row.fecha_cierre_estimada),
    },
  ]

  if (loading) {
    return (
      <Card>
        <p className="text-center text-gray-500">Cargando pipeline...</p>
      </Card>
    )
  }

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Pipeline de Ventas</h2>
        <p className="text-sm text-gray-500">{data.length} oportunidades</p>
      </div>
      <Table data={data} columns={columns} />
    </Card>
  )
}
