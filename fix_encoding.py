import os

# ContactosTable
contactos_content = """'use client'

import { useEffect, useState } from 'react'
import { Table } from '@/shared/components/Table'
import { Card } from '@/shared/components/Card'
import { supabase } from '@/shared/lib/supabase'
import type { Tables } from '@/shared/types/database'

type Contacto = Tables<'contactos'>

const tipoColors: Record<string, string> = {
  paciente: 'bg-green-100 text-green-800',
  prospecto: 'bg-yellow-100 text-yellow-800',
  referido: 'bg-blue-100 text-blue-800',
  corporativo: 'bg-purple-100 text-purple-800',
}

export function ContactosTable() {
  const [data, setData] = useState<Contacto[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchContactos() {
      const { data, error } = await supabase
        .from('contactos')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching contactos:', error)
      } else {
        setData(data || [])
      }
      setLoading(false)
    }

    fetchContactos()
  }, [])

  const columns = [
    {
      header: 'Nombre Completo',
      accessor: (row: Contacto) => `${row.nombre} ${row.apellido}`,
    },
    { header: 'Email', accessor: 'email' as keyof Contacto },
    { header: 'Telefono', accessor: (row: Contacto) => row.telefono || '-' },
    {
      header: 'Tipo',
      accessor: (row: Contacto) => (
        <span className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${tipoColors[row.tipo]}`}>
          {row.tipo}
        </span>
      ),
    },
    { header: 'Ciudad', accessor: (row: Contacto) => row.ciudad || '-' },
    { header: 'Origen', accessor: (row: Contacto) => row.origen || '-' },
  ]

  if (loading) {
    return (
      <Card>
        <p className="text-center text-gray-500">Cargando contactos...</p>
      </Card>
    )
  }

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Contactos</h2>
        <p className="text-sm text-gray-500">{data.length} contactos</p>
      </div>
      <Table data={data} columns={columns} />
    </Card>
  )
}
"""

with open('src/features/contactos/components/ContactosTable.tsx', 'w', encoding='utf-8') as f:
    f.write(contactos_content)

print('ContactosTable.tsx fixed')
