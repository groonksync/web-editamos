// api/validate.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { licenseKey, machineId } = req.body;

  if (!licenseKey || !machineId) {
    return res.status(400).json({ valid: false, error: 'Faltan datos de validación.' });
  }

  try {
    // 1. Buscar la licencia en Supabase
    const { data: license, error } = await supabase
      .from('licenses')
      .select('*')
      .eq('key', licenseKey)
      .single();

    if (error || !license) {
      return res.status(401).json({ valid: false, error: 'La licencia no existe o es inválida.' });
    }

    // 2. Verificar estado de la licencia
    if (license.status !== 'active') {
      return res.status(401).json({ valid: false, error: 'Esta licencia ha sido desactivada.' });
    }

    // 3. Lógica de Machine ID (Vinculación)
    if (!license.machine_id) {
      // Primera activación: Guardamos el ID de esta PC
      const { error: updateError } = await supabase
        .from('licenses')
        .update({ machine_id: machineId })
        .eq('id', license.id);
      
      if (updateError) throw updateError;
      
      return res.status(200).json({ valid: true, message: 'Activación exitosa.' });
    }

    if (license.machine_id !== machineId) {
      // Intento de uso en otra PC
      return res.status(401).json({ 
        valid: false, 
        error: 'Esta licencia ya está vinculada a otra computadora. Contacta a soporte.' 
      });
    }

    // Licencia ya vinculada y correcta
    return res.status(200).json({ valid: true, message: 'Licencia válida.' });

  } catch (error) {
    console.error('Error validation:', error);
    return res.status(500).json({ valid: false, error: 'Error interno del servidor.' });
  }
}
