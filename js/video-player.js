/**
 * Video Player Controller
 * Handles Vimeo-style controls, modal video viewer, scrubber simulation, and car sound triggers
 */
class VideoController {
  constructor() {
    this.modal = document.getElementById('video-modal');
    this.modalClose = document.getElementById('video-modal-close');
    this.modalTitle = document.getElementById('video-modal-title');
    this.modalClient = document.getElementById('video-modal-client');
    this.modalDesc = document.getElementById('video-modal-desc');
    this.modalPlayerContainer = document.getElementById('video-modal-player');
    
    this.initCards();
    this.initModal();
    this.initCoolCard();
  }

  initCards() {
    // Vertical presentation video cards
    document.querySelectorAll('.video-card-vertical').forEach((card) => {
      const playBtn = card.querySelector('.play-overlay-btn');
      const vimeoToggle = card.querySelector('.vimeo-play-toggle');
      const scrubFill = card.querySelector('.vimeo-scrub-fill');
      const timeText = card.querySelector('.vimeo-time');
      const title = card.getAttribute('data-title') || 'Presentation Video';
      const client = card.getAttribute('data-client') || 'Client Production';
      const desc = card.getAttribute('data-desc') || 'Cinematic video editing and narrative structuring for executive leadership.';
      const vimeoId = card.getAttribute('data-vimeo-id');
      const vimeoUrl = card.getAttribute('data-vimeo-url');
      const img = card.querySelector('.video-thumb-img')?.getAttribute('src');

      const triggerModal = (e) => {
        e.stopPropagation();
        if (window.soundEngine) window.soundEngine.playWhoosh();
        this.openModal({ title, client, desc, img, type: 'vertical', vimeoId, vimeoUrl });
      };

      if (playBtn) playBtn.addEventListener('click', triggerModal);

      // Vimeo inline play button toggle simulation
      if (vimeoToggle) {
        let isCardPlaying = false;
        let cardInterval = null;
        let progress = 35;

        vimeoToggle.addEventListener('click', (e) => {
          e.stopPropagation();
          // If a real Vimeo link is provided, open modal to play directly
          if (vimeoUrl || vimeoId) {
            triggerModal(e);
            return;
          }
          isCardPlaying = !isCardPlaying;
          if (window.soundEngine) window.soundEngine.playClick();

          if (isCardPlaying) {
            vimeoToggle.innerHTML = '❚❚';
            cardInterval = setInterval(() => {
              progress = (progress + 1) % 100;
              if (scrubFill) scrubFill.style.width = `${progress}%`;
              if (timeText) {
                const sec = Math.floor((progress / 100) * 123);
                const m = Math.floor(sec / 60);
                const s = sec % 60;
                timeText.textContent = `0${m}:${s < 10 ? '0' : ''}${s}`;
              }
            }, 300);
          } else {
            vimeoToggle.innerHTML = '▶';
            clearInterval(cardInterval);
          }
        });
      }

      card.addEventListener('click', triggerModal);
    });

    // Horizontal video cards (Manco Group, Presenter, etc.)
    document.querySelectorAll('.video-card-horizontal').forEach((card) => {
      const playBtn = card.querySelector('.center-circle-play');
      const title = card.getAttribute('data-title') || 'Motion Graphics Film';
      const client = card.getAttribute('data-client') || 'The Manco Group';
      const desc = card.getAttribute('data-desc') || 'Corporate brand identity and motion design feature.';
      const vimeoId = card.getAttribute('data-vimeo-id');
      const vimeoUrl = card.getAttribute('data-vimeo-url');
      const img = card.querySelector('img')?.getAttribute('src');

      const triggerModal = (e) => {
        e.stopPropagation();
        if (window.soundEngine) window.soundEngine.playWhoosh();
        this.openModal({ title, client, desc, img, type: 'horizontal', vimeoId, vimeoUrl });
      };

      if (playBtn) playBtn.addEventListener('click', triggerModal);
      card.addEventListener('click', triggerModal);
    });

    // Car reels
    document.querySelectorAll('.car-reel-card').forEach((card) => {
      const playBtn = card.querySelector('.center-circle-play');
      const title = card.getAttribute('data-title') || 'Cinematic Automotive Reel';
      const client = card.getAttribute('data-client') || 'Automotive Production';
      const desc = card.getAttribute('data-desc') || 'High speed rolling shots, color grading, dynamic sound design, and speed ramping.';
      const vimeoId = card.getAttribute('data-vimeo-id');
      const vimeoUrl = card.getAttribute('data-vimeo-url');
      const img = card.querySelector('img')?.getAttribute('src');

      const triggerModal = (e) => {
        e.stopPropagation();
        if (window.soundEngine) window.soundEngine.playCarEngine();
        this.openModal({ title, client, desc, img, type: 'car', vimeoId, vimeoUrl });
      };

      if (playBtn) playBtn.addEventListener('click', triggerModal);
      card.addEventListener('click', triggerModal);
    });

    // Thor After Effects Meme card
    const thorCard = document.querySelector('.thor-meme-card');
    if (thorCard) {
      thorCard.addEventListener('click', () => {
        if (window.soundEngine) window.soundEngine.playWhoosh();
        this.openModal({
          title: 'POV: You know how to use After Effects',
          client: 'Viral Social Media Reel',
          desc: 'High-engagement viral social content leveraging trending pop-culture memes combined with advanced motion design mastery.',
          img: 'assets/thor_ae.jpg',
          type: 'meme'
        });
      });
    }
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

  openModal({ title, client, desc, img, type, vimeoId, vimeoUrl }) {
    if (!this.modal) return;

    if (this.modalTitle) this.modalTitle.textContent = title;
    if (this.modalClient) this.modalClient.textContent = client;
    if (this.modalDesc) this.modalDesc.textContent = desc;

    if (this.modalPlayerContainer) {
      if (vimeoId || vimeoUrl) {
        const src = vimeoUrl || `https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0`;
        const isVertical = type === 'vertical';
        this.modalPlayerContainer.innerHTML = `
          <div style="position: relative; width: 100%; aspect-ratio: ${isVertical ? '9/16' : '16/9'}; max-width: ${isVertical ? '420px' : '100%'}; max-height: 72vh; margin: 0 auto; background: #000; border-radius: 12px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.85);">
            <iframe 
              src="${src}" 
              style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" 
              frameborder="0" 
              allow="autoplay; fullscreen; picture-in-picture" 
              allowfullscreen>
            </iframe>
          </div>
        `;
      } else {
        const isVertical = type === 'vertical';
        this.modalPlayerContainer.innerHTML = `
          <div style="position: relative; width: 100%; aspect-ratio: ${isVertical ? '9/14' : '16/9'}; max-height: 65vh; background: #000; border-radius: 12px; overflow: hidden; display: flex; align-items: center; justify-content: center;">
            <img src="${img}" style="width: 100%; height: 100%; object-fit: ${isVertical ? 'contain' : 'cover'}; filter: brightness(0.95);" alt="${title}">
            <div style="position: absolute; bottom: 0; left: 0; width: 100%; background: linear-gradient(180deg, transparent, rgba(0,0,0,0.85)); padding: 16px 20px; display: flex; align-items: center; justify-content: space-between; color: #fff;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <span style="cursor: pointer; font-size: 1.1rem; color: #eb5e65;">▶ Playing Preview</span>
                <span style="font-family: monospace; font-size: 0.8rem; color: #aaa;">00:42 / 02:15</span>
              </div>
              <div style="display: flex; align-items: center; gap: 14px; font-size: 0.85rem; color: #dedede;">
                <span style="font-style: italic; font-weight: 700;">vimeo</span>
                <span>1080p HD</span>
                <span>⛶</span>
              </div>
            </div>
          </div>
        `;
      }
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

  initCoolCard() {
    const coolCard = document.querySelector('.cool-text-card');
    if (!coolCard) return;

    coolCard.addEventListener('click', () => {
      if (window.soundEngine) window.soundEngine.playWhoosh();
      const content = coolCard.querySelector('.cool-text-content');
      if (content) {
        content.innerHTML = `
          <div style="color: #ff3333; font-size: 1.4rem; text-transform: uppercase; animation: pulse 0.5s infinite alternate;">
            🔥 MOTION MAGIC ACTIVATED! 🔥
          </div>
          <div style="font-size: 0.85rem; color: #fff; margin-top: 10px; font-weight: 400;">
            Kinetic Typography • Liquid Shapes • 3D Tracking
          </div>
        `;
        setTimeout(() => {
          content.innerHTML = `yo you wanna see<br/><span class="red-pulse">something cool??</span>`;
        }, 3500);
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new VideoController();
});
