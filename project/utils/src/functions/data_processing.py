import pandas as pd

def load_data(file_path):
  return pd.read_csv(file_path)

def process_data(df, threshold):
  mean = df.mean()
  std = df.std()
  df['Suma_Desviaciones'] = ((df - mean) / std).sum(axis=1)
  df['Sospechosa'] = df['Suma_Desviaciones'] > threshold
  return df