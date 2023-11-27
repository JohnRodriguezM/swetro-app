import pandas as pd

def load_data(file_path):
  return pd.read_csv(file_path)

def process_data(df, threshold):
  """
  Process the data by calculating the mean and standard deviation of the DataFrame,
  and then adding two new columns to the DataFrame based on a given threshold.

  Args:
    df (pandas.DataFrame): The input DataFrame.
    threshold (float): The threshold value for determining if a row is suspicious.

  Returns:
    pandas.DataFrame: The processed DataFrame with two additional columns.
  """
  mean = df.mean()
  std = df.std()
  df['Suma_Desviaciones'] = ((df - mean) / std).sum(axis=1)
  df['Sospechosa'] = df['Suma_Desviaciones'] > threshold
  return df