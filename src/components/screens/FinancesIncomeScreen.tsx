import { IncomeItem } from '@/types/financeIncomesType';
import FinanciesPartialTemplate from '../templates/FinancesIncomeTemplate';
import { useEffect, useState } from 'react';
import { useGetIncomes } from '@/hooks/finances/useGetIncomesHook';
import LoadingTemplate from '../templates/LoadingTemplate';


const incomeData = [
  { university: 'Universidad Nacional', suscription: 'Premium', cost: 1500.50 },
  { university: 'Universidad de los Andes', suscription: 'Básica', cost: 800.25 },
  { university: 'Universidad Javeriana', suscription: 'Premium', cost: 2000.75 },
  { university: 'Universidad del Rosario', suscription: 'Estándar', cost: 1200.00 },
  { university: 'Universidad Nacional', suscription: 'Premium', cost: 1500.50 },
  { university: 'Universidad de los Andes', suscription: 'Básica', cost: 800.25 },
  { university: 'Universidad Javeriana', suscription: 'Premium', cost: 2000.75 },
  { university: 'Universidad del Rosario', suscription: 'Estándar', cost: 1200.00 },

];

export default function FinancesMainScreen() {
  // const { mutateAsync: getIncomes } = useGetIncomes();
  // const [incomeData, setIncomeData] = useState<IncomeItem[]>([]);
  // const [totalCost, setTotalCost] = useState<number>(0);
  
  // useEffect(() => {
  //   // Función para cargar los datos
  //   const loadIncomeData = async () => {
  //     try {
  //       const result = await getIncomes();
        
  //       if (result && result.data) {
  //         setIncomeData(result.data);
          
  //         // Establecer el total
  //         if (result.total !== undefined) {
  //           setTotalCost(result.total);
  //         } else {
  //           // Calcular suma de todos los costos si no viene el total
  //           const sum = result.data.reduce((acc, item) => acc + item.cost, 0);
  //           setTotalCost(sum);
  //         }
  //       }
  //     } catch (err) {
  //       console.error("Error fetching income data:", err);
  //     }
  //   };
  
  //   // Llamar a la función cuando el componente se monta
  //   loadIncomeData();
  // }, [getIncomes]);
  const totalCost = incomeData.reduce((sum, row) => sum + row.cost, 0);

  
  // Mostrar spinner mientras se cargan los datos
  if ( incomeData.length === 0) {
    return (
      <div>
        <LoadingTemplate/>
      </div>
    );
  }
  
  return (
    <div>
      <FinanciesPartialTemplate 
        data={incomeData} 
        title='Ingresos por Universidad' 
        totalCost={totalCost}
      />
    </div>
  );
}