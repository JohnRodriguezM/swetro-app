import sys
import json
from pathlib import Path
from functions.data_processing import load_data, process_data
from functions.plotting import create_plot

def main():
    """
    This script loads data from a CSV file, processes it, and generates a plot and JSON output.
    It takes two optional command line arguments: page and limit.
    If no arguments are provided, default values of page=1 and limit=10 are used.
    """
    try:
        page = int(sys.argv[1])
        limit = int(sys.argv[2])
    except IndexError:
        page = 1
        limit = 10

    offset = (page - 1) * limit
    file_path = Path(__file__).parent / 'swetroDeveloperTest.csv'
    threshold = 3

    data = load_data(file_path)
    processed_data = process_data(data, threshold)
    suspicious_activities = processed_data[processed_data['Sospechosa']].iloc[offset:offset+limit]

    image_data_url = create_plot(suspicious_activities)
    data_json = suspicious_activities[['Id', 'Sospechosa', 'Suma_Desviaciones']].to_json(orient='records')

    result = {
        'data': data_json,
        'image': image_data_url
    }

    result_json = json.dumps(result)
    print(result_json)
    sys.stderr.write(f"Número de actividades sospechosas: {len(suspicious_activities)}\n")

if __name__ == "__main__":
    main()
