"""from pathlib import Path

from functions.load_data import load_data
from functions.calculate_deviations import calculate_deviations
from functions.identify_suspicious_activities import identify_suspicious_activities
from functions.plot_suspicious_activities import plot_suspicious_activities

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

def main():
    # Configurar pandas para mostrar todas las columnas
    pd.set_option('display.max_columns', None)
    # Cargar los datos
    dir_path = Path(__file__).parent
    file_path = dir_path / 'swetroDeveloperTest.csv'
    datos = load_data(file_path)
    # Calcular las desviaciones
    datos = calculate_deviations(datos)
    # Identificar las actividades sospechosas
    umbral = 5
    actividades_sospechosas = identify_suspicious_activities(datos, umbral)
    # Imprimir detalles de las actividades sospechosas
    print("Actividades Sospechosas:")
    print(actividades_sospechosas[['Id', 'Sospechosa', 'Suma_Desviaciones']])
    print(f"Número de actividades sospechosas: {len(actividades_sospechosas)}")
    # Crear el gráfico
    plot_suspicious_activities(actividades_sospechosas)

if __name__ == "__main__":
    main()

"""


from pathlib import Path
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import sys
import base64
from io import BytesIO
import json

# Obtener la ruta del directorio actual
dir_path = Path(__file__).parent

# Construir la ruta del archivo
file_path = dir_path / 'swetroDeveloperTest.csv'

# Ahora puedes usar file_path con pandas
datos = pd.read_csv(file_path)

# Configurar pandas para mostrar todas las columnas
pd.set_option('display.max_columns', None)

# Calcular la media y la desviación estándar de cada columna
mean = datos.mean()
std = datos.std()

# Calcular la suma de las desviaciones estándar de cada fila
datos['Suma_Desviaciones'] = ((datos - mean) / std).sum(axis=1)

# Definir las actividades sospechosas
umbral = 5 # ajusta este valor según tus expectativas
datos['Sospechosa'] = datos['Suma_Desviaciones'] > umbral

# Filtrar las actividades sospechosas
actividades_sospechosas = datos[datos['Sospechosa']]

# Crear una figura y un eje
fig, ax = plt.subplots()

# Crear un gráfico de dispersión con los ID y los valores de 'Suma_Desviaciones' de las actividades sospechosas
ax.scatter(actividades_sospechosas['Id'], actividades_sospechosas['Suma_Desviaciones'])

# Establecer las etiquetas de los ejes
ax.set_xlabel('ID')
ax.set_ylabel('Suma_Desviaciones')

# Guardar el gráfico en un objeto BytesIO
buf = BytesIO()
plt.savefig(buf, format='png')
buf.seek(0)

# Convertir la imagen en una cadena de base64
image_base64 = base64.b64encode(buf.read()).decode('utf-8')

# Convertir la cadena de base64 en una URL de datos
image_data_url = 'data:image/png;base64,' + image_base64

# Convertir el DataFrame a JSON
data_json = actividades_sospechosas[['Id', 'Sospechosa', 'Suma_Desviaciones']].to_json(orient='records')

# Imprimir el JSON y la imagen en base64
print(json.dumps({'data': data_json, 'image': image_data_url}))

# Imprimir el número de actividades sospechosas a stderr
sys.stderr.write(f"Número de actividades sospechosas: {len(actividades_sospechosas)}\n")
"""# Crear una figura y un eje
fig, ax = plt.subplots()

# Crear un gráfico de dispersión con los ID y los valores de 'Suma_Desviaciones' de las actividades sospechosas
ax.scatter(actividades_sospechosas['Id'], actividades_sospechosas['Suma_Desviaciones'])

# Establecer las etiquetas de los ejes
ax.set_xlabel('ID')
ax.set_ylabel('Suma_Desviaciones')

# Establecer las marcas en los ejes x e y
ax.set_xticks(range(0, int(actividades_sospechosas['Id'].max()), 5000))
ax.set_yticks(range(0, int(actividades_sospechosas['Suma_Desviaciones'].max()), 10))

# Mostrar el gráfico
plt.show()"""