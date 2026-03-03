<script lang="ts">
  import { onMount } from 'svelte';
  import { theme } from '$lib/theme';
  import Chart from 'chart.js/auto';
  
  let chartCanvas: HTMLCanvasElement;
  let chart: Chart;
  let selectedYear = '2026';
  
  const budget2025Realization = 52900000000000;
  const budget2025Pagu = 71000000000000;
  const budget2026 = 335000000000000;
  
  const yearlyData = {
    '2025': {
      pagu: budget2025Pagu,
      realization: budget2025Realization,
      recipients: 50700000,
      sppg: 17555,
      workers: 741985
    },
    '2026': {
      pagu: budget2026,
      realization: 0,
      recipients: 60000000,
      sppg: 23678,
      workers: 0
    }
  };
  
  function getChartColors(isDark: boolean) {
    return {
      bar1: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
      bar2: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
      border: isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)',
      grid: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
      text: isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)'
    };
  }
  
  function createChart() {
    if (chart) {
      chart.destroy();
    }
    
    const ctx = chartCanvas.getContext('2d');
    if (!ctx) return;
    
    const isDark = $theme === 'dark';
    const colors = getChartColors(isDark);
    
    chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['2025 (Realisasi)', '2026 (Anggaran)'],
        datasets: [{
          label: 'Anggaran (Rp Triliun)',
          data: [
            budget2025Realization / 1000000000000,
            budget2026 / 1000000000000
          ],
          backgroundColor: [colors.bar1, colors.bar2],
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: isDark ? '#000' : '#fff',
            titleColor: colors.text,
            bodyColor: colors.text,
            borderColor: colors.border,
            borderWidth: 1,
            callbacks: {
              label: function(context: any) {
                const value = context.parsed.y;
                return 'Rp ' + (value ?? 0).toFixed(1) + ' Triliun';
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value: any) {
                return value + ' T';
              },
              color: colors.text
            },
            grid: {
              color: colors.grid
            },
            title: {
              display: true,
              text: 'Rp Trlinien',
              color: colors.text
            }
          },
          x: {
            ticks: {
              color: colors.text
            },
            grid: {
              display: false
            }
          }
        }
      }
    });
  }
  
  function selectYear(year: string) {
    selectedYear = year;
  }
  
  onMount(() => {
    createChart();
  });
  
  $: if (chartCanvas && $theme) {
    createChart();
  }
  
  $: currentData = yearlyData[selectedYear as keyof typeof yearlyData];
  $: formattedPagu = (currentData.pagu / 1000000000000).toFixed(0);
  $: formattedRealization = currentData.realization > 0 
    ? (currentData.realization / 1000000000000).toFixed(1) 
    : '-';
  $: formattedRecipients = (currentData.recipients / 1000000000).toFixed(1);
</script>

<div class="border border-gray-300 dark:border-gray-700 p-3 mb-4">
  <div class="flex items-center justify-between mb-3">
    <h2 class="text-sm font-bold uppercase tracking-wide">
      Grafik Anggaran MBG
    </h2>
    <div class="flex gap-1">
      <button 
        on:click={() => selectYear('2025')}
        class:bg-black={selectedYear === '2025'}
        class:dark:bg-white={selectedYear === '2025'}
        class:bg-transparent={selectedYear !== '2025'}
        class:text-white={selectedYear === '2025'}
        class:dark:text-black={selectedYear === '2025'}
        class="border border-gray-300 dark:border-gray-700 px-2 py-0.5 text-xs hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
      >
        2025
      </button>
      <button 
        on:click={() => selectYear('2026')}
        class:bg-black={selectedYear === '2026'}
        class:dark:bg-white={selectedYear === '2026'}
        class:bg-transparent={selectedYear !== '2026'}
        class:text-white={selectedYear === '2026'}
        class:dark:text-black={selectedYear === '2026'}
        class="border border-gray-300 dark:border-gray-700 px-2 py-0.5 text-xs hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
      >
        2026
      </button>
    </div>
  </div>
  
  <div class="relative h-48">
    <canvas bind:this={chartCanvas}></canvas>
  </div>
  
  <div class="mt-3 grid grid-cols-4 gap-2 text-center">
    <div>
      <div class="font-bold text-sm">Rp {formattedPagu} T</div>
      <div class="text-xs text-gray-600 dark:text-gray-500">Anggaran {selectedYear}</div>
    </div>
    <div>
      <div class="font-bold text-sm">{formattedRealization} T</div>
      <div class="text-xs text-gray-600 dark:text-gray-500">Realisasi</div>
    </div>
    <div>
      <div class="font-bold text-sm">{formattedRecipients} Jt</div>
      <div class="text-xs text-gray-600 dark:text-gray-500">Penerima</div>
    </div>
    <div>
      <div class="font-bold text-sm">{currentData.sppg.toLocaleString('id-ID')}</div>
      <div class="text-xs text-gray-600 dark:text-gray-500">SPPG Aktif</div>
    </div>
  </div>
</div>
