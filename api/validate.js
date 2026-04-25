// api/validate.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { licenseKey, machineId } = req.body;

  try {
    const { data: license, error } = await supabase
      .from('licenses')
      .select('*')
      .eq('key', licenseKey)
      .single();

    if (error) {
      console.error('Supabase Error:', error);
      // Enviamos el error detallado para saber qué pasa
      return res.status(401).json({ 
        valid: false, 
        error: `Error de BD: ${error.message}. Verifica que la tabla 'licenses' tenga una columna 'key'.` 
      });
    }

    if (!license) {
      return res.status(401).json({ valid: false, error: 'Licencia no encontrada en la base de datos.' });
    }

    if (!license.machine_id) {
      await supabase.from('licenses').update({ machine_id: machineId }).eq('id', license.id);
      return res.status(200).json({ valid: true });
    }

    if (license.machine_id !== machineId) {
      return res.status(401).json({ valid: false, error: 'Licencia vinculada a otra PC.' });
    }

    return res.status(200).json({ valid: true });

  } catch (err) {
    return res.status(500).json({ valid: false, error: `Error interno: ${err.message}` });
  }
}
