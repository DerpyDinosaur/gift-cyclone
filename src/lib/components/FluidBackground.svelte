<div class="fixed top-0 left-0 w-full h-full -z-10">
    <canvas bind:this={canvas} class="{isReady ? 'opacity-100' : 'opacity-0'} transition duration-400 ease-in"></canvas>
</div>

<script>
  import { onMount } from 'svelte';

  let canvas = $state();
  let time = $state(0);
  let { isReady = $bindable(false) } = $props();

  // Permutation table for noise
  const permutation = [151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];
  const p = new Array(512);
  for (let i = 0; i < 256; i++) {
    p[i] = p[i + 256] = permutation[i];
  }

  function fade(t) {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  function lerp(t, a, b) {
    return a + t * (b - a);
  }

  function grad(hash, x, y) {
    const h = hash & 3;
    const u = h < 2 ? x : y;
    const v = h < 2 ? y : x;
    return ((h & 1) ? -u : u) + ((h & 2) ? -2.0 * v : 2.0 * v);
  }

  function noise(x, y) {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    x -= Math.floor(x);
    y -= Math.floor(y);
    const u = fade(x);
    const v = fade(y);
    const a = p[X] + Y;
    const b = p[X + 1] + Y;
    return lerp(v,
      lerp(u, grad(p[a], x, y), grad(p[b], x - 1, y)),
      lerp(u, grad(p[a + 1], x, y - 1), grad(p[b + 1], x - 1, y - 1))
    );
  }

  function fbm(x, y, octaves = 6) {
    let value = 0;
    let amplitude = 0.5;
    let frequency = 1.0;
    for (let i = 0; i < octaves; i++) {
      value += amplitude * noise(x * frequency, y * frequency);
      frequency *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  function pattern(px, py, t) {
    // First level of warping
    const qx = fbm(px + 0.0, py + 0.0 + t * 0.1, 4);
    const qy = fbm(px + 5.2, py + 1.3 + t * 0.1, 4);

    // Second level of warping
    const rx = fbm(px + 4.0 * qx + 1.7, py + 4.0 * qy + 9.2 + t * 0.15, 4);
    const ry = fbm(px + 4.0 * qx + 8.3, py + 4.0 * qy + 2.8 + t * 0.15, 4);

    // Final pattern
    const f = fbm(px + 4.0 * rx, py + 4.0 * ry, 5);

    return { f, qx, qy, rx, ry };
  }

  function render() {
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;
    const scale = 0.003;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const px = x * scale;
        const py = y * scale;

        const { f, qx, qy, rx, ry } = pattern(px, py, time);

        // Create Christmas color palette
        let r, g, b;
        const t1 = (f + 1.0) * 0.5;
        const t2 = (Math.sqrt(qx * qx + qy * qy)) * 0.5;
        const t3 = (ry + 1.0) * 0.5;

        if (t1 < 0.4) {
          // Deep forest green
          r = 26 + t2 * 50;
          g = 77 + t2 * 80;
          b = 46 + t2 * 30;
        } else if (t1 < 0.6) {
          // Transition zone
          const mix = (t1 - 0.4) * 5;
          r = lerp(mix, 26, 139) + t3 * 40;
          g = lerp(mix, 77, 26) + t3 * 20;
          b = lerp(mix, 46, 26);
        } else {
          // Christmas red
          r = 139 + t3 * 80;
          g = 26 + t3 * 50;
          b = 26 + t3 * 32;
        }

        // Add gold highlights
        const highlight = Math.max(0, qx * qy) * 100;
        r += highlight;
        g += highlight * 0.7;
        b += highlight * 0.2;

        // Subtle variations
        r += rx * 30;
        g += rx * 20;

        // Clamp values
        r = Math.max(0, Math.min(255, r));
        g = Math.max(0, Math.min(255, g));
        b = Math.max(0, Math.min(255, b));

        const idx = (y * width + x) * 4;
        data[idx] = r;
        data[idx + 1] = g;
        data[idx + 2] = b;
        data[idx + 3] = 255;
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }

  function resize() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  }

  onMount(() => {
    resize();
    render();
    window.addEventListener('resize', resize);
  });
</script>
