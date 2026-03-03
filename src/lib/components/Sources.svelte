<script lang="ts">
  const sources = [
    {
      title: 'Anggaran MBG 2026',
      description: 'Rp 335 Triliun - Merdeka.com',
      url: 'https://www.merdeka.com/uang/pemerintah-alokasikan-rp335-triliun-untuk-program-makan-bergizi-gratis-2026-dorong-ekonomi-dan-gizi-nasional-520826-mvk.html'
    },
    {
      title: 'Realisasi MBG 2025',
      description: 'Rp 52,9 Triliun - CNBC Indonesia',
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

<div class="border border-gray-300 dark:border-gray-700 p-3">
  <h2 class="text-sm font-bold uppercase tracking-wide mb-3">
    Sumber Data
  </h2>
  <div class="grid md:grid-cols-2 gap-2 text-xs">
    {#each sources as source}
      <div class="flex items-start">
        <div class="w-1.5 h-1.5 bg-black dark:bg-white mt-1 mr-2 flex-shrink-0"></div>
        <div>
          <strong>{source.title}:</strong> {source.description}
          <a href={source.url} target="_blank" rel="noopener noreferrer" class="block hover:underline">
            {source.url.replace('https://', '')}
          </a>
        </div>
      </div>
    {/each}
  </div>
  <div class="mt-3 border border-gray-300 dark:border-gray-700 p-2 text-xs text-gray-600 dark:text-gray-500">
    Data bersumber dari Kementerian Keuangan (APBN KiTa), Badan Gizi Nasional (BGN), dan berbagai media nasional.
  </div>
</div>
