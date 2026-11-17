/**
 * Baithak Podcast Live Audio Waveform Visualizer
 */
class PodcastVisualizer {
  constructor() {
    this.container = document.querySelector('.waveform-bars');
    this.playBtn = document.querySelector('.baithak-play-btn');
    this.isPlaying = false;
    this.interval = null;
    this.init();
  }

  init() {
    if (!this.container || !this.playBtn) return;

    // Generate 28 waveform bars
    this.container.innerHTML = '';
    this.bars = [];
    const barCount = 32;

    for (let i = 0; i < barCount; i++) {
      const bar = document.createElement('div');
      bar.className = 'wave-bar';
      // natural curve
      const heightFactor = Math.sin((i / barCount) * Math.PI);
      const initialHeight = Math.max(6, Math.floor(heightFactor * 32) + Math.floor(Math.random() * 8));
      bar.style.height = `${initialHeight}px`;
      this.container.appendChild(bar);
      this.bars.push(bar);
    }

    this.playBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.togglePlay();
    });

    const card = document.querySelector('.baithak-podcast-card');
    if (card) {
      card.addEventListener('click', () => this.togglePlay());
    }
  }

  togglePlay() {
    this.isPlaying = !this.isPlaying;
    if (window.soundEngine) {
      window.soundEngine.playPodcastNote();
    }

    if (this.isPlaying) {
      this.container.classList.add('playing');
      this.playBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
        </svg>
        Pause Podcast
      `;
      this.startAnimation();
    } else {
      this.container.classList.remove('playing');
      this.playBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z"/>
        </svg>
        Play Podcast Episode
      `;
      this.stopAnimation();
    }
  }

  startAnimation() {
    this.interval = setInterval(() => {
      if (!this.bars) return;
      this.bars.forEach((bar, i) => {
        const factor = Math.sin((i / this.bars.length) * Math.PI);
        const dynamicH = Math.max(8, Math.floor(factor * 44 * Math.random()) + 6);
        bar.style.height = `${dynamicH}px`;
      });
    }, 100);
  }

  stopAnimation() {
    clearInterval(this.interval);
    if (!this.bars) return;
    this.bars.forEach((bar, i) => {
      const factor = Math.sin((i / this.bars.length) * Math.PI);
      const resetH = Math.max(6, Math.floor(factor * 24));
      bar.style.height = `${resetH}px`;
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new PodcastVisualizer();
});
