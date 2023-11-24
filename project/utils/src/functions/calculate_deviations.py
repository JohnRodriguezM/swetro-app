# calculate_deviations.py
import pandas as pd

def calculate_deviations(data):
  """Calcula la suma de las desviaciones estándar de cada fila."""
  mean = data.mean()
  std = data.std()
  data['Suma_Desviaciones'] = ((data - mean) / std).sum(axis=1)
  return data