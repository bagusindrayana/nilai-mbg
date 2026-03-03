<script lang="ts">
  import ExchangeRate from '$lib/components/ExchangeRate.svelte';
  import BudgetInfo from '$lib/components/BudgetInfo.svelte';
  import BudgetChart from '$lib/components/BudgetChart.svelte';
  import Sources from '$lib/components/Sources.svelte';
  
  let currentTime = new Date();
  
  // Update time setiap detik
  setInterval(() => {
    currentTime = new Date();
  }, 1000);
  
  $: formattedTime = currentTime.toLocaleString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
</script>

<div class="bg-gray-50 min-h-screen">
  <div class="container mx-auto px-4 py-8 max-w-7xl">
    <!-- Header -->
    <header class="text-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-3">
        Anggaran & Program Makan Bergizi Gratis (MBG)
      </h1>
      <p class="text-gray-600 mb-2">Monitor alokasi anggaran dan informasi Program Makan Bergizi Gratis Nasional</p>
      <p class="text-sm text-gray-500">Update: {formattedTime}</p>
    </header>

    <!-- Main Content Grid -->
    <div class="grid lg:grid-cols-2 gap-6 mb-8">
      <ExchangeRate />
      <BudgetInfo />
    </div>

    <!-- Grafik Section -->
    <BudgetChart />

    <!-- Sumber Data -->
    <Sources />
  </div>
</div>
