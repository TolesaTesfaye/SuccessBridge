import React from 'react'
import { DashboardLayout } from '@components/dashboards/DashboardLayout'
import { PaymentTracking } from '@components/payment/PaymentTracking'
import { Footer } from '@components/common/Footer'

export const PaymentTrackingPage: React.FC = () => {
  return (
    <DashboardLayout
      title="Payment Tracking"
      subtitle="View your payment history and status"
      showFooter={false}
    >
      <PaymentTracking />
      <Footer />
    </DashboardLayout>
  )
}
