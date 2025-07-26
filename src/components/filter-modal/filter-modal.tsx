"use client";

import React, { useEffect, useState } from "react";
import styles from "./filter-modal.module.css";
import { FilterSelection } from "../../shared/types/filter";
import { getFilterOrganizations } from "../../shared/api/filter/getOrganizations";
import { getFilterTypes } from "../../shared/api/filter/getTypes";
import { isError } from "../../shared/types/error";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onApply?: (filters: FilterSelection) => void;
}

export function FilterModal({ isOpen, onClose, onApply }: Props) {
  const [organizations, setOrganizations] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedOrganizations, setSelectedOrganizations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchFilterData();
    }
  }, [isOpen]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const types = params.get("types");
    const organizations = params.get("organizations");

    if (types) {
      setSelectedTypes(types.split(","));
    }
    if (organizations) {
      setSelectedOrganizations(organizations.split(","));
    }
  }, [isOpen]);

  const fetchFilterData = async () => {
    setLoading(true);
    try {
      const [organizationsData, typesData] = await Promise.all([
        getFilterOrganizations(),
        getFilterTypes(),
      ]);

      if (organizationsData && !isError(organizationsData)) {
        setOrganizations(organizationsData);
      } else if (isError(organizationsData)) {
        console.error("Organizations API Error:", organizationsData.msg);
      }

      if (typesData && !isError(typesData)) {
        setTypes(typesData);
      } else if (isError(typesData)) {
        console.error("Types API Error:", typesData.msg);
      }
    } catch (error) {
      console.error("Failed to fetch filter data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const handleOrganizationToggle = (org: string) => {
    setSelectedOrganizations((prev) =>
      prev.includes(org) ? prev.filter((o) => o !== org) : [...prev, org],
    );
  };

  const handleReset = () => {
    setSelectedTypes([]);
    setSelectedOrganizations([]);
  };

  const handleApply = () => {
    if (onApply) {
      onApply({
        selectedTypes,
        selectedOrganizations,
      });
    }
    onClose();
  };

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>필터</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.content}>
          {loading ? (
            <div className={styles.loadingContainer}>
              <p>필터 옵션을 불러오는 중...</p>
            </div>
          ) : (
            <div className={styles.filterGrid}>
              <div className={styles.filterSection}>
                <h3 className={styles.sectionTitle}>데이터 타입</h3>
                <div className={styles.checkboxGroup}>
                  {types.map((type) => (
                    <label key={type} className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={() => handleTypeToggle(type)}
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className={styles.filterSection}>
                <h3 className={styles.sectionTitle}>제공기관</h3>
                <div className={styles.checkboxGroup}>
                  {organizations.map((org) => (
                    <label key={org} className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={selectedOrganizations.includes(org)}
                        onChange={() => handleOrganizationToggle(org)}
                      />
                      <span>{org}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <button className={styles.resetButton} onClick={handleReset}>
            초기화
          </button>
          <button className={styles.applyButton} onClick={handleApply}>
            적용
          </button>
        </div>
      </div>
    </div>
  );
}
