import re
import os

def extract_id(url):
    # Extrae el ID de diferentes formatos de enlaces de Google Drive
    patterns = [
        r'/file/d/([a-zA-Z0-9_-]+)',
        r'id=([a-zA-Z0-9_-]+)',
        r'([a-zA-Z0-9_-]+)$'
    ]
    for pattern in patterns:
        match = re.search(pattern, url)
        if match:
            return match.group(1)
    return None

def update_video(card_index, drive_url):
    file_path = 'src/App.jsx'
    
    if not os.path.exists(file_path):
        print(f"Error: No se encontró el archivo {file_path}")
        return

    new_id = extract_id(drive_url)
    if not new_id:
        print("Error: No se pudo extraer un ID válido del enlace proporcionado.")
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Buscamos el array videoIds
    # El array se ve así: "ID_VIDEO", // Cuadro X
    pattern = rf'"([a-zA-Z0-9_-]+)", // Cuadro {card_index}'
    
    if not re.search(pattern, content):
        print(f"Error: No se encontró el marcador '// Cuadro {card_index}' en App.jsx.")
        return

    new_content = re.sub(pattern, f'"{new_id}", // Cuadro {card_index}', content)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"✅ ¡Éxito! El cuadro #{card_index} ha sido actualizado con el nuevo video en React.")

if __name__ == "__main__":
    print("--- GESTOR DE VIDEOS SYNC PRO (REACT) ---")
    link = input("1. Pega el enlace de Google Drive: ").strip()
    try:
        cuadro = int(input("2. ¿En qué cuadro quieres ponerlo? (1 al 5): "))
        update_video(cuadro, link)
    except ValueError:
        print("Error: Por favor introduce un número válido para el cuadro.")
