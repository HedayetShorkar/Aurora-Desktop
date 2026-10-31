@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

/* Application animations */
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0,0,0,0.05);
}

.app-main {
  margin-top: 4rem;
  height: calc(100vh - 4rem);
}

/* Widget styles */
.widget-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  padding: 2rem;
}

.widget-container {
  position: relative;
  transition: all 0.3s ease;
}

.widget-content {
  width: 100%;
  height: 100%;
}

/* Dock styles */
.dock {
  display: flex;
  gap: 8px;
  padding: 8px;
}

.dock-tooltip {
  visibility: hidden;
  opacity: 0;
  transition: all 0.2s ease;
}

/* Settings panel */
.settings-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
}

.settings-panel::-webkit-scrollbar {
  width: 8px;
}

.settings-panel::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,0.2);
  border-radius: 4px;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .widget-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .app-header {
    flex-direction: column;
    gap: 1rem;
  }
}

/* Print styles */
@media print {
  .dock, .app-header {
    display: none;
  }
}

