<script lang="ts">
  import { theme } from '$lib/theme';
  import ExchangeRate from '$lib/components/ExchangeRate.svelte';
  import BudgetInfo from '$lib/components/BudgetInfo.svelte';
  import BudgetChart from '$lib/components/BudgetChart.svelte';
  import Sources from '$lib/components/Sources.svelte';

  let currentTime = new Date();

  $: formattedTime = currentTime.toLocaleString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  function toggleTheme() {
    $theme = $theme === 'light' ? 'dark' : 'light';
  }
</script>

<div class="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-200">
  <div class="container mx-auto px-3 py-4 max-w-5xl">
    <!-- Header -->
    <header class="flex justify-between items-start mb-6 border-b border-gray-300 dark:border-gray-700 pb-3">
      <div>
        <h1 class="text-lg font-bold tracking-tight">ANGGARAN & PROGRAM MBG</h1>
        <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">Monitor alokasi anggaran Program Makan Bergizi Gratis Nasional</p>
        <p class="text-xs text-gray-500 dark:text-gray-500 mt-1">Update: {formattedTime}</p>
      </div>
      <button
        on:click={toggleTheme}
        class="border border-gray-300 dark:border-gray-700 px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
        aria-label="Toggle theme"
      >
        {$theme === 'light' ? '◐' : '◑'}
      </button>
    </header>

    <!-- Main Content Grid -->
    <div class="grid md:grid-cols-2 gap-3 mb-4">
      <ExchangeRate />
      <BudgetInfo />
    </div>

    <!-- Grafik Section -->
    <BudgetChart />

    <!-- Sumber Data -->
    <Sources />
  </div>
</div>
