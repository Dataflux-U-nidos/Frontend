import { useState, useEffect, useMemo } from "react";
import { GatsbyTemplate } from "@/components/templates/GatsbyTemplate";
import { SearchFilterBar } from "@/components/molecules/SearchFilterBar";
import { FilterModal, FilterField } from "@/components/molecules/FilterModal";
import { useGetAllMajors, useFilterMajors } from "@/hooks";
import { CareerCard } from "@/components/molecules/CareerCard";
import type { Major, MajorFilters } from "@/types/majorType";


export default function StudentMajorsScreen() {
  const { data: majors, refetch } = useGetAllMajors();
  const { filteredMajors, updateFilters } = useFilterMajors(majors || [], {});

  /* Estado UI */
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState<Record<string, any>>({});

  /* Handlers */
  const handleApplyFilters = (newFilters: Record<string, any>) => {
    setFilters(newFilters);
    updateFilters(newFilters as MajorFilters);
    setShowFilterModal(false);
  };

  const handleSearch = (searchTerm: string) => {
    handleApplyFilters({ ...filters, name: searchTerm });
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  const focusOptions = useMemo(() => {
  if (!majors) return [];
  const uniques = Array.from(new Set(majors.map((m) => m.focus).filter(Boolean)));
  return uniques.map((f) => ({ value: f, label: f }));
}, [majors]);

  /* Filtros disponibles */
  const filterFields: FilterField[] = [
    {
      id: "difficulty",
      label: "Dificultad",
      type: "select",
      options: [
        { value: "EASY", label: "Fácil" },
        { value: "MEDIUM", label: "Media" },
        { value: "HARD", label: "Difícil" },
      ],
    },
    {
      id: "priceMin",
      label: "Precio Mínimo",
      type: "number",
      min: 0,
      placeholder: "Ej: 1 000 000",
    },
    {
      id: "priceMax",
      label: "Precio Máximo",
      type: "number",
      min: 0,
      placeholder: "Ej: 20 000 000",
    },
    {
      id: "focus",
      label: "Enfoque",
      type: "select",
      options: focusOptions,
    },
  ];

  /* Props para SearchFilterBar */
  const searchBarConfig = {
    onSearch: handleSearch,
    onFilter: () => setShowFilterModal(true),
    showFilterButton: true,
    showAddButton: false,
    searchPlaceholder: "Buscar carrera",
  };

  return (
    <>
      {/* Filtros modal */}
      <FilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApplyFilters={handleApplyFilters}
        currentFilters={filters}
        filterFields={filterFields}
        title="Filtrar Carreras"
        description="Selecciona los criterios para filtrar las carreras universitarias"
      />

      {/* Grid de tarjetas */}
      <GatsbyTemplate<Major>
        data={filteredMajors}
        SearchBarComponent={SearchFilterBar}
        searchBarProps={searchBarConfig}
        cardRenderer={(m) => <CareerCard key={m.id} major={m} />}
        pageTitle="Carreras Universitarias"
        pageDescription="Explora las diferentes opciones académicas disponibles para tu formación profesional"
      />

      {/* Notificación opcional */}
    </>
  );
}
