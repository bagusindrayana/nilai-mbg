<script lang="ts">
  import { onMount } from 'svelte';
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
  
  function createChart() {
    if (chart) {
      chart.destroy();
    }
    
    const ctx = chartCanvas.getContext('2d');
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
          backgroundColor: [
            'rgba(59, 130, 246, 0.7)',
            'rgba(16, 185, 129, 0.7)'
          ],
          borderColor: [
            'rgb(59, 130, 246)',
            'rgb(16, 185, 129)'
          ],
          borderWidth: 2,
          borderRadius: 8
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
            callbacks: {
              label: function(context) {
                const value = context.parsed.y;
                return 'Rp ' + value.toFixed(1) + ' Triliun';
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return value + ' T';
              }
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            },
            title: {
              display: true,
              text: 'Rp Triliun'
            }
          },
          x: {
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
  
  $: currentData = yearlyData[selectedYear as keyof typeof yearlyData];
  $: formattedPagu = (currentData.pagu / 1000000000000).toFixed(0);
  $: formattedRealization = currentData.realization > 0 
    ? (currentData.realization / 1000000000000).toFixed(1) 
    : '-';
  $: formattedRecipients = (currentData.recipients / 1000000).toFixed(1);
</script>

<div class="bg-white border border-gray-200 rounded-lg p-6 mb-8">
  <div class="flex items-center justify-between mb-6">
    <h2 class="text-xl font-semibold text-gray-900">
      Grafik Anggaran MBG per Tahun
    </h2>
    <div class="flex gap-2">
      <button 
        on:click={() => selectYear('2025')}
        class:bg-blue-600={selectedYear === '2025'}
        class:bg-gray-200={selectedYear !== '2025'}
        class:text-white={selectedYear === '2025'}
        class:text-gray-700={selectedYear !== '2025'}
        class="px-3 py-1 rounded text-sm"
      >
        2025
      </button>
      <button 
        on:click={() => selectYear('2026')}
        class:bg-blue-600={selectedYear === '2026'}
        class:bg-gray-200={selectedYear !== '2026'}
        class:text-white={selectedYear === '2026'}
        class:text-gray-700={selectedYear !== '2026'}
        class="px-3 py-1 rounded text-sm"
      >
        2026
      </button>
    </div>
  </div>
  
  <div class="relative h-80">
    <canvas bind:this={chartCanvas}></canvas>
  </div>
  
  <div class="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
    <div class="text-center">
      <div class="text-lg font-bold text-gray-900">Rp {formattedPagu} T</div>
      <div class="text-sm text-gray-500">Anggaran {selectedYear}</div>
    </div>
    <div class="text-center">
      <div class="text-lg font-bold text-gray-900">{formattedRealization} T</div>
      <div class="text-sm text-gray-500">Realisasi</div>
    </div>
    <div class="text-center">
      <div class="text-lg font-bold text-gray-900">{formattedRecipients} Juta</div>
      <div class="text-sm text-gray-500">Penerima Manfaat</div>
    </div>
    <div class="text-center">
      <div class="text-lg font-bold text-gray-900">{currentData.sppg.toLocaleString('id-ID')}</div>
      <div class="text-sm text-gray-500">SPPG Aktif</div>
    </div>
  </div>
</div>
