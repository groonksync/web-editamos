// api/paypal-webhook.js
// Esta función recibe notificaciones de PayPal cuando se completa un pago.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  // PayPal envía los datos del evento en el cuerpo de la petición
  const event = req.body;

  try {
    // 1. Verificamos que el pago sea exitoso
    // Nota: En producción debemos verificar la firma del Webhook de PayPal
    if (event.event_type === 'PAYMENT.SALE.COMPLETED' || event.resource_type === 'sale') {
      
      const customerEmail = event.resource?.payer?.email_address || 'cliente@desconocido.com';
      
      // 2. Generamos una clave única (Ejemplo: SYNC-PRO-XXXX-XXXX)
      const newLicenseKey = `SYNC-PRO-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

      /* 
         AQUÍ GUARDAREMOS EN LA BASE DE DATOS:
         - Key: newLicenseKey
         - Email: customerEmail
         - Status: active
      */

      console.log(`PAGO EXITOSO: Licencia ${newLicenseKey} generada para ${customerEmail}`);
      
      // 3. Opcional: Enviar email automático con la clave
      // (Podemos usar un servicio gratuito como Resend o SendGrid)
    }

    // Siempre responder 200 a PayPal para confirmar recepción
    return res.status(200).send('Webhook Received');

  } catch (error) {
    console.error('Error en Webhook:', error);
    return res.status(500).send('Internal Server Error');
  }
}
