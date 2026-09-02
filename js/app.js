/* ==========================================================================
   SPESIAL UNTUK INTAN — INTERACTIVE JAVASCRIPT ENGINE
   Created with pure love & devotion by Lukman
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // ==========================================================================
  // 1. AUDIO & VINYL ENGINE (Ghea Indrawari - 1000x)
  // ==========================================================================
  const bgMusic = document.getElementById('bgMusic');
  const musicToggleBtn = document.getElementById('musicToggleBtn');
  const navVinyl = document.getElementById('navVinyl');
  const eqBars = document.getElementById('eqBars');
  let isPlaying = false;

  function toggleMusic() {
    if (!bgMusic) return;
    if (isPlaying) {
      bgMusic.pause();
      isPlaying = false;
      navVinyl.classList.remove('spinning');
      eqBars.classList.remove('playing');
    } else {
      bgMusic.play().then(() => {
        isPlaying = true;
        navVinyl.classList.add('spinning');
        eqBars.classList.add('playing');
      }).catch(err => {
        console.log('Audio autoplay prevented:', err);
      });
    }
  }

  musicToggleBtn.addEventListener('click', toggleMusic);

  // Auto-start music on first user touch / click anywhere
  function initAudioOnFirstGesture() {
    if (!isPlaying && bgMusic) {
      bgMusic.play().then(() => {
        isPlaying = true;
        navVinyl.classList.add('spinning');
        eqBars.classList.add('playing');
      }).catch(() => {});
    }
    document.removeEventListener('click', initAudioOnFirstGesture);
    document.removeEventListener('touchstart', initAudioOnFirstGesture);
  }
  document.addEventListener('click', initAudioOnFirstGesture, { once: true });
  document.addEventListener('touchstart', initAudioOnFirstGesture, { once: true });

  // Web Audio Synthesizer for Cute Sound FX (Zero Lag)
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  function playSweetChime(freq = 587.33, type = 'sine', duration = 0.25) {
    try {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, audioCtx.currentTime + duration);
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
  }

  // ==========================================================================
  // 2. GPU FLOATING HEARTS & PARTICLES CANVAS
  // ==========================================================================
  const canvas = document.getElementById('heartCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  const particleChars = ['❤️', '💖', '🌸', '✨', '💕', '🥰', '🌹'];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class FloatingParticle {
    constructor() {
      this.reset(true);
    }
    reset(initial = false) {
      this.x = Math.random() * canvas.width;
      this.y = initial ? Math.random() * canvas.height : canvas.height + 30;
      this.size = Math.random() * 16 + 14;
      this.speedY = Math.random() * 1.2 + 0.6;
      this.speedX = Math.sin(Math.random() * Math.PI * 2) * 0.6;
      this.char = particleChars[Math.floor(Math.random() * particleChars.length)];
      this.opacity = Math.random() * 0.6 + 0.3;
      this.angle = Math.random() * Math.PI * 2;
      this.angleSpeed = (Math.random() - 0.5) * 0.02;
    }
    update() {
      this.y -= this.speedY;
      this.x += Math.sin(this.angle) * 0.8;
      this.angle += this.angleSpeed;
      if (this.y < -40) {
        this.reset(false);
      }
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.font = `${this.size}px sans-serif`;
      ctx.fillText(this.char, this.x, this.y);
      ctx.restore();
    }
  }

  for (let i = 0; i < 35; i++) {
    particles.push(new FloatingParticle());
  }

  function renderParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(renderParticles);
  }
  renderParticles();

  // ==========================================================================
  // 3. STAGE TRANSITION ENGINE
  // ==========================================================================
  function switchStage(fromId, toId) {
    const fromEl = document.getElementById(fromId);
    const toEl = document.getElementById(toId);
    if (!fromEl || !toEl) return;

    fromEl.classList.remove('active');
    setTimeout(() => {
      fromEl.classList.add('hidden');
      toEl.classList.remove('hidden');
      setTimeout(() => {
        toEl.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (window.lucide) window.lucide.createIcons();
      }, 30);
    }, 300);
  }

  // ==========================================================================
  // 3.5. STAGE 0: WELCOME INVITATION GATEWAY LOGIC
  // ==========================================================================
  const startJourneyBtn = document.getElementById('startJourneyBtn');
  const giftBoxTrigger = document.getElementById('giftBoxTrigger');

  function startMysteryExperience() {
    playSweetChime(523.25);
    setTimeout(() => playSweetChime(659.25), 100);
    setTimeout(() => playSweetChime(783.99), 200);

    // Auto start music
    if (!isPlaying && bgMusic) {
      bgMusic.play().then(() => {
        isPlaying = true;
        navVinyl.classList.add('spinning');
        eqBars.classList.add('playing');
      }).catch(() => {});
    }

    if (window.confetti) {
      confetti({
        particleCount: 40,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff3366', '#ffb703', '#f472b6']
      });
    }

    switchStage('stage0', 'stage1');
  }

  if (startJourneyBtn) startJourneyBtn.addEventListener('click', startMysteryExperience);
  if (giftBoxTrigger) giftBoxTrigger.addEventListener('click', startMysteryExperience);

  // ==========================================================================
  // 4. STAGE 1: MATH RIDDLE TRICK (100 + 55 = I MISS YOU)
  // ==========================================================================
  const mathInput = document.getElementById('mathInput');
  const submitMathBtn = document.getElementById('submitMathBtn');
  const mathEquation = document.getElementById('mathEquation');
  const mathTrickReveal = document.getElementById('mathTrickReveal');
  const inputContainer = document.getElementById('inputContainer');
  const stage1NextBox = document.getElementById('stage1NextBox');
  const toStage2Btn = document.getElementById('toStage2Btn');

  function triggerMathTrick() {
    playSweetChime(523.25);
    setTimeout(() => playSweetChime(659.25), 120);
    setTimeout(() => playSweetChime(783.99), 240);

    // Shake chalkboard animation
    const board = document.querySelector('.chalkboard-box');
    board.style.transform = 'scale(1.04) rotate(-2deg)';
    setTimeout(() => { board.style.transform = 'scale(0.98) rotate(2deg)'; }, 100);
    setTimeout(() => { board.style.transform = 'scale(1) rotate(0deg)'; }, 200);

    // Hide math, show "I MISS YOU :("
    mathEquation.classList.add('hidden');
    mathTrickReveal.classList.remove('hidden');
    inputContainer.classList.add('hidden');
    stage1NextBox.classList.remove('hidden');

    // Confetti burst
    if (window.confetti) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#ff3366', '#ff6b8b', '#ffd3dd', '#ffb703']
      });
    }
  }

  submitMathBtn.addEventListener('click', triggerMathTrick);
  mathInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') triggerMathTrick();
  });

  toStage2Btn.addEventListener('click', () => {
    switchStage('stage1', 'stage2');
  });

  // ==========================================================================
  // 5. STAGE 2: 3D ENVELOPE & TYPEWRITER ENGINE
  // ==========================================================================
  const envelope = document.getElementById('envelope');
  const envelopeHint = document.getElementById('envelopeHint');
  const typewriterText = document.getElementById('typewriterText');
  const typewriterCursor = document.getElementById('typewriterCursor');
  const stage2NextBox = document.getElementById('stage2NextBox');
  const toStage3Btn = document.getElementById('toStage3Btn');
  let letterOpened = false;

  const letterContent = `Intan, tau gak? Dari sekian banyak orang yang aku kenal, ngobrol dan becanda bareng kamu tuh selalu jadi bagian paling seru di hariku. Senyum kamu candu banget, bikin hariku yang tadinya biasa aja jadi jauh lebih cerah dan berwarna. Makasih yaa udah hadir dan jadi sosok yang se-gemas dan se-spesial ini. Semoga kehangatan dan rasa nyaman ini bisa terus berlanjut yaa, Intan! ✨💖`;

  function startTypewriter() {
    let index = 0;
    typewriterText.textContent = '';
    const speed = 35; // ms per char

    function typeChar() {
      if (index < letterContent.length) {
        typewriterText.textContent += letterContent.charAt(index);
        index++;
        if (index % 4 === 0) playSweetChime(800 + Math.random() * 200, 'sine', 0.05);
        setTimeout(typeChar, speed);
      } else {
        typewriterCursor.style.display = 'none';
        stage2NextBox.classList.remove('hidden');
      }
    }
    typeChar();
  }

  envelope.addEventListener('click', () => {
    if (!letterOpened) {
      letterOpened = true;
      envelope.classList.add('open');
      envelopeHint.style.display = 'none';
      playSweetChime(440);
      setTimeout(startTypewriter, 700);
    }
  });

  toStage3Btn.addEventListener('click', () => {
    switchStage('stage2', 'stage3');
  });

  // ==========================================================================
  // 6. STAGE 3: 3D POLAROID PARALLAX TILT & COMPLIMENT CHIPS
  // ==========================================================================
  const polaroidOuter = document.getElementById('polaroidOuter');
  const polaroidInner = document.getElementById('polaroidInner');
  const toStage4Btn = document.getElementById('toStage4Btn');
  const complimentChips = document.querySelectorAll('.compliment-chip');
  const complimentToast = document.getElementById('complimentToast');

  // Parallax 3D Tilt on Pointer Move
  if (polaroidOuter && polaroidInner) {
    polaroidOuter.addEventListener('mousemove', (e) => {
      const rect = polaroidOuter.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotX = -(y / (rect.height / 2)) * 12;
      const rotY = (x / (rect.width / 2)) * 12;
      polaroidInner.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.04)`;
    });

    polaroidOuter.addEventListener('mouseleave', () => {
      polaroidInner.style.transform = 'perspective(600px) rotate(-2deg) scale(1)';
    });
  }

  // Compliment Chips Click
  complimentChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const text = chip.getAttribute('data-text');
      complimentToast.textContent = text;
      complimentToast.classList.remove('hidden');
      playSweetChime(880, 'triangle', 0.15);

      if (window.confetti) {
        confetti({
          particleCount: 25,
          spread: 40,
          origin: { y: 0.7 },
          colors: ['#ff3366', '#ffb703', '#f472b6']
        });
      }
    });
  });

  toStage4Btn.addEventListener('click', () => {
    switchStage('stage3', 'stage4');
  });

  // ==========================================================================
  // 7. STAGE 4: INTERACTIVE LOVE METER 1000%
  // ==========================================================================
  const loveSlider = document.getElementById('loveSlider');
  const meterPercent = document.getElementById('meterPercent');
  const meterStatus = document.getElementById('meterStatus');
  const meterHeart = document.getElementById('meterHeart');
  const toStage5Btn = document.getElementById('toStage5Btn');

  const statusMilestones = [
    { min: 0, max: 150, text: 'Nyaman standar sebagai temen? Masa sih... 🥺', icon: '💖', scale: 1 },
    { min: 151, max: 400, text: 'Mulai kerasa nih getar-getar saltingnya! 🥰', icon: '💕', scale: 1.2 },
    { min: 401, max: 750, text: 'Nyaman bangeeeet, betah ngobrol tiap hari! 💓', icon: '💘', scale: 1.4 },
    { min: 751, max: 950, text: 'HAMPIR MELEDAK! Tiap dichat langsung senyum sendiri! 🔥', icon: '💖', scale: 1.7 },
    { min: 951, max: 1000, text: '1000% JEBOL! UDAH FIX NYAMAN BANGET & GAK BOLEH NGILANG! 🎉', icon: '💥', scale: 2.1 }
  ];

  let explosionTriggered = false;

  loveSlider.addEventListener('input', (e) => {
    const val = parseInt(e.target.value);
    meterPercent.textContent = `${val}%`;

    const found = statusMilestones.find(m => val >= m.min && val <= m.max);
    if (found) {
      meterStatus.textContent = found.text;
      meterHeart.innerHTML = `<span class="meter-heart-icon">${found.icon}</span>`;
      meterHeart.style.transform = `scale(${found.scale})`;
    }

    if (val >= 980 && !explosionTriggered) {
      explosionTriggered = true;
      playSweetChime(1046.50, 'square', 0.4);
      if (window.confetti) {
        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#ff0055', '#ff77aa', '#ffdd00', '#00ffcc']
        });
      }
    } else if (val < 900) {
      explosionTriggered = false;
    }
  });

  toStage5Btn.addEventListener('click', () => {
    switchStage('stage4', 'stage5');
  });

  // ==========================================================================
  // 8. STAGE 5: RUNNING "GAMAU" EVASION PHYSICS ENGINE
  // ==========================================================================
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const evasionTaunt = document.getElementById('evasionTaunt');
  const buttonArena = document.getElementById('buttonArena');

  let yesScale = 1;
  let noAttempts = 0;
  const tauntList = [
    'Eits gabisa nolak pendekatan aku wkwkwk 😜',
    'Gaboleh ngilang yaa calon kesayangan! 🔒',
    'Tombol ini rusak khusus buat kamu! 😂',
    'Tuh kan tombol MAU-nya makin gede! 💖',
    'Udah klik MAU aja, jangan gengsi dong! 🥺👉👈'
  ];

  function evadeNoButton(e) {
    if (e) e.preventDefault();
    noAttempts++;

    // Calculate dynamic randomized positions constrained to buttonArena
    const arenaRect = buttonArena.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    const maxLeft = arenaRect.width - btnRect.width - 20;
    const maxTop = arenaRect.height - btnRect.height - 20;

    const randomLeft = Math.max(10, Math.floor(Math.random() * maxLeft));
    const randomTop = Math.max(10, Math.floor(Math.random() * maxTop));

    noBtn.style.position = 'absolute';
    noBtn.style.left = `${randomLeft}px`;
    noBtn.style.top = `${randomTop}px`;

    // Scale up YES button!
    yesScale += 0.12;
    yesBtn.style.transform = `scale(${yesScale})`;

    // Cycle Taunt text
    const taunt = tauntList[noAttempts % tauntList.length];
    evasionTaunt.innerHTML = `<em>${taunt}</em>`;

    playSweetChime(300 + Math.random() * 200, 'sawtooth', 0.1);
  }

  // Mouse hover & Mobile Touch Evade
  noBtn.addEventListener('mouseenter', evadeNoButton);
  noBtn.addEventListener('touchstart', evadeNoButton, { passive: false });
  noBtn.addEventListener('click', evadeNoButton);

  // YES button clicked -> GRAND FINALE!
  yesBtn.addEventListener('click', () => {
    playSweetChime(523.25);
    setTimeout(() => playSweetChime(659.25), 100);
    setTimeout(() => playSweetChime(783.99), 200);
    setTimeout(() => playSweetChime(1046.50), 300);

    if (window.confetti) {
      // Mega Confetti Blast!
      const end = Date.now() + 2.5 * 1000;
      const colors = ['#ff3366', '#ffb703', '#10b981', '#ffffff', '#ff6b8b'];
      (function frame() {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      })();
    }

    switchStage('stage5', 'stage6');
  });

  // ==========================================================================
  // 9. STAGE 6: GRAND FINALE & WHATSAPP BRIDGE
  // ==========================================================================
  const waReplyBtn = document.getElementById('waReplyBtn');
  const replayBtn = document.getElementById('replayBtn');

  // WhatsApp reply link configuration
  const phoneLukman = '6285718532060';
  const customMessage = encodeURIComponent(
    'Aaaakkk lucuuu bangeeet webnyaaa! Asli aku salting brutal liatnya wkwk, makasih yaa Lukman! Kangen ngobrol juga kok! 💖🥺'
  );
  waReplyBtn.href = `https://wa.me/${phoneLukman}?text=${customMessage}`;

  replayBtn.addEventListener('click', () => {
    // Reset states
    yesScale = 1;
    yesBtn.style.transform = 'scale(1)';
    noBtn.style.position = 'relative';
    noBtn.style.left = 'auto';
    noBtn.style.top = 'auto';
    mathInput.value = '';
    mathEquation.classList.remove('hidden');
    mathTrickReveal.classList.add('hidden');
    inputContainer.classList.remove('hidden');
    stage1NextBox.classList.add('hidden');
    envelope.classList.remove('open');
    letterOpened = false;
    envelopeHint.style.display = 'block';
    typewriterText.textContent = '';
    typewriterCursor.style.display = 'inline-block';
    stage2NextBox.classList.add('hidden');
    loveSlider.value = 100;
    meterPercent.textContent = '100%';
    meterStatus.textContent = 'Sayang Standar! Tapi masa cuma segitu? 🤔';
    meterHeart.style.transform = 'scale(1)';

    switchStage('stage6', 'stage0');
  });

});
