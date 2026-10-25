/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ChatDrawer } from './components/ChatDrawer';
import { LocationSelectorModal } from './components/LocationSelectorModal';
import { UpiQrModal } from './components/UpiQrModal';
import { SafetyGuidelinesModal } from './components/SafetyGuidelinesModal';
import { BarcodeScannerModal } from './components/BarcodeScannerModal';
import { ToastContainer } from './components/ToastContainer';

import { HomePage } from './pages/HomePage';
import { BrowsePage } from './pages/BrowsePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { SellPage } from './pages/SellPage';
import { SavedPage } from './pages/SavedPage';
import { ChatsPage } from './pages/ChatsPage';
import { ProfilePage } from './pages/ProfilePage';

function MainAppContent() {
  const { currentView } = useApp();
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9FF] text-[#1B1B3A] antialiased selection:bg-[#5B4BFF]/20 selection:text-[#5B4BFF]">
      {/* Top sticky Navbar */}
      <Navbar onOpenScanner={() => setIsScannerOpen(true)} />

      {/* Main Page View with Animated Transitions */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            {currentView === 'home' && <HomePage />}
            {currentView === 'browse' && <BrowsePage />}
            {currentView === 'detail' && <ProductDetailPage />}
            {currentView === 'sell' && (
              <SellPage onOpenScanner={() => setIsScannerOpen(true)} />
            )}
            {currentView === 'saved' && <SavedPage />}
            {currentView === 'chats' && <ChatsPage />}
            {currentView === 'profile' && <ProfilePage />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav />

      {/* Slide-over Interactive Chat Drawer */}
      <ChatDrawer />

      {/* Campus Location Selection Modal */}
      <LocationSelectorModal />

      {/* Instant Campus Handshake UPI QR Modal */}
      <UpiQrModal />

      {/* Campus Exchange Safety Guidelines Modal */}
      <SafetyGuidelinesModal />

      {/* Barcode & ISBN Quick Scanner Modal */}
      <BarcodeScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
      />

      {/* Toast Notification Stack */}
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
