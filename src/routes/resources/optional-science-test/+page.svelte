<script lang="ts">
  import Seo from '$lib/components/Seo.svelte';

  const youtubeVideoId = 'g8imXj6-BVc';
  const youtubeEmbedUrl = youtubeVideoId
    ? `https://www.youtube-nocookie.com/embed/${youtubeVideoId}?rel=0`
    : '';
</script>

<Seo
  title="Optional ACT Science Test Lecture"
  description="Class resource for students preparing to do well on the optional ACT science test."
  robots="noindex, nofollow"
/>

<section class="page-hero p-8 md:p-10">
  <div>
    <p class="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">Class resource</p>
    <h1 class="mt-2 max-w-4xl text-4xl font-black leading-tight text-ink md:text-5xl">
      Optional ACT Science Test Lecture
    </h1>
    <p class="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
      Use this lesson to prepare for the science section with a practical plan for reading data, handling experiments,
      managing time, and avoiding common traps.
    </p>
  </div>
</section>

<section class="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10">
  <div class="aspect-video bg-slate-950">
    {#if youtubeEmbedUrl}
      <iframe
        class="h-full w-full"
        src={youtubeEmbedUrl}
        title="Optional ACT Science Test Lecture"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    {:else}
      <div class="flex h-full flex-col items-center justify-center px-6 text-center">
        <p class="text-xs font-bold uppercase tracking-[0.16em] text-sky-200">Coming soon</p>
        <h2 class="mt-3 max-w-2xl text-3xl font-black text-white md:text-4xl">
          The optional science test lecture will appear here.
        </h2>
        <p class="mt-4 max-w-xl text-sm leading-6 text-slate-300">
          This resource is designed to help you attack science passages more efficiently and answer data-based questions
          with more confidence.
        </p>
      </div>
    {/if}
  </div>
</section>
