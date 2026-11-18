/**
 * Poster Lightbox & Gallery Controller
 * Provides high-res viewing with keyboard navigation and rich metadata
 */
class PosterLightbox {
  constructor() {
    this.posters = [
      {
        id: 'poster_1',
        title: 'Ad 01',
        tag: 'Advertising Design • Commercial',
        tools: ['Figma', 'Adobe Photoshop'],
        client: 'Commercial Campaign',
        desc: 'Ad 01 — Creative advertising campaign visual crafted with bold branding, dynamic typography, and high-impact visual hierarchy.',
        src: 'assets/posters/poster_1.jpg'
      },
      {
        id: 'poster_2',
        title: 'Digital Brand Campaign 01',
        tag: 'Digital Marketing • Social Creative',
        tools: ['Adobe Photoshop', 'Illustrator'],
        client: 'Brand Media Production',
        desc: 'Engaging digital media design highlighting focal storytelling, balanced composition, and refined color harmony.',
        src: 'assets/posters/poster_2.jpg'
      },
      {
        id: 'poster_3',
        title: 'Social Campaign & Brand Identity 02',
        tag: 'Brand & Social Media • Editorial',
        tools: ['Adobe Illustrator', 'Photoshop'],
        client: 'Creative Studio',
        desc: 'Expressive graphic composition combining structured editorial typography with photographic storytelling.',
        src: 'assets/posters/poster_3.jpg'
      },
      {
        id: 'poster_4',
        title: 'Digital Brand Campaign 02',
        tag: 'Editorial & Brand Direction',
        tools: ['Photoshop', 'Lightroom'],
        client: 'Studio Series',
        desc: 'Art-directed editorial poster emphasizing mood, texture, contemporary design language, and negative space.',
        src: 'assets/posters/poster_4.jpg'
      },
      {
        id: 'poster_5',
        title: 'Cinematic Storytelling 01',
        tag: 'Modern Typography • Concept Art',
        tools: ['Adobe Photoshop', 'Figma'],
        client: 'Visual Identity',
        desc: 'Bold typographic poster exploring scale contrast, textured shadows, and modern sensibilities.',
        src: 'assets/posters/poster_5.jpg'
      },
      {
        id: 'poster_6',
        title: 'Cinematic Storytelling 02',
        tag: 'Print & Digital Layout',
        tools: ['Adobe InDesign', 'Photoshop'],
        client: 'Publication Feature',
        desc: 'Sleek editorial layout balancing stark contrast with delicate typographic details and clean margin grids.',
        src: 'assets/posters/poster_6.jpg'
      },
      {
        id: 'poster_7',
        title: 'Festive Brand Campaign 01',
        tag: 'Academic & Event Identity',
        tools: ['Canva', 'Adobe Illustrator'],
        client: 'Event Board',
        desc: 'Official conference key visual and invitation graphics developed for national academic presentation and print collateral.',
        src: 'assets/posters/poster_7.jpg'
      },
      {
        id: 'poster_8',
        title: 'Digital Brand Campaign 03',
        tag: 'Mobile App & Digital Product',
        tools: ['Figma', 'Adobe Illustrator'],
        client: 'Product Brand',
        desc: 'Digital brand campaign graphic emphasizing modern product presentation and visual identity.',
        src: 'assets/posters/poster_8.jpg'
      },
      {
        id: 'poster_9',
        title: 'Festive Brand Campaign 02',
        tag: 'Event Showcase • Key Visual',
        tools: ['Adobe Photoshop'],
        client: 'Festive Campaign',
        desc: 'High-energy event promotional poster designed for multi-channel digital distribution and stage screen display.',
        src: 'assets/posters/poster_9.jpg'
      },
      {
        id: 'poster_10',
        title: 'Festive Brand Campaign 03',
        tag: 'Vector Iconography • Square Frame',
        tools: ['Adobe Illustrator', 'Figma'],
        client: 'Festive Identity',
        desc: 'Clean geometric brand mark and identity emblem featuring balance, symmetry, and scalable vector craftsmanship.',
        src: 'assets/posters/poster_10.jpg'
      },
      {
        id: 'poster_11',
        title: 'Cinematic 03',
        tag: 'Editorial Art • Digital Composite',
        tools: ['Adobe Photoshop'],
        client: 'Media Magazine',
        desc: 'Richly textured portrait layout fusing photography with contemporary graphic treatment and publication styling.',
        src: 'assets/posters/poster_11.jpg'
      },
      {
        id: 'poster_12',
        title: 'Cinematic 04',
        tag: 'Vertical Mobile Experience',
        tools: ['Adobe Photoshop', 'Lightroom'],
        client: 'Digital Story Series',
        desc: 'Vertical 9:16 mobile story visual with vibrant saturation, cinematic lighting, and dynamic typographic overlays.',
        src: 'assets/posters/poster_12.jpg'
      }
    ];

    this.currentIndex = 0;
    this.modal = document.getElementById('lightbox-modal');
    this.modalClose = document.getElementById('lightbox-close');
    this.imgEl = document.getElementById('lightbox-img');
    this.titleEl = document.getElementById('lightbox-title');
    this.tagEl = document.getElementById('lightbox-tag');
    this.toolsEl = document.getElementById('lightbox-tools');

    this.init();
  }

  init() {
    // Bind click events on poster cards
    document.querySelectorAll('.poster-card').forEach((card, index) => {
      card.addEventListener('click', () => {
        if (window.soundEngine) window.soundEngine.playWhoosh();
        this.open(index);
      });
    });

    // Bind click events on EcoCart slide cards
    document.querySelectorAll('.ecocart-slide-card').forEach((card) => {
      card.addEventListener('click', () => {
        if (window.soundEngine) window.soundEngine.playWhoosh();
        const imgSrc = card.getAttribute('data-img') || card.querySelector('img')?.getAttribute('src');
        const title = card.getAttribute('data-title') || card.querySelector('.ecocart-slide-title')?.textContent || 'EcoCart App UI/UX Case Study';
        const num = card.getAttribute('data-slice') || '1';
        this.openCustom({
          src: imgSrc,
          title: title,
          tag: `Figma Mobile UI • Chapter ${num} of 10`,
          desc: 'High-fidelity Figma screen mockups, UX workflows, and user journey design for the EcoCart sustainable grocery shopping app.',
          client: 'EcoCart Mobile Product',
          tools: ['Figma', 'UI/UX Design', 'Design System', 'Prototyping']
        });
      });
    });

    if (this.modalClose) {
      this.modalClose.addEventListener('click', () => this.close());
    }

    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.close();
      });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!this.modal || !this.modal.classList.contains('active')) return;
      if (e.key === 'Escape') this.close();
      if (e.key === 'ArrowRight') this.next();
      if (e.key === 'ArrowLeft') this.prev();
    });

    // Arrow buttons inside modal
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    if (prevBtn) prevBtn.addEventListener('click', () => this.prev());
    if (nextBtn) nextBtn.addEventListener('click', () => this.next());
  }

  open(index) {
    this.currentIndex = index;
    this.update();
    if (this.modal) {
      this.modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  openCustom(data) {
    if (!data) return;
    if (this.imgEl) {
      this.imgEl.src = data.src;
      this.imgEl.alt = data.title;
    }
    if (this.titleEl) this.titleEl.textContent = data.title;
    if (this.tagEl) this.tagEl.textContent = data.tag;

    if (this.toolsEl) {
      this.toolsEl.innerHTML = '';
      data.tools.forEach(tool => {
        const chip = document.createElement('span');
        chip.className = 'tool-chip';
        chip.textContent = tool;
        this.toolsEl.appendChild(chip);
      });
    }

    if (this.modal) {
      this.modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  close() {
    if (this.modal) {
      this.modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.posters.length;
    if (window.soundEngine) window.soundEngine.playClick();
    this.update();
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.posters.length) % this.posters.length;
    if (window.soundEngine) window.soundEngine.playClick();
    this.update();
  }

  update() {
    const data = this.posters[this.currentIndex];
    if (!data) return;

    if (this.imgEl) {
      this.imgEl.src = data.src;
      this.imgEl.alt = data.title;
    }
    if (this.titleEl) this.titleEl.textContent = data.title;
    if (this.tagEl) this.tagEl.textContent = data.tag;

    if (this.toolsEl) {
      this.toolsEl.innerHTML = '';
      data.tools.forEach(tool => {
        const chip = document.createElement('span');
        chip.className = 'tool-chip';
        chip.textContent = tool;
        this.toolsEl.appendChild(chip);
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new PosterLightbox();
});
