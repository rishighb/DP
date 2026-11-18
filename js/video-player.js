/**
 * Video Player Controller
 * Handles modal video viewer for enlarged playback with zero description popups
 */
class VideoController {
  constructor() {
    this.modal = document.getElementById('video-modal');
    this.modalClose = document.getElementById('video-modal-close');
    this.modalTitle = document.getElementById('video-modal-title');
    this.modalPlayerContainer = document.getElementById('video-modal-player');
    
    this.initCards();
    this.initModal();
  }

  initCards() {
    // Bind click on caption title and cards to enlarge video without description
    document.querySelectorAll('.video-card-horizontal-frame, .reel-horizontal-card, .reel-edit-card').forEach((card) => {
      const titleEl = card.querySelector('.caption-title');
      const captionBar = card.querySelector('.video-card-caption-bar');
      const title = titleEl?.textContent?.trim() || 'Video Edit';
      const iframe = card.querySelector('iframe');
      let vimeoId = card.getAttribute('data-vimeo-id');
      if (!vimeoId && iframe) {
        const match = iframe.src.match(/video\/(\d+)/);
        if (match) vimeoId = match[1];
      }

      if (vimeoId) {
        if (titleEl) {
          titleEl.style.cursor = 'pointer';
          titleEl.setAttribute('title', 'Click to enlarge video');
          titleEl.addEventListener('click', (e) => {
            e.stopPropagation();
            if (window.soundEngine) window.soundEngine.playWhoosh();
            this.openModal({ title, vimeoId });
          });
        }

        if (captionBar) {
          captionBar.style.cursor = 'pointer';
          captionBar.setAttribute('title', 'Click to enlarge video');
          captionBar.addEventListener('click', (e) => {
            if (window.soundEngine) window.soundEngine.playWhoosh();
            this.openModal({ title, vimeoId });
          });
        }
      }
    });
  }

  initModal() {
    if (!this.modal) return;

    if (this.modalClose) {
      this.modalClose.addEventListener('click', () => this.closeModal());
    }

    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('active')) {
        this.closeModal();
      }
    });
  }

  openModal({ title, vimeoId }) {
    if (!this.modal) return;

    if (this.modalTitle) {
      this.modalTitle.textContent = title || '';
    }

    if (this.modalPlayerContainer && vimeoId) {
      this.modalPlayerContainer.innerHTML = `
        <div style="position: relative; width: 100%; aspect-ratio: 16/9; max-height: 75vh; margin: 0 auto; background: #000; border-radius: 12px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.85);">
          <iframe 
            src="https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0&badge=0&autopause=0&dnt=1" 
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" 
            frameborder="0" 
            allow="autoplay; fullscreen; picture-in-picture" 
            allowfullscreen 
            title="${title}">
          </iframe>
        </div>
      `;
    }

    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    if (!this.modal) return;
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
    if (this.modalPlayerContainer) {
      this.modalPlayerContainer.innerHTML = '';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new VideoController();
});