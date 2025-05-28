import { useGetCampaingsCosts } from "@/hooks/finances/useGetCampaingsCostsHook";
import CampaignCostsTemplate from "../templates/FinancesCampaingsTemplate";
import { useEffect, useState } from "react";
import { campaingsCosts } from "../../types/campaingsCostsType";
import LoadingTemplate from "../templates/LoadingTemplate";

export default function FinancesCampaingsScreen() {
  const { mutateAsync: getCampaignCosts } = useGetCampaingsCosts();
  const [campaignData, setCampaignData] = useState<campaingsCosts | null>(null);

  useEffect(() => {
    // Función para cargar los datos
    const loadCampaignCosts = async () => {
      try {
        const result = await getCampaignCosts();
        setCampaignData(result);
      } catch (err) {
        console.error("Error fetching campaign costs:", err);
      }
    };

    // Llamar a la función cuando el componente se monta
    loadCampaignCosts();
  }, [getCampaignCosts]);

  if (!campaignData) {
    return (
      <div>
        <LoadingTemplate/>
      </div>
    );
  } else {
    return (
      <CampaignCostsTemplate
        schoolCampaignCost={campaignData?.scholarTotal}
        universityCampaignCost={campaignData?.universityTotal}
        totalCampaignCosts={campaignData?.total}
      />
    );
  }
}
