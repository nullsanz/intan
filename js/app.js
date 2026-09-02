/**
 * SPESIAL UNTUK INTAN — INTERACTIVE ROMANTIC ENGINE
 * Written with genuine affection by Lukman
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // ==========================================================================
  // 1. LIGHTWEIGHT CANVAS PARTICLES (OPTIMIZED 60 FPS ZERO LAG)
  // ==========================================================================
  const canvas = document.getElementById('heartCanvas');
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const particles = [];
  const maxParticles = window.innerWidth < 600 ? 16 : 28; // Mobile battery & performance friendly
  const emojis = ['💖', '🌸', '✨', '💕', '🌷', '🥺'];

  class Particle {
    constructor() {
      this.reset(true);
    }
    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 20;
      this.size = Math.random() * 12 + 14;
      this.speedY = Math.random() * 1.2 + 0.6;
      this.speedX = Math.sin(Math.random() * Math.PI) * 0.8 - 0.4;
      this.opacity = Math.random() * 0.5 + 0.3;
      this.emoji = emojis[Math.floor(Math.random() * emojis.length)];
      this.wobble = Math.random() * Math.PI * 2;
      this.wobbleSpeed = Math.random() * 0.03 + 0.01;
    }
    update() {
      this.y -= this.speedY;
      this.wobble += this.wobbleSpeed;
      this.x += Math.sin(this.wobble) * 0.6;
      if (this.y < -30) {
        this.reset();
      }
    }
    draw() {
      ctx.globalAlpha = this.opacity;
      ctx.font = `${Math.round(this.size)}px Arial`;
      ctx.fillText(this.emoji, Math.round(this.x), Math.round(this.y));
    }
  }

  for (let i = 0; i < maxParticles; i++) {
    particles.push(new Particle());
  }

  let isPageVisible = true;
  document.addEventListener('visibilitychange', () => {
    isPageVisible = !document.hidden;
  });

  function animateParticles() {
    if (isPageVisible) {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
    }
    requestAnimationFrame(animateParticles);
  }
  requestAnimationFrame(animateParticles);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // ==========================================================================
  // 2. BACKGROUND MUSIC & SOUND SYNTHESIS
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
      }).catch(() => {});
    }
  }

  if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', toggleMusic);
  }

  // Web Audio Synthesizer for instant sweet chimes without asset lag
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  let audioCtx = null;

  function playSweetChime(freq = 523.25) {
    try {
      if (!audioCtx) audioCtx = new AudioContext();
      if (audioCtx.state === 'suspended') audioCtx.resume();

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, audioCtx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.35);
    } catch (e) {}
  }

  // ==========================================================================
  // 3. BUTTERY SMOOTH STAGE TRANSITION ENGINE
  // ==========================================================================
  function switchStage(currentStageId, nextStageId) {
    const currentEl = document.getElementById(currentStageId);
    const nextEl = document.getElementById(nextStageId);
    if (!currentEl || !nextEl) return;

    // Exit current stage with smooth fade-scale
    currentEl.classList.add('anim-exit');
    currentEl.classList.remove('active');

    setTimeout(() => {
      currentEl.classList.add('hidden');
      currentEl.classList.remove('anim-exit');

      // Enter next stage
      nextEl.classList.remove('hidden');
      nextEl.classList.add('active');

      // Scroll smoothly to top
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Refresh lucide icons in newly revealed stage
      if (window.lucide) window.lucide.createIcons();
    }, 280);
  }

  // ==========================================================================
  // 3.5. STAGE 0: WELCOME MYSTERY GATEWAY
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
        particleCount: 35,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#ff3366', '#ffb703', '#f472b6']
      });
    }

    switchStage('stage0', 'stage1');
  }

  if (startJourneyBtn) startJourneyBtn.addEventListener('click', startMysteryExperience);
  if (giftBoxTrigger) giftBoxTrigger.addEventListener('click', startMysteryExperience);

  // ==========================================================================
  // 4. STAGE 1: MATH RIDDLE WITH MANDATORY VALIDATION
  // ==========================================================================
  const mathInput = document.getElementById('mathInput');
  const submitMathBtn = document.getElementById('submitMathBtn');
  const mathErrorMsg = document.getElementById('mathErrorMsg');
  const mathEquation = document.getElementById('mathEquation');
  const mathTrickReveal = document.getElementById('mathTrickReveal');
  const inputContainer = document.getElementById('inputContainer');
  const stage1NextBox = document.getElementById('stage1NextBox');
  const toStage2Btn = document.getElementById('toStage2Btn');

  function handleMathSubmit() {
    const inputVal = mathInput.value.trim();

    // Input Validation: User MUST type something!
    if (!inputVal) {
      mathInput.classList.add('error-shake');
      if (mathErrorMsg) mathErrorMsg.classList.remove('hidden');
      playSweetChime(220); // Low error tone
      setTimeout(() => mathInput.classList.remove('error-shake'), 450);
      return;
    }

    if (mathErrorMsg) mathErrorMsg.classList.add('hidden');

    // Sweet success sounds
    playSweetChime(440);
    setTimeout(() => playSweetChime(660), 120);
    setTimeout(() => playSweetChime(880), 240);

    // Trigger Math Trick Morphing Animation
    mathEquation.classList.add('hidden');
    mathTrickReveal.classList.remove('hidden');
    inputContainer.classList.add('hidden');
    stage1NextBox.classList.remove('hidden');

    // Confetti burst
    if (window.confetti) {
      confetti({
        particleCount: 45,
        spread: 75,
        origin: { y: 0.55 },
        colors: ['#ff2d6c', '#ff758c', '#ffb703']
      });
    }
  }

  if (submitMathBtn) {
    submitMathBtn.addEventListener('click', handleMathSubmit);
  }

  if (mathInput) {
    mathInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleMathSubmit();
    });
    // Remove error message once user starts typing
    mathInput.addEventListener('input', () => {
      if (mathErrorMsg) mathErrorMsg.classList.add('hidden');
    });
  }

  if (toStage2Btn) {
    toStage2Btn.addEventListener('click', () => {
      switchStage('stage1', 'stage2');
    });
  }

  // ==========================================================================
  // 5. STAGE 2: 3D ROMANTIC LOVE LETTER & TYPEWRITER EFFECT
  // ==========================================================================
  const envelope = document.getElementById('envelope');
  const envelopeHint = document.getElementById('envelopeHint');
  const typewriterText = document.getElementById('typewriterText');
  const typewriterCursor = document.getElementById('typewriterCursor');
  const stage2NextBox = document.getElementById('stage2NextBox');
  const toStage3Btn = document.getElementById('toStage3Btn');

  const letterContent =
    'Hai Intan... Jujur ya, dari sekian banyak hal yang bikin capek akhir-akhir ini, notif chat atau denger suara ketawa kamu tuh selalu jadi moodbooster terbaik buat aku. Senyum kamu tuh manis banget, bikin salting tiap keinget wkwk. Makasih yaa udah hadir dan se-asik ini pas ngobrol bareng aku. Jangan bosen-bosen yaa sama aku, Intan! ✨💖';

  let letterOpened = false;

  function openLetterAndType() {
    if (letterOpened) return;
    letterOpened = true;

    envelope.classList.add('open');
    if (envelopeHint) envelopeHint.style.display = 'none';

    playSweetChime(587.33);
    setTimeout(() => playSweetChime(880), 200);

    // Typewriter effect
    let charIndex = 0;
    typewriterText.textContent = '';
    const typingInterval = setInterval(() => {
      if (charIndex < letterContent.length) {
        typewriterText.textContent += letterContent.charAt(charIndex);
        charIndex++;
      } else {
        clearInterval(typingInterval);
        if (typewriterCursor) typewriterCursor.style.display = 'none';
        stage2NextBox.classList.remove('hidden');
      }
    }, 28);
  }

  if (envelope) {
    envelope.addEventListener('click', openLetterAndType);
  }

  if (toStage3Btn) {
    toStage3Btn.addEventListener('click', () => {
      switchStage('stage2', 'stage3');
    });
  }

  // ==========================================================================
  // 6. STAGE 3: 3D POLAROID PHOTO FRAME & COMPLIMENTS
  // ==========================================================================
  const polaroidOuter = document.getElementById('polaroidOuter');
  const polaroidInner = document.getElementById('polaroidInner');
  const complimentChips = document.querySelectorAll('.compliment-chip');
  const complimentToast = document.getElementById('complimentToast');
  const toStage4Btn = document.getElementById('toStage4Btn');

  // 3D Parallax Tilt Effect on Mouse/Touch
  if (polaroidOuter && polaroidInner) {
    polaroidOuter.addEventListener('mousemove', (e) => {
      const rect = polaroidOuter.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = (-y / rect.height) * 16;
      const rotateY = (x / rect.width) * 16;
      polaroidInner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    polaroidOuter.addEventListener('mouseleave', () => {
      polaroidInner.style.transform = 'rotate(-2deg) scale(1)';
    });
  }

  complimentChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const text = chip.getAttribute('data-text');
      if (complimentToast) {
        complimentToast.textContent = text;
        complimentToast.classList.remove('hidden');
      }
      playSweetChime(659.25);
      if (window.confetti) {
        confetti({
          particleCount: 15,
          spread: 45,
          origin: { y: 0.6 }
        });
      }
    });
  });

  if (toStage4Btn) {
    toStage4Btn.addEventListener('click', () => {
      switchStage('stage3', 'stage4');
    });
  }

  // ==========================================================================
  // 7. STAGE 4: INTERACTIVE LOVE / COMFORT METER SLIDER
  // ==========================================================================
  const loveSlider = document.getElementById('loveSlider');
  const meterPercent = document.getElementById('meterPercent');
  const meterStatus = document.getElementById('meterStatus');
  const meterHeart = document.getElementById('meterHeart');
  const toStage5Btn = document.getElementById('toStage5Btn');

  const statusMilestones = [
    { max: 150, text: 'Dih, masa cuma segini? Bohong banget wkwk 🥺' },
    { max: 400, text: 'Mulai kerasa ada getar-getar salting nih! 🥰' },
    { max: 750, text: 'Asik bangeeet, betah begadang tiap malem! 💓' },
    { max: 950, text: 'HAMPIR MELEDAK! Tiap dichat langsung senyum-senyum sendiri! 🔥' },
    { max: 1000, text: '1000% JEBOL! UDAH FIX NYAMAN BANGET & GAK BOLEH ILANG! 🎉' }
  ];

  if (loveSlider) {
    loveSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value);
      meterPercent.textContent = `${val}%`;

      // Dynamic heart scale
      const heartScale = 1 + (val / 1000) * 0.7;
      meterHeart.style.transform = `scale(${heartScale})`;

      // Update text
      for (const m of statusMilestones) {
        if (val <= m.max) {
          meterStatus.textContent = m.text;
          break;
        }
      }

      // Fireworks when hitting 1000%
      if (val === 1000) {
        playSweetChime(987.77);
        if (window.confetti) {
          confetti({
            particleCount: 60,
            spread: 90,
            origin: { y: 0.6 },
            colors: ['#ff3366', '#ffb703', '#10b981']
          });
        }
      }
    });
  }

  if (toStage5Btn) {
    toStage5Btn.addEventListener('click', () => {
      switchStage('stage4', 'stage5');
    });
  }

  // ==========================================================================
  // 8. STAGE 5: RESPONSIVE EVASIVE "GAMAU" BUTTON ARENA (NO BLOWOUT)
  // ==========================================================================
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const buttonArena = document.getElementById('buttonArena');
  const evasionTaunt = document.getElementById('evasionTaunt');

  const tauntList = [
    'Eits gabisa nolak wkwkwk 😜',
    'Gaboleh ngilang yaa calon kesayangan! 🔒',
    'Tombol ini rusak khusus buat kamu! 😂',
    'Tuh kan tombol MAU-nya makin gede! 💖',
    'Udah klik MAU aja, jangan gengsi dong! 🥺👉👈'
  ];
  let tauntIdx = 0;
  let yesScale = 1.0;

  function runAway() {
    if (!buttonArena || !noBtn) return;
    
    // Switch to absolute positioning inside arena
    noBtn.style.position = 'absolute';

    const arenaRect = buttonArena.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // Strict boundary limits to prevent overflowing outside the card
    const maxX = Math.max(10, arenaRect.width - btnRect.width - 16);
    const maxY = Math.max(10, arenaRect.height - btnRect.height - 16);

    const randomX = Math.floor(Math.random() * maxX) + 8;
    const randomY = Math.floor(Math.random() * maxY) + 8;

    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;

    // Gradually enlarge YES button (clamped to max 1.25x so it never overflows)
    if (yesScale < 1.25) {
      yesScale += 0.06;
      yesBtn.style.transform = `scale(${yesScale})`;
    }

    // Cycle funny taunt
    if (evasionTaunt) {
      evasionTaunt.innerHTML = `<em>${tauntList[tauntIdx % tauntList.length]}</em>`;
      tauntIdx++;
    }

    playSweetChime(700 + Math.random() * 200);
  }

  if (noBtn) {
    noBtn.addEventListener('mouseover', runAway);
    noBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      runAway();
    });
    noBtn.addEventListener('click', (e) => {
      e.preventDefault();
      runAway();
    });
  }

  if (yesBtn) {
    yesBtn.addEventListener('click', () => {
      playSweetChime(523.25);
      setTimeout(() => playSweetChime(659.25), 100);
      setTimeout(() => playSweetChime(783.99), 200);
      setTimeout(() => playSweetChime(1046.5), 300);

      if (window.confetti) {
        confetti({
          particleCount: 80,
          spread: 100,
          origin: { y: 0.6 }
        });
      }

      switchStage('stage5', 'stage6');
    });
  }

  // ==========================================================================
  // 9. STAGE 6: FINALE, CERTIFICATE & WHATSAPP ACTION
  // ==========================================================================
  const waReplyBtn = document.getElementById('waReplyBtn');
  const replayBtn = document.getElementById('replayBtn');

  // WhatsApp reply link configuration
  const phoneLukman = '6285718532060';
  const customMessage = encodeURIComponent(
    'Aaaakkk lucuuu bangeeet webnyaaa! Asli aku salting brutal liatnya wkwk, makasih yaa Lukman! Kangen ngobrol juga kok! 💖🥺'
  );
  if (waReplyBtn) {
    waReplyBtn.href = `https://wa.me/${phoneLukman}?text=${customMessage}`;
  }

  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      // Reset states
      yesScale = 1.0;
      if (yesBtn) yesBtn.style.transform = 'scale(1)';
      if (noBtn) {
        noBtn.style.position = 'relative';
        noBtn.style.left = 'auto';
        noBtn.style.top = 'auto';
      }
      if (mathInput) mathInput.value = '';
      if (mathEquation) mathEquation.classList.remove('hidden');
      if (mathTrickReveal) mathTrickReveal.classList.add('hidden');
      if (inputContainer) inputContainer.classList.remove('hidden');
      if (stage1NextBox) stage1NextBox.classList.add('hidden');
      if (envelope) envelope.classList.remove('open');
      letterOpened = false;
      if (envelopeHint) envelopeHint.style.display = 'block';
      if (typewriterText) typewriterText.textContent = '';
      if (typewriterCursor) typewriterCursor.style.display = 'inline-block';
      if (stage2NextBox) stage2NextBox.classList.add('hidden');
      if (loveSlider) loveSlider.value = 100;
      if (meterPercent) meterPercent.textContent = '100%';
      if (meterStatus) meterStatus.textContent = 'Dih, masa cuma segini? Bohong banget wkwk 🥺';
      if (meterHeart) meterHeart.style.transform = 'scale(1)';

      switchStage('stage6', 'stage0');
    });
  }
});
