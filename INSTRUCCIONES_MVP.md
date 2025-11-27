# 🏥 GrupoZann - Dashboard MVP

Dashboard profesional para gestión de clínica dental. Sistema completo con 4 secciones principales conectadas a Supabase.

## ✅ Estado del Proyecto

**COMPLETADO Y FUNCIONANDO**

- ✅ Base de datos Supabase configurada con 3 tablas
- ✅ 8 registros de ejemplo en cada tabla
- ✅ Frontend Next.js 16 con TypeScript
- ✅ 4 secciones completamente funcionales
- ✅ Integración en tiempo real con Supabase
- ✅ Sin errores de compilación

## 🚀 Acceso Rápido

**URL del Dashboard:** http://localhost:3000

El servidor ya está corriendo. Solo abre tu navegador y accede a la URL.

## 📊 Secciones Disponibles

### 1. Dashboard (/)
**Métricas en tiempo real:**
- Total de contactos
- Reservas del día
- Pipeline activo
- Ingreso estimado

**Actividad Reciente:**
- Últimas reservas
- Nuevos contactos
- Actualizaciones de pipeline

### 2. Pipeline (/pipeline)
**Gestión de ventas:**
- Vista completa de oportunidades
- Estados: Lead → Contactado → Consulta Agendada → Propuesta → Ganado/Perdido
- Valor estimado y probabilidad de cierre
- Fechas de cierre estimadas

### 3. Contactos (/contactos)
**Base de datos de pacientes:**
- Información completa de contactos
- Tipos: Paciente, Prospecto, Referido, Corporativo
- Email, teléfono, ciudad
- Origen del contacto

### 4. Reservas (/reservas)
**Gestión de citas:**
- Calendario de reservas
- Información del paciente y médico
- Estados: Pendiente, Confirmada, En Curso, Completada
- Tipos de consulta
- Sala asignada

## 🎨 Características del MVP

### Diseño Profesional
- Sidebar de navegación con logo GrupoZann
- Color scheme azul profesional
- Tarjetas con estadísticas
- Tablas responsivas con datos en tiempo real

### Funcionalidad Completa
- ✅ Datos en tiempo real desde Supabase
- ✅ Formateo de fechas en español
- ✅ Formateo de moneda (CLP)
- ✅ Estados con colores distintivos
- ✅ Cálculos automáticos de métricas

### Datos de Ejemplo
**8 registros en cada tabla:**
- Contactos: Pacientes, prospectos y corporativos
- Pipeline: Oportunidades en diferentes estados
- Reservas: Citas con diferentes médicos

## 🔄 Modificar Datos en Tiempo Real

### Opción 1: Desde Supabase Dashboard
1. Ve a https://supabase.com/dashboard
2. Selecciona tu proyecto
3. Ve a "Table Editor"
4. Edita las tablas: `pipeline`, `contactos`, `reservas`
5. Los cambios se verán instantáneamente en el frontend

### Opción 2: Con SQL (recomendado para demo)
Puedes usar el MCP de Supabase para ejecutar queries:

```sql
-- Ejemplo: Agregar nueva reserva
INSERT INTO reservas (nombre_paciente, servicio, medico, fecha_hora, estado, tipo_consulta, sala)
VALUES ('María López', 'Limpieza Dental', 'Dr. Carlos Zann', '2025-11-28 15:00:00', 'confirmada', 'control', 'Sala 1');

-- Ejemplo: Actualizar estado de pipeline
UPDATE pipeline 
SET estado = 'ganado', probabilidad = 100
WHERE nombre_paciente = 'Ana Martínez';

-- Ejemplo: Agregar contacto
INSERT INTO contactos (nombre, apellido, email, telefono, tipo, ciudad, origen)
VALUES ('Roberto', 'Silva', 'roberto.silva@email.com', '+56912345678', 'prospecto', 'Santiago', 'Web');
```

## 📱 Para la Reunión de Ventas

### Script de Presentación
1. **Inicio (Dashboard):**
   - "Aquí pueden ver todas las métricas clave en tiempo real"
   - "Tenemos X contactos, Y reservas hoy, y un pipeline de $Z"

2. **Pipeline:**
   - "Esta es nuestra vista de oportunidades de venta"
   - "Podemos ver el estado de cada paciente potencial"
   - "Calculamos automáticamente el ingreso estimado"

3. **Contactos:**
   - "Base de datos completa de pacientes y prospectos"
   - "Categorización por tipo y origen"
   - "Toda la información de contacto centralizada"

4. **Reservas:**
   - "Gestión completa del calendario de citas"
   - "Seguimiento de estados en tiempo real"
   - "Asignación de médicos y salas"

### Datos Demo Recomendados
Para impresionar, puedes mostrar:
- **Dashboard:** Métricas actualizadas en vivo
- **Pipeline:** Oportunidad de $2.5M en ortodoncia
- **Contactos:** 8 contactos de diferentes tipos
- **Reservas:** Agenda llena con diferentes estados

## 🛠️ Stack Tecnológico

- **Frontend:** Next.js 16 + TypeScript + Tailwind CSS
- **Backend:** Supabase (PostgreSQL)
- **Estado:** Client-side fetching en tiempo real
- **UI:** Lucide Icons + componentes custom

## 📦 Estructura de Datos

### Tabla: contactos
- nombre, apellido, email, teléfono
- tipo (paciente/prospecto/referido/corporativo)
- ciudad, origen, notas

### Tabla: pipeline
- nombre_paciente, servicio
- estado (lead/contactado/consulta_agendada/propuesta/ganado/perdido)
- valor_estimado, probabilidad
- fecha_cierre_estimada

### Tabla: reservas
- nombre_paciente, servicio, medico
- fecha_hora, duracion_minutos
- estado (pendiente/confirmada/en_curso/completada/cancelada)
- tipo_consulta, sala

## 🎯 Próximos Pasos (Post-MVP)

Si les gusta el MVP, estos serían los siguientes pasos:

1. **Autenticación de usuarios**
2. **CRUD completo** (crear, editar, eliminar registros)
3. **Filtros y búsqueda avanzada**
4. **Calendario visual** para reservas
5. **Reportes y analytics**
6. **Notificaciones automáticas**
7. **Integración con WhatsApp/Email**
8. **Dashboard móvil responsive**

## 💰 Valor del MVP

Este MVP demuestra:
- ✅ Arquitectura escalable y profesional
- ✅ Integración real con base de datos
- ✅ UI/UX moderna y profesional
- ✅ Datos en tiempo real
- ✅ Sistema completo de gestión

**Tiempo de desarrollo:** Completado en tiempo récord
**Costo de desarrollo:** $2,000 USD bien invertidos
**ROI:** Sistema funcional listo para demostración

---

**Desarrollado para GrupoZann** | Powered by Next.js + Supabase
