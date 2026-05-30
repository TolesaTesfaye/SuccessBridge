import React from "react";
import {
  DashboardTopTabNav,
  type DashboardTabItem,
} from "@components/dashboards/DashboardTopTabNav";

export type SuperAdminTabItem = DashboardTabItem;

interface SuperAdminTopTabNavProps {
  tabs: SuperAdminTabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  accent?: "purple" | "blue";
  fill?: boolean;
}

/** @deprecated Use DashboardTopTabNav — kept for existing superadmin view imports */
export const SuperAdminTopTabNav: React.FC<SuperAdminTopTabNavProps> = (
  { fill, ...props },
) => <DashboardTopTabNav fill={fill} {...props} />;
