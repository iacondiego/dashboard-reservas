import Link from 'next/link'
import { Calendar, TrendingUp, BarChart3 } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Bienvenido al Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Selecciona una sección para comenzar
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Link
            href="/reservas"
            className="group block bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-blue-100 group-hover:bg-blue-200 transition-colors">
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                Reservas
              </h2>
            </div>
            <p className="text-gray-600">
              Gestiona las reservas de pacientes, citas médicas y agenda
            </p>
          </Link>

          <Link
            href="/pipeline"
            className="group block bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-green-100 group-hover:bg-green-200 transition-colors">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                Pipeline
              </h2>
            </div>
            <p className="text-gray-600">
              Visualiza y gestiona el pipeline de ventas con tablero Kanban
            </p>
          </Link>

          <div className="group block bg-gray-100 rounded-xl p-8 shadow-sm cursor-not-allowed opacity-60">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-gray-300">
                <BarChart3 className="h-8 w-8 text-gray-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-700">
                Reportes
              </h2>
            </div>
            <p className="text-gray-500">
              Próximamente - Análisis y reportes detallados
            </p>
          </div>

          <div className="group block bg-gray-100 rounded-xl p-8 shadow-sm cursor-not-allowed opacity-60">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-gray-300">
                <svg className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-700">
                Configuración
              </h2>
            </div>
            <p className="text-gray-500">
              Próximamente - Configuración del sistema
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
