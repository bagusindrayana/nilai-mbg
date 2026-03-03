<script lang="ts">
  const sources = [
    {
      title: 'Anggaran MBG 2026',
      description: 'Rp 335 Triliun - Merdeka.com',
      url: 'https://www.merdeka.com/uang/pemerintah-alokasikan-rp335-triliun-untuk-program-makan-bergizi-gratis-2026-dorong-ekonomi-dan-gizi-nasional-520826-mvk.html'
    },
    {
      title: 'Realisasi MBG 2025',
      description: 'Rp 52,9 Trikulum - CNBC Indonesia',
      url: 'https://www.cnbcindonesia.com/news/20251218163005-4-695489/anggaran-mbg-terserap-rp-529-t-di-akhir-2025-setara-746-dari-pagu'
    },
    {
      title: 'Program MBG',
      description: 'Badan Gizi Nasional (BGN)',
      url: 'https://www.bgn.go.id'
    },
    {
      title: 'Harga per Porsi',
      description: 'Rp 10.000/porsi - Detik Finance',
      url: 'https://finance.detik.com/berita-ekonomi-bisnis/d-8102346/biaya-makan-bergizi-gratis-tetap-rp-10-ribu-porsi-atau-naik-ini-jawabannya'
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
          <a href={source.url} target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline block">
            {source.url.replace('https://', '')}
          </a>
        </div>
      </div>
    {/each}
  </div>
  <div class="mt-4 p-3 bg-gray-50 rounded text-xs text-gray-600">
    Data bersumber dari Kementerian Keuangan (APBN KiTa), Badan Gizi Nasional (BGN), dan berbagai media nasional.
  </div>
</div>
