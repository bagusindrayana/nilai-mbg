<script lang="ts">
  const sources = [
    {
      title: 'Anggaran MBG 2026',
      description: 'APBN 2026 - Pemerintah Indonesia',
      url: 'www.kemenkeu.go.id'
    },
    {
      title: 'Realisasi MBG 2025',
      description: 'Kementerian Keuangan (APBN KiTa)',
      url: 'www.kemenkeu.go.id'
    },
    {
      title: 'Program MBG',
      description: 'Badan Gizi Nasional (BGN)',
      url: 'www.bgn.go.id'
    },
    {
      title: 'Harga per Porsi',
      description: 'Badan Gizi Nasional - Rp 10.000/porsi',
      url: 'www.bgn.go.id'
    }
  ];
</script>

<div class="bg-white border border-gray-200 rounded-lg p-6">
  <h2 class="text-xl font-semibold text-gray-900 mb-4">
    Sumber Data
  </h2>
  <div class="grid md:grid-cols-2 gap-4 text-sm">
    {#each sources as source}
      <div class="flex items-start">
        <div class="w-2 h-2 bg-green-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
        <div>
          <strong class="text-gray-900">{source.title}:</strong> {source.description}
          <div class="text-gray-500">{source.url}</div>
        </div>
      </div>
    {/each}
  </div>
  <div class="mt-4 p-3 bg-gray-50 rounded text-xs text-gray-600">
    Data bersumber dari APBN KiTa (Kementerian Keuangan) dan Badan Gizi Nasional. Nilai tukar dapat berubah sewaktu-waktu sesuai kondisi pasar.
  </div>
</div>
