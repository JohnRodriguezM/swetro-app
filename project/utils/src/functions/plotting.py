import matplotlib.pyplot as plt
import base64
from io import BytesIO

def create_plot(df):
  fig, ax = plt.subplots()
  ax.scatter(df['Id'], df['Suma_Desviaciones'])
  ax.set_xlabel('ID')
  ax.set_ylabel('Suma_Desviaciones')
  buf = BytesIO()
  plt.savefig(buf, format='png')
  buf.seek(0)
  image_base64 = base64.b64encode(buf.read()).decode('utf-8')
  return 'data:image/png;base64,' + image_base64