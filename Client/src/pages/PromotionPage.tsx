import React from 'react'
import { DashboardLayout } from '@components/dashboards/DashboardLayout'
import { PromotionTab } from '@components/dashboards/PromotionTab'

type PromotionPageProps = {
  embedded?: boolean;
};

export const PromotionPage: React.FC<PromotionPageProps> = ({
  embedded = false,
}) => {
  if (embedded) return <PromotionTab />;

  return (
    <DashboardLayout
      title="Promotions & Resources"
      subtitle="Discover more learning opportunities and connect with the developer"
    >
      <PromotionTab />
    </DashboardLayout>
  );
};

export default PromotionPage
