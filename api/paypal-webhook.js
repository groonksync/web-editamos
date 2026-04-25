// api/paypal-webhook.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const body = req.body;

  try {
    // Escuchamos el evento de pago completado de PayPal
    // Nota: En producción Vercel recomienda verificar la firma del webhook con PayPal SDK
    if (body.event_type === 'PAYMENT.SALE.COMPLETED' || body.resource_type === 'sale') {
      
      const email = body.resource?.payer?.email_address || 'comprador@syncpro.com';
      
      // Generar llave única: SYNC-PRO-XXXX-XXXX
      const randomPart = Math.random().toString(36).substring(2, 10).toUpperCase();
      const licenseKey = `SYNC-PRO-${randomPart}`;

      // Insertar en Supabase
      const { error } = await supabase
        .from('licenses')
        .insert([
          { 
            key: licenseKey, 
            email: email, 
            status: 'active' 
          }
        ]);

      if (error) throw error;

      console.log(`[EXITO] Licencia ${licenseKey} creada para ${email}`);
      
      // Aquí podrías añadir un servicio de email (como Resend) para enviar la llave al cliente
    }

    return res.status(200).send('OK');

  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).send('Internal Server Error');
  }
}
