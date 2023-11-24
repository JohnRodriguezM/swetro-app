import pandas as pd

def load_data(file_path, chunk_size=50000):
  """Carga los datos desde un archivo CSV en bloques."""
  chunks = []
  for chunk in pd.read_csv(file_path, chunksize=chunk_size):
    chunks.append(chunk)
  return pd.concat(chunks, ignore_index=True)