import matplotlib.pyplot as plt

def plot_suspicious_activities(activities):
    """Crea un gráfico de dispersión de las actividades sospechosas."""
    fig, ax = plt.subplots()
    ax.scatter(activities['Id'], activities['Suma_Desviaciones'])
    ax.set_xlabel('ID')
    ax.set_ylabel('Suma_Desviaciones')
    ax.set_xticks(range(0, int(activities['Id'].max()), 5000))
    ax.set_yticks(range(0, int(activities['Suma_Desviaciones'].max()), 10))
    plt.show()