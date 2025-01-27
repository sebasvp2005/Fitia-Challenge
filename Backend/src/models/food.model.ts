export interface Food {
	// Nombre del alimento
  name: string;
  
  // URL del ícono del alimento
  iconURL: string;
  
  // Categoría de macro a la que el alimento pertenece
  // Unicamente puede ser: “protein” | “carb” | “fat”
  macroType: 'protein' | 'carb' | 'fat';
  
  // Indica si el alimento se puede incluir en el desayuno
  includeInBreakfast: boolean;
  
  // Indica si el alimento se puede incluir en el almuerzo
  includeInLunch: boolean;
  
  // Indica si el alimento se puede incluir en la cena
  includeInDinner: boolean;
	
	// Calorías por gramo del alimento
  caloriesPerGram: number;
  
  // Grasas por gramo del alimento
  fatPerGram: number;
  
  // Carbohidratos por gramo del alimento
  carbsPerGram: number;
  
  // Proteínas por gramo del alimento
  proteinPerGram: number;
  
  // Peso mínimo que puede tomar el alimento
  minSize: number;
  
  // Peso máximo que puede tomar el alimento
  maxSize: number;
  
  // Intervalos de peso que pueden tomar los pesos del alimento
  sizeIntervals: number;
  
  // Nombre de la porción del alimento. Ejemplo: “taza”
  servingName: string;
  
  // Cantidad de porciones del alimento. Ejemplo: 1
  servingNumber: number;
  
  // Peso de la porción del alimento. Ejemplo: 200
  servingSize: number;
  
  // Unidad del peso de la porción. Siempre será "g"
  servingUnit: "g";
}