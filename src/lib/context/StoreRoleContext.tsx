'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type StoreId = 'ALL' | 'TECH' | 'FASHION' | 'BEAUTY' | 'HOME';
export type UserRole = 'EXECUTIVE' | 'PRODUCT_MANAGER' | 'SUPPORT_LEAD';

export interface StoreInfo {
  id: StoreId;
  name: string;
  category: string;
  skuCount: number;
  badge: string;
}

export interface RoleInfo {
  id: UserRole;
  title: string;
  tagline: string;
  color: string;
}

export const STORES: Record<StoreId, StoreInfo> = {
  ALL: {
    id: 'ALL',
    name: 'OmniStore Global',
    category: 'Tüm Markalar & Sektörler',
    skuCount: 5,
    badge: 'Konsolide (Amazon & HB)',
  },
  TECH: {
    id: 'TECH',
    name: 'Amazon Electronics (Sony Audio)',
    category: 'Consumer Electronics',
    skuCount: 1,
    badge: 'Sony WH-1000XM5',
  },
  FASHION: {
    id: 'FASHION',
    name: "Amazon Fashion (Levi's Denim)",
    category: 'Fashion & Apparel',
    skuCount: 1,
    badge: "Levi's 511 Slim",
  },
  BEAUTY: {
    id: 'BEAUTY',
    name: 'Hepsiburada Beauty (The Ordinary)',
    category: 'Beauty & Skincare',
    skuCount: 1,
    badge: 'The Ordinary Niacinamide',
  },
  HOME: {
    id: 'HOME',
    name: 'Hepsiburada & Amazon (Philips & Stanley)',
    category: 'Home & Kitchen',
    skuCount: 2,
    badge: 'Philips XXL & Stanley',
  },
};

export const ROLES: Record<UserRole, RoleInfo> = {
  EXECUTIVE: {
    id: 'EXECUTIVE',
    title: 'C-Level Executive',
    tagline: 'Finansal Kayıp & Üst Düzey Strateji',
    color: 'emerald',
  },
  PRODUCT_MANAGER: {
    id: 'PRODUCT_MANAGER',
    title: 'Product Manager / Ar-Ge',
    tagline: 'Kusur Analitiği & A/B Hipotezleri',
    color: 'cyan',
  },
  SUPPORT_LEAD: {
    id: 'SUPPORT_LEAD',
    title: 'Customer Success & Retention',
    tagline: 'İade Kurtarma & Müşteri Görüşmesi',
    color: 'purple',
  },
};

interface StoreRoleContextType {
  currentStore: StoreInfo;
  setStore: (storeId: StoreId) => void;
  currentRole: RoleInfo;
  setRole: (roleId: UserRole) => void;
}

const StoreRoleContext = createContext<StoreRoleContextType | undefined>(undefined);

export function StoreRoleProvider({ children }: { children: React.ReactNode }) {
  const [currentStoreId, setCurrentStoreId] = useState<StoreId>('ALL');
  const [currentRoleId, setCurrentRoleId] = useState<UserRole>('EXECUTIVE');

  useEffect(() => {
    try {
      const savedStore = localStorage.getItem('reviewiq_store') as StoreId;
      if (savedStore && STORES[savedStore]) {
        setCurrentStoreId(savedStore);
      }
      const savedRole = localStorage.getItem('reviewiq_role') as UserRole;
      if (savedRole && ROLES[savedRole]) {
        setCurrentRoleId(savedRole);
      }
    } catch {
      // Ignore localStorage access errors
    }
  }, []);

  const setStore = (storeId: StoreId) => {
    setCurrentStoreId(storeId);
    try {
      localStorage.setItem('reviewiq_store', storeId);
    } catch {}
  };

  const setRole = (roleId: UserRole) => {
    setCurrentRoleId(roleId);
    try {
      localStorage.setItem('reviewiq_role', roleId);
    } catch {}
  };

  return (
    <StoreRoleContext.Provider
      value={{
        currentStore: STORES[currentStoreId] || STORES.ALL,
        setStore,
        currentRole: ROLES[currentRoleId] || ROLES.EXECUTIVE,
        setRole,
      }}
    >
      {children}
    </StoreRoleContext.Provider>
  );
}

export function useStoreRole() {
  const context = useContext(StoreRoleContext);
  if (!context) {
    throw new Error('useStoreRole must be used within a StoreRoleProvider');
  }
  return context;
}
