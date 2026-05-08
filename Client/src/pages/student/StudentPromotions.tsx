import React from 'react'
import { DashboardLayout } from '@components/dashboards/DashboardLayout'
import { PromotionTab } from '@components/dashboards/PromotionTab'

export const StudentPromotions: React.FC = () => {
  return (
    <DashboardLayout
      title="Promotions & Resources"
      subtitle="Discover more learning opportunities and connect with the developer"
    >
      <PromotionTab />
    </DashboardLayout>
  )
}
