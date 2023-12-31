class Excepcion:

    def __init__(self, tipo, desc, fila, columna):
        self.tipo = tipo
        self.desc = desc
        self.fila = fila
        self.columna = columna
    
    def __str__(self):
        return f"Excepcion -> Tipo: {self.tipo}, Desc: {self.desc}, Fila: {self.fila}, Columna: {self.columna}"
    
    def toString(self):
        return self.tipo + ' - ' + self.desc + ' [' + str(self.fila) + ', ' + str(self.columna) + '];'