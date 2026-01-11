import { useState, useCallback } from 'react';

export function useImagePreview() {
  const [previewData, setPreviewData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openPreview = useCallback((data) => {
    setPreviewData(data);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closePreview = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = '';
    setTimeout(() => setPreviewData(null), 300);
  }, []);

  return {
    previewData,
    isOpen,
    openPreview,
    closePreview,
  };
}

export function useHoverPreview() {
  const [hoverData, setHoverData] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const showPreview = useCallback((data, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPosition({
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
    setHoverData(data);
    setIsVisible(true);
  }, []);

  const hidePreview = useCallback(() => {
    setIsVisible(false);
  }, []);

  return {
    hoverData,
    position,
    isVisible,
    showPreview,
    hidePreview,
  };
}
