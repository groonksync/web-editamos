# 🚀 ESTADO DEL PROYECTO: Studio Sync Pro Web

Este documento es una guía rápida para retomar el desarrollo en cualquier momento.

## 🛠️ Tecnologías Utilizadas
- **Frontend:** React + Vite + Tailwind CSS.
- **Animaciones:** Framer Motion.
- **Iconos:** Lucide-React.
- **Pagos:** PayPal Business SDK (Hosted Buttons).
- **Base de Datos (Extensión):** Supabase (para validación de licencias).
- **Backend (Web):** Google Apps Script (para el formulario de contacto).

## 📍 Ubicaciones Clave
- **Código Fuente:** `src/App.jsx` (Contiene toda la lógica y diseño).
- **Instalador:** `public/Studio_Sync_Pro.zxp`.
- **Scripts de Automatización:** `actualizar_videos.py` y `empaquetar.py`.

## 💳 Configuración de PayPal
- **Client ID:** `BAAsXBDCHVxt-9cTz_3HQXjl5xfqGd32GXkCiEcl-yZzUjmPBGzvwFo-awTgexUIeKj0LK_zU0VxehbdVk`
- **Hosted Button ID:** `MQ99WW5GG2UN2`
- **Precio:** $9.99 USD.

## 🚧 Tareas Pendientes (To-Do)
1. [ ] **Link Directo de PayPal:** Obtener la URL de redirección para el botón "Obtener Licencia".
2. [ ] **Página de Éxito:** Crear una página `/gracias` donde el usuario sea redirigido tras pagar para descargar la extensión o ver su clave.
3. [ ] **SEO:** Actualizar etiquetas `<title>` y `<meta>` en `index.html`.
4. [ ] **Pruebas de Pago:** Realizar una compra de prueba (puedes bajar el precio a $0.01 temporalmente) para verificar el flujo.

## 🖥️ Comandos de Desarrollo
- `npm run dev`: Inicia el servidor local (Modo Espejo).
- `git add . && git commit -m "mensaje" && git push`: Sube los cambios a la web real.

---
*Guardado el 25 de Abril, 2026*
