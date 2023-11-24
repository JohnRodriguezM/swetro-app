def identify_suspicious_activities(data, threshold):
    """Identifica las actividades sospechosas."""
    data['Sospechosa'] = data['Suma_Desviaciones'] > threshold
    return data[data['Sospechosa']]