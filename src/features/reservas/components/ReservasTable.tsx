'use client'

import { useEffect, useState } from 'react'
import { Table } from '@/shared/components/Table'
import { Card } from '@/shared/components/Card'
import { Button } from '@/shared/components/Button'
import { supabase } from '@/shared/lib/supabase'
import type { Tables } from '@/shared/types/database'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import {
  Calendar,
  Clock,
  User,
  Stethoscope,
  Building2,
  Filter,
  Download,
  RefreshCw,
  Search,
} from 'lucide-react'

type Reserva = Tables<'reservas'>

const estadoConfig: Record<string, { bg: string; text: string; icon: string }> = {
  pendiente: { bg: 'bg-yellow-50', text: 'text-yellow-700', icon: '🕐' },
  confirmada: { bg: 'bg-green-50', text: 'text-green-700', icon: '✓' },
  en_curso: { bg: 'bg-blue-50', text: 'text-blue-700', icon: '▶' },
  completada: { bg: 'bg-gray-50', text: 'text-gray-700', icon: '✓✓' },
  cancelada: { bg: 'bg-red-50', text: 'text-red-700', icon: '✗' },
  no_asistio: { bg: 'bg-orange-50', text: 'text-orange-700', icon: '⚠' },
}

const tipoConsultaConfig: Record<string, { label: string; color: string }> = {
  primera_vez: { label: 'Primera Vez', color: 'text-purple-600' },
  control: { label: 'Control', color: 'text-blue-600' },
  urgencia: { label: 'Urgencia', color: 'text-red-600' },
  procedimiento: { label: 'Procedimiento', color: 'text-green-600' },
}

export function ReservasTable() {
  const [data, setData] = useState<Reserva[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterEstado, setFilterEstado] = useState<string>('todas')

  useEffect(() => {
    fetchReservas()
  }, [])

  async function fetchReservas() {
    setLoading(true)
    const { data, error } = await supabase
      .from('reservas')
      .select('*')
      .order('fecha_hora', { ascending: true })

    if (error) {
      console.error('Error fetching reservas:', error)
    } else {
      setData(data || [])
    }
    setLoading(false)
  }

  const filteredData = data.filter((reserva) => {
    const matchesSearch =
      reserva.nombre_paciente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reserva.servicio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reserva.medico.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesEstado = filterEstado === 'todas' || reserva.estado === filterEstado

    return matchesSearch && matchesEstado
  })

  const formatDateTime = (date: string) => {
    return format(new Date(date), "dd MMM yyyy 'a las' HH:mm", { locale: es })
  }

  const formatDate = (date: string) => {
    return format(new Date(date), 'dd MMM yyyy', { locale: es })
  }

  const formatTime = (date: string) => {
    return format(new Date(date), 'HH:mm', { locale: es })
  }

  const columns = [
    {
      header: 'Paciente',
      accessor: (row: Reserva) => (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100">
            <User className="h-5 w-5 text-primary-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">{row.nombre_paciente}</p>
            <p className="text-xs text-gray-500">{row.servicio}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Médico',
      accessor: (row: Reserva) => (
        <div className="flex items-center gap-2">
          <Stethoscope className="h-4 w-4 text-gray-400" />
          <span className="text-gray-700">{row.medico}</span>
        </div>
      ),
    },
    {
      header: 'Fecha y Hora',
      accessor: (row: Reserva) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-gray-700">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span className="font-medium">{formatDate(row.fecha_hora)}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="text-sm">{formatTime(row.fecha_hora)}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Tipo',
      accessor: (row: Reserva) => {
        const config = tipoConsultaConfig[row.tipo_consulta]
        return (
          <span className={`text-sm font-medium ${config?.color || 'text-gray-600'}`}>
            {config?.label || row.tipo_consulta}
          </span>
        )
      },
      align: 'center' as const,
    },
    {
      header: 'Estado',
      accessor: (row: Reserva) => {
        const config = estadoConfig[row.estado]
        return (
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${config?.bg} ${config?.text} border border-current/20`}
          >
            <span>{config?.icon}</span>
            <span className="capitalize">{row.estado.replace('_', ' ')}</span>
          </span>
        )
      },
      align: 'center' as const,
    },
    {
      header: 'Sala',
      accessor: (row: Reserva) => (
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-gray-400" />
          <span className="text-gray-700">{row.sala || '-'}</span>
        </div>
      ),
      align: 'center' as const,
    },
  ]

  if (loading) {
    return (
      <Card className="animate-pulse">
        <div className="space-y-4">
          <div className="h-8 w-48 rounded bg-gray-200"></div>
          <div className="h-64 rounded bg-gray-100"></div>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header con estadísticas */}
      <div className="grid gap-5 md:grid-cols-4">
        <Card hover padding="md" shadow="sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-2">
                Total Reservas
              </p>
              <p className="text-3xl font-bold text-gray-900">{data.length}</p>
            </div>
            <div className="rounded-xl bg-blue-100 p-4">
              <Calendar className="h-7 w-7 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card hover padding="md" shadow="sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-2">
                Confirmadas
              </p>
              <p className="text-3xl font-bold text-green-600">
                {data.filter((r) => r.estado === 'confirmada').length}
              </p>
            </div>
            <div className="rounded-xl bg-green-100 p-4">
              <span className="text-3xl">✓</span>
            </div>
          </div>
        </Card>

        <Card hover padding="md" shadow="sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-2">
                Pendientes
              </p>
              <p className="text-3xl font-bold text-yellow-600">
                {data.filter((r) => r.estado === 'pendiente').length}
              </p>
            </div>
            <div className="rounded-xl bg-yellow-100 p-4">
              <Clock className="h-7 w-7 text-yellow-600" />
            </div>
          </div>
        </Card>

        <Card hover padding="md" shadow="sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-2">
                En Curso
              </p>
              <p className="text-3xl font-bold text-blue-600">
                {data.filter((r) => r.estado === 'en_curso').length}
              </p>
            </div>
            <div className="rounded-xl bg-blue-100 p-4">
              <span className="text-3xl">▶</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Filtros y acciones */}
      <Card>
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por paciente, médico o servicio..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <select
              value={filterEstado}
              onChange={(e) => setFilterEstado(e.target.value)}
              className="rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
            >
              <option value="todas">Todos los estados</option>
              <option value="pendiente">Pendiente</option>
              <option value="confirmada">Confirmada</option>
              <option value="en_curso">En Curso</option>
              <option value="completada">Completada</option>
              <option value="cancelada">Cancelada</option>
              <option value="no_asistio">No Asistió</option>
            </select>

            <Button
              variant="outline"
              size="md"
              onClick={fetchReservas}
              icon={<RefreshCw className="h-4 w-4" />}
            >
              Actualizar
            </Button>

            <Button
              variant="primary"
              size="md"
              icon={<Download className="h-4 w-4" />}
            >
              Exportar
            </Button>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Mostrando <span className="font-semibold">{filteredData.length}</span> de{' '}
            <span className="font-semibold">{data.length}</span> reservas
          </p>
        </div>

        <Table data={filteredData} columns={columns} striped hoverable />
      </Card>
    </div>
  )
}
