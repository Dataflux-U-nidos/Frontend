import { DynamicTable } from '../organisms/DynamicTable';

interface IncomeData {
  university: string;
  suscription: string;
  cost: number;
}

interface PartialIncomesTemplateProps {
  data: IncomeData[];
  title?: string;
  caption?: string;
  totalCost: number;
}

export default function PartialIncomesTemplate({
  data,
  title,
  caption,
  totalCost
}: PartialIncomesTemplateProps) {
  // Calculate total cost

  // Add total row
  const dataWithTotal: IncomeData[] = [
    ...data,
    {
      university: 'Total',
      suscription: '',
      cost: totalCost,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {title}
        </h1>
        <DynamicTable
          data={dataWithTotal}
          caption={caption}
          rowsPerPage={5}
        />
      </div>
    </div>
  );
}
