// ===============================================================
// SERVEGAMES & XAVIER FIGUEROA - CERTIFICATE VIEWER INTERACTION
// Controlador de Interfaz, Zoom Responsivo y Validación Oficial
// ===============================================================

(function () {
  'use strict';

  // 1. Sanear imágenes de localhost a rutas locales relativas
  function sanitizeAssets() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      let src = img.getAttribute('src') || '';
      if (src.includes('localhost:3456/assets/')) {
        const filename = src.split('/').pop();
        // Determinar ruta relativa según la profundidad
        img.src = `../../assets/${filename}`;
      }
      
      // Fallback si la imagen falla al cargar
      img.onerror = function () {
        const filename = (this.getAttribute('src') || '').split('/').pop();
        if (filename && !this.dataset.fallbackApplied) {
          this.dataset.fallbackApplied = 'true';
          // Probar rutas alternativas
          const possiblePaths = [
            `../../assets/${filename}`,
            `../../../assets/${filename}`,
            `/Files/certs/assets/${filename}`,
            `/Files/CERTs/assets/${filename}`
          ];
          let currentTry = 0;
          const tryNext = () => {
            if (currentTry < possiblePaths.length) {
              this.src = possiblePaths[currentTry++];
            }
          };
          this.onerror = tryNext;
          tryNext();
        }
      };
    });
  }

  // 2. Control de Zoom y Auto-Escalado Móvil
  let isZoomFit = true;

  function applyResponsiveScale() {
    const wrapper = document.getElementById('cert-wrapper');
    const sheet = document.getElementById('printable-certificate');
    if (!wrapper || !sheet) return;

    const screenWidth = window.innerWidth;
    const sheetWidthPx = sheet.offsetWidth || 794; // ~210mm a 96dpi

    if (screenWidth < sheetWidthPx + 30 && isZoomFit) {
      const scale = (screenWidth - 20) / sheetWidthPx;
      wrapper.style.transform = `scale(${scale})`;
      wrapper.style.transformOrigin = 'top center';
      const scaledHeight = sheet.offsetHeight * scale;
      wrapper.parentElement.style.height = `${scaledHeight + 40}px`;
    } else {
      wrapper.style.transform = 'none';
      if (wrapper.parentElement) {
        wrapper.parentElement.style.height = 'auto';
      }
    }
  }

  window.toggleZoom = function () {
    isZoomFit = !isZoomFit;
    const btn = document.getElementById('btn-zoom-toggle');
    if (btn) {
      btn.innerHTML = isZoomFit 
        ? `<svg class="cert-btn-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zm.5-7h-1v2H7v1h2v2h1v-2h2V9h-2z"/></svg> 100%`
        : `<svg class="cert-btn-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z"/></svg> Ajustar`;
    }
    applyResponsiveScale();
  };

  // 3. Imprimir / Guardar en PDF
  window.printCertificate = function () {
    window.print();
  };

  // 4. Copiar Enlace al Portapapeles con Notificación Toast
  window.copyCertLink = function () {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      showToast('✅ Enlace de verificación copiado al portapapeles');
    }).catch(() => {
      // Fallback
      const input = document.createElement('input');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      showToast('✅ Enlace copiado al portapapeles');
    });
  };

  function showToast(msg) {
    let toast = document.getElementById('cert-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'cert-toast';
      toast.className = 'cert-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('active');
    setTimeout(() => {
      toast.classList.remove('active');
    }, 3200);
  }

  // 5. Modal Ficha Técnica
  window.openFichaModal = function () {
    const modal = document.getElementById('cert-ficha-modal');
    if (modal) modal.classList.add('active');
  };

  window.closeFichaModal = function () {
    const modal = document.getElementById('cert-ficha-modal');
    if (modal) modal.classList.remove('active');
  };

  // 6. Inyectar datos de la ficha técnica desde el DOM del certificado
  function populateFichaDetails() {
    const code = document.getElementById('view-cert-code')?.innerText || 'XF-CER';
    const client = document.getElementById('view-client-name')?.innerText || '-';
    const ruc = document.getElementById('view-client-ruc')?.innerText || '-';
    const emision = document.getElementById('view-cert-date')?.innerText || '-';
    const expire = document.getElementById('view-cert-expire')?.innerText || '-';
    const local = document.getElementById('view-client-local')?.innerText || '-';
    const signer = document.getElementById('view-signer-name')?.innerText || 'Xavier Figueroa';
    const cargo = document.getElementById('view-signer-cargo')?.innerText || 'Especialista en Automatización';

    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.innerText = val;
    };

    setVal('modal-val-code', code);
    setVal('modal-val-client', client);
    setVal('modal-val-ruc', ruc);
    setVal('modal-val-emision', emision);
    setVal('modal-val-expire', expire);
    setVal('modal-val-local', local);
    setVal('modal-val-signer', `${signer} (${cargo})`);
  }

  // Ajustar enlace del QR si se está viendo en local (file://)
  function setupSmartQrLink() {
    const qrLink = document.querySelector('#qr-container a');
    if (!qrLink) return;
    if (window.location.protocol === 'file:') {
      const code = document.getElementById('view-cert-code')?.innerText?.trim() || 'XF-CER-F-2026-0001';
      qrLink.href = `../../../validar.html?id=${encodeURIComponent(code)}`;
      qrLink.target = '_self';
      qrLink.title = 'Verificar en el Portal Local';
    }
  }

  // Inicializar al cargar el DOM
  document.addEventListener('DOMContentLoaded', () => {
    sanitizeAssets();
    populateFichaDetails();
    setupSmartQrLink();
    applyResponsiveScale();

    window.addEventListener('resize', applyResponsiveScale);

    // Cerrar modal al hacer clic en el backdrop
    const modalOverlay = document.getElementById('cert-ficha-modal');
    if (modalOverlay) {
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeFichaModal();
      });
    }

    // Tecla Escape para cerrar modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeFichaModal();
    });
  });

  // Ejecutar inmediatamente también por si DOMContentLoaded ya disparó
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    sanitizeAssets();
    populateFichaDetails();
    setupSmartQrLink();
    applyResponsiveScale();
  }
})();
