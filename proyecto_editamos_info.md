# Documentación del Proyecto: EDITAMOS

Este documento contiene toda la información técnica, los servicios implementados y los pasos para mantener la página web funcional y gratuita.

---

## 1. Arquitectura del Proyecto
Para mantener el costo en **$0 USD** y alta fidelidad, utilizamos el siguiente "Stack":

- **Frontend:** HTML5 Semántico + Tailwind CSS (Diseño Liquid Glass).
- **Hosting del Código:** [Vercel](https://vercel.com/) (Plan Hobby - Gratis).
- **Almacenamiento de Medios (Videos/Portafolio):** [Google Drive](https://drive.google.com/) (Tu plan de 5 TB).
- **Base de Datos / Backend de Formularios:** [Google Sheets](https://sheets.google.com/) + Google Apps Script.

---

## 2. Implementación Paso a Paso

### A. Despliegue en Vercel
1. Inicia sesión en tu cuenta de [Vercel](https://vercel.com/).
2. Haz clic en **"Add New..."** -> **"Project"**.
3. Si tienes tu código en GitHub, conéctalo. Si no, puedes arrastrar y soltar la carpeta del proyecto directamente en el área de importación de Vercel.
4. Vercel detectará el archivo `index.html` automáticamente.
5. Haz clic en **"Deploy"**.
6. **Resultado:** Obtendrás un enlace tipo `editamos.vercel.app`.

### B. Uso de Google Drive para Videos (Ahorro de Hosting)
Para que los videos se reproduzcan en la web desde tu Drive:
1. Sube el video a una carpeta en Google Drive.
2. Haz clic derecho en el video -> **Obtener enlace**.
3. Cambia el acceso a **"Cualquier persona con el enlace"**.
4. Copia el ID del archivo (la cadena larga de letras y números en el enlace).
5. Usa este formato para el enlace directo en el código HTML:
   `https://drive.google.com/uc?export=download&id=TU_ID_AQUI`
6. Inserta ese enlace en las etiquetas `<video>` o `<img>` de tu `index.html`.

### C. Formulario con Google Sheets (Backend Gratis)
Para que los datos lleguen a tu Excel de Google:
1. Crea una nueva **Google Sheet**.
2. En el menú, ve a **Extensiones** -> **Apps Script**.
3. Pega el siguiente código (Script de ejemplo):
   ```javascript
   function doPost(e) {
     var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     var data = e.parameter;
     sheet.appendRow([new Date(), data.nombre, data.empresa, data.email, data.telefono]);
     return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
   }
   ```
4. Haz clic en **Implementar** -> **Nueva implementación**.
5. Selecciona **Tipo: Aplicación Web**.
6. En "Quién tiene acceso", selecciona **Cualquier persona**.
7. Copia la **URL de la aplicación web** resultante.
8. En tu `index.html`, cambia la acción del formulario para que apunte a esa URL.

---

## 3. Resumen de Cuentas y Servicios
| Servicio | Uso | Cuenta Relacionada | Costo Mensual |
| :--- | :--- | :--- | :--- |
| **Vercel** | Hosting de código y dominio gratuito | Tu cuenta actual (Hobby) | $0.00 |
| **Google Drive** | Videos, Imágenes y Assets pesados | Cuenta Google IA Pro (5 TB) | Incluido en tu plan |
| **Google Sheets** | Registro de clientes (Leads) | Cuenta Google IA Pro | $0.00 |
| **Gmail** | Notificaciones de contacto | Cuenta Google IA Pro | $0.00 |

---

## 4. Notas para el Futuro (Migración)
- **Cambio de Dominio:** Si compras un `.com`, solo debes ir a la pestaña "Settings" -> "Domains" en Vercel y agregarlo. No necesitas tocar el código.
- **Cambio de Hosting:** Si decides dejar Vercel, solo necesitas llevarte el archivo `index.html` a cualquier otro servidor (Hostinger, Bluehost, etc.). La conexión con Google Drive y Sheets seguirá funcionando igual.
- **Mantenimiento de Videos:** Si borras un video de Drive, dejará de verse en la web. Asegúrate de mantener los IDs de los archivos actualizados en el código.

---

*Documento generado por Antigravity AI - 2024*
