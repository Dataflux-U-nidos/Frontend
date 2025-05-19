// Función utilitaria para manejar nombres correctamente
export const parseFullName = (name: string, lastName: string): { firstName: string; lastName: string } => {
  // Si ya tenemos lastName separado, lo usamos directamente
  if (lastName && lastName.trim()) {
    return {
      firstName: name || '',
      lastName: lastName
    };
  }
  
  // Si solo tenemos el nombre completo en `name`, lo separamos
  const fullName = name || '';
  const nameParts = fullName.trim().split(/\s+/);
  
  if (nameParts.length === 0) {
    return { firstName: '', lastName: '' };
  }
  
  if (nameParts.length === 1) {
    return { firstName: nameParts[0], lastName: '' };
  }
  
  // Si hay múltiples palabras, tomamos la primera como firstName
  // y el resto como lastName
  return {
    firstName: nameParts[0],
    lastName: nameParts.slice(1).join(' ')
  };
};

// Función para combinar firstName y lastName en un nombre completo
export const combineNames = (firstName: string, lastName: string): string => {
  return [firstName, lastName].filter(Boolean).join(' ').trim();
};