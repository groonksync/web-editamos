// api/validate.js
// Esta función es llamada por la extensión de After Effects para verificar una licencia.

export default async function handler(req, res) {
  // Solo permitir peticiones POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { licenseKey, machineId } = req.body;

  if (!licenseKey || !machineId) {
    return res.status(400).json({ error: 'Faltan datos de validación' });
  }

  try {
    /* 
       AQUÍ CONECTAREMOS CON LA BASE DE DATOS (Supabase o Firebase)
       1. Buscamos si la 'licenseKey' existe.
       2. Si existe, revisamos si ya tiene un 'machineId' asignado.
       3. Si no tiene, se lo asignamos (vinculamos la licencia a esa PC).
       4. Si tiene y no coincide con el actual, denegamos el acceso.
    */

    // SIMULACIÓN TEMPORAL (Esto se reemplazará con la lógica de DB)
    if (licenseKey === 'DEMO-123-456') {
      return res.status(200).json({ 
        valid: true, 
        message: 'Licencia válida para Sync Pro Labs',
        owner: 'Cliente Demo'
      });
    }

    return res.status(401).json({ 
      valid: false, 
      error: 'Licencia inválida o ya está en uso en otro dispositivo.' 
    });

  } catch (error) {
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
