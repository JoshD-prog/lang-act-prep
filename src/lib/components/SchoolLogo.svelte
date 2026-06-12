<script lang="ts">
  import type { School } from '$lib/types';

  let {
    school,
    frameClass = '',
    imageClass = ''
  }: {
    school: School;
    frameClass?: string;
    imageClass?: string;
  } = $props();

  let imageFailed = $state(false);

  const verifiedSchoolLogoUrls = new Set([
    '/school-logos/christ-preparatory-academy.png',
    '/school-logos/lansing-high-school.png',
    '/school-logos/shawnee-mission-christian-school.png',
    '/school-logos/southland-academy.png',
    '/school-logos/wyandotte-high-school.png'
  ]);

  const imageUrl = $derived(school.heroImageUrl.trim());
  const verifiedImageUrl = $derived(verifiedSchoolLogoUrls.has(imageUrl) ? imageUrl : '');
  const showImage = $derived(Boolean(verifiedImageUrl) && !imageFailed);
  const initials = $derived(
    school.name
      .replace(/\b(high|school|academy|christian|preparatory|classical|conversations)\b/gi, '')
      .split(/\s+/)
      .map((word) => word[0])
      .filter(Boolean)
      .slice(0, 3)
      .join('')
      .toUpperCase() || school.name.slice(0, 2).toUpperCase()
  );
  const needsDarkLogoBackdrop = $derived(
    verifiedImageUrl.includes('FFFFFF') || verifiedImageUrl.includes('christ-preparatory-academy')
  );
  const backdropClass = $derived(needsDarkLogoBackdrop ? 'bg-slate-900' : 'bg-slate-50');
</script>

<div class={`flex items-center justify-center overflow-hidden ${backdropClass} ${frameClass}`}>
  {#if showImage}
    <img
      src={verifiedImageUrl}
      alt={school.name}
      class={`h-full w-full object-contain ${imageClass}`}
      loading="lazy"
      onerror={() => {
        imageFailed = true;
      }}
    />
  {:else}
    <div class="flex h-full w-full items-center justify-center bg-slate-50 p-6 text-center">
      <div>
        <p class="text-4xl font-black text-sky">{initials}</p>
        <p class="mt-2 text-sm font-bold leading-5 text-ink">{school.name}</p>
      </div>
    </div>
  {/if}
</div>
