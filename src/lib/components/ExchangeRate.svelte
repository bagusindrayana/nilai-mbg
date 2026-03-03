<script lang="ts">
  import { theme } from '$lib/theme';
  
  let lastUpdate = new Date();
  let inputRupiah = '10.000';
  let inputPorsi = '1';
  let inputHari = '0';

  const mbgPriceJava = 10000;
  const workingDaysPerMonth = 22;
  const monthlyBudget = 335000000000000 / 12;
  const dailyBudget = monthlyBudget / workingDaysPerMonth;

  const comparisonItems = [
    { name: 'Pentol', price: 2000 },
    { name: 'Bakso', price: 15000 },
    { name: 'Nasi Goreng', price: 25000 },
    { name: 'Ayam Goreng', price: 35000 },
    { name: 'Beras 1 Kg', price: 15000 },
    { name: 'Telur 1 Kg', price: 30000 },
    { name: 'Susu 1 Liter', price: 15000 },
    { name: 'Gorengan', price: 3000 },
    { name: 'Teh Botol', price: 5000 },
    { name: 'Paket Data 10GB', price: 50000 },
    { name: 'Pulsa', price: 100000 },
    { name: 'Sepeda', price: 1500000 },
    { name: 'HP Entry Level', price: 800000 },
    { name: 'Motor Honda', price: 25000000 },
    { name: 'Motor Listrik', price: 35000000 },
    { name: 'Mobil Avanza', price: 250000000 },
    { name: 'Uang Saku / Bulan', price: 500000 },
    { name: 'SPP Kuliah', price: 5000000 },
    { name: 'Motor Honda Beat', price: 20000000 },
    { name: 'iPhone 15', price: 15000000 },
    { name: 'Rumah Subsidi', price: 150000000 },
    { name: 'Rumah Middle', price: 500000000 },
    { name: 'Rumah Mewah', price: 2000000000 },
    { name: 'Apartemen', price: 800000000 },
    { name: 'Tanah 100m2', price: 200000000 },
    { name: 'Emas 1 Gram', price: 900000 },
    { name: 'Emas 25 Gram', price: 22500000 },
    { name: 'Zakat Fitrah', price: 85000 },
    { name: 'Umroh', price: 55000000 },
    { name: 'Haji Plus', price: 450000000 }
  ];

  $: numericRupiah = parseRupiah(inputRupiah);
  $: comparisonResults = comparisonItems.map(item => ({
    ...item,
    quantity: numericRupiah > 0 ? (numericRupiah / item.price).toFixed(1) : '0'
  })).filter(item => numericRupiah >= item.price);

  function formatRupiah(value: string): string {
    const cleanValue = value.replace(/[^0-9]/g, '');
    if (!cleanValue) return '';
    return parseInt(cleanValue).toLocaleString('id-ID');
  }

  function parseRupiah(value: string): number {
    return parseFloat(value.replace(/\./g, '').replace(/,/g, '')) || 0;
  }

  function handleRupiahInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const formatted = formatRupiah(target.value);
    const numericValue = parseRupiah(target.value);

    if (numericValue > 0) {
      inputPorsi = (numericValue / mbgPriceJava).toFixed(2);
      inputHari = (numericValue / dailyBudget).toFixed(6);
    } else {
      inputPorsi = '0';
      inputHari = '0';
    }

    inputRupiah = formatted;
  }

  function handlePorsiInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    if (value && value !== '') {
      const numericValue = parseFloat(value);
      inputRupiah = formatRupiah((numericValue * mbgPriceJava).toFixed(0));
    } else {
      inputRupiah = '0';
    }

    inputPorsi = value;
    inputHari = '0';
  }

  function handleHariInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    if (value && value !== '') {
      const numericValue = parseFloat(value);
      inputRupiah = formatRupiah((numericValue * dailyBudget).toFixed(0));
    } else {
      inputRupiah = '';
    }

    inputHari = value;
    inputPorsi = '1';
  }
</script>

<div class="border border-gray-300 dark:border-gray-700 p-3">
  <div class="flex items-center justify-between mb-3">
    <h2 class="text-sm font-bold uppercase tracking-wide">
      Kalkulator MBG
    </h2>
    <span class="border border-gray-300 dark:border-gray-700 px-1.5 py-0.5 text-xs">2026</span>
  </div>

  <div class="space-y-3">
    <div class="grid grid-cols-2 gap-2">
      <div class="border-l-2 border-black dark:border-white pl-2">
        <div class="text-xs text-gray-600 dark:text-gray-500">1 Porsi MBG</div>
        <div class="font-bold text-sm">Rp {mbgPriceJava.toLocaleString('id-ID')}</div>
      </div>
      <div class="border-l-2 border-black dark:border-white pl-2">
        <div class="text-xs text-gray-600 dark:text-gray-500">1 Hari Anggaran</div>
        <div class="font-bold text-sm">Rp {(dailyBudget / 1000000000).toLocaleString('id-ID')} M</div>
      </div>
    </div>

    <div class="border-t border-gray-300 dark:border-gray-700 pt-3">
      <h3 class="font-bold text-xs mb-2 uppercase">Konversi</h3>

      <div class="space-y-2">
        <div>
          <label class="block text-xs font-bold mb-1 uppercase">
            Rupiah
          </label>
          <div class="relative">
            <span class="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm">Rp</span>
            <input
              type="text"
              value={inputRupiah}
              on:input={handleRupiahInput}
              placeholder="0"
              class="w-full pl-8 pr-2 py-1.5 border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-sm focus:outline-none focus:border-black dark:focus:border-white"
            />
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold mb-1 uppercase">
            Porsi
          </label>
          <input
            type="number"
            bind:value={inputPorsi}
            on:input={handlePorsiInput}
            placeholder="0"
            class="w-full px-2 py-1.5 border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-sm focus:outline-none focus:border-black dark:focus:border-white"
          />
        </div>

        <div>
          <label class="block text-xs font-bold mb-1 uppercase">
            Hari
          </label>
          <input
            type="number"
            bind:value={inputHari}
            on:input={handleHariInput}
            placeholder="0"
            class="w-full px-2 py-1.5 border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-sm focus:outline-none focus:border-black dark:focus:border-white"
          />
        </div>
      </div>
    </div>

    {#if numericRupiah > 0}
      <div class="border-t border-gray-300 dark:border-gray-700 pt-3">
        <h3 class="font-bold text-xs mb-2 uppercase">
          dengan Rp {inputRupiah}:
        </h3>
        <div class="grid grid-cols-3 gap-1.5">
          {#each comparisonResults.slice(0, 12) as item}
            <div class="border border-gray-300 dark:border-gray-700 p-2 text-center">
              <div class="text-xs text-gray-600 dark:text-gray-500 truncate">{item.name}</div>
              <div class="font-bold text-sm">
                {item.quantity} {parseFloat(item.quantity) >= 1000 ? '+' : ''}
              </div>
            </div>
          {/each}
        </div>
        {#if comparisonResults.length > 12}
          <div class="mt-1.5 grid grid-cols-3 gap-1.5">
            {#each comparisonResults.slice(12) as item}
              <div class="border border-gray-300 dark:border-gray-700 p-2 text-center">
                <div class="text-xs text-gray-600 dark:text-gray-500 truncate">{item.name}</div>
                <div class="font-bold text-sm">
                  {item.quantity} {parseFloat(item.quantity) >= 1000 ? '+' : ''}
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    {/if}

    <div class="border-t border-gray-300 dark:border-gray-700 pt-2">
      <div class="text-xs text-gray-500">
        {lastUpdate.toLocaleString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })}
      </div>
    </div>
  </div>
</div>
