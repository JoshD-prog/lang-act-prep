import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({ runtime: 'nodejs22.x'}),
    alias: {
      '$components': 'src/lib/components',
      '$content': 'src/lib/content'
    }
  }
};

export default config;
