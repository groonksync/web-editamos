import os
import zipfile

def create_zxp(source_folder, output_path):
    print(f"Empaquetando: {source_folder}...")
    with zipfile.ZipFile(output_path, 'w', zipfile.ZIP_DEFLATED) as zxp:
        for root, dirs, files in os.walk(source_folder):
            for file in files:
                file_path = os.path.join(root, file)
                # Crear la ruta relativa para el ZIP
                rel_path = os.path.relpath(file_path, source_folder)
                zxp.write(file_path, rel_path)
    print(f"✅ ¡Éxito! Archivo creado en: {output_path}")

# Configuración
extension_folder = "/Volumes/Groonk 1 TB/Extenciones Adobe/CEP_FXS"
desktop_path = os.path.expanduser("~/Desktop/Studio_Sync_Pro.zxp")

if __name__ == "__main__":
    if os.path.exists(extension_folder):
        create_zxp(extension_folder, desktop_path)
    else:
        print(f"❌ Error: No se encontró la carpeta en {extension_folder}")
