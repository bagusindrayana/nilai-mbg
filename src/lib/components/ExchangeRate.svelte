<script lang="ts">
  let lastUpdate = new Date();
  let inputRupiah = '10.000';
  let inputPorsi = '1';
  let inputHari = '0';

  const mbgPriceJava = 10000;
  const workingDaysPerMonth = 22;
  const monthlyBudget = 335000000000000 / 12;
  const dailyBudget = monthlyBudget / workingDaysPerMonth;

  const comparisonItems = [
    { name: 'Pentol', price: 2000, icon: '🥩' },
    { name: 'Bakso', price: 15000, icon: '🍜' },
    { name: 'Nasi Goreng', price: 25000, icon: '🍳' },
    { name: 'Ayam Goreng', price: 35000, icon: '🍗' },
    { name: 'Beras 1 Kg', price: 15000, icon: '🌾' },
    { name: 'Telur 1 Kg', price: 30000, icon: '🥚' },
    { name: 'Susu 1 Liter', price: 15000, icon: '🥛' },
    { name: 'Gorengan', price: 3000, icon: '🍟' },
    { name: 'Teh Botol', price: 5000, icon: '🧋' },
    { name: 'Paket Data 10GB', price: 50000, icon: '📱' },
    { name: 'Pulsa', price: 100000, icon: '📲' },
    { name: 'Sepeda', price: 1500000, icon: '🚲' },
    { name: 'HPentry Level', price: 800000, icon: '📱' },
    { name: 'Motor Honda', price: 25000000, icon: '🏍️' },
    { name: 'Motor Listrik', price: 35000000, icon: '🛵' },
    { name: 'Mobil Avanza', price: 250000000, icon: '🚗' },
    { name: 'Uang Saku / Bulan', price: 500000, icon: '💰' },
    { name: 'SPP Kuliah', price: 5000000, icon: '🎓' },
    { name: 'Motor Honda Beat', price: 20000000, icon: '🏍️' },
    { name: 'iPhone 15', price: 15000000, icon: '📱' },
    { name: 'Rumah Subsidi', price: 150000000, icon: '🏠' },
    { name: 'Rumah Middle', price: 500000000, icon: '🏡' },
    { name: 'Rumah Mewah', price: 2000000000, icon: '🏰' },
    { name: 'Apartemen', price: 800000000, icon: '🏢' },
    { name: 'Tanah 100m²', price: 200000000, icon: '🗺️' },
    { name: 'Emas 1 Gram', price: 900000, icon: '💎' },
    { name: 'Emas 25 Gram', price: 22500000, icon: '📿' },
    { name: 'Zakat Fitrah', price: 85000, icon: '🕌' },
    { name: 'Umroh', price: 55000000, icon: '🕋' },
    { name: 'Haji Plus', price: 450000000, icon: '🕱️' }
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

<div class="bg-white border border-gray-200 rounded-lg p-6">
  <div class="flex items-center justify-between mb-6">
    <h2 class="text-xl font-semibold text-gray-900">
      Kalkulator MBG
    </h2>
    <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">2026</span>
  </div>

  <div class="space-y-6">
    <!-- Informasi Dasar -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div class="border-l-4 border-blue-500 pl-4">
        <div class="text-sm text-gray-600 mb-1">1 Porsi MBG</div>
        <div class="text-xl font-bold text-gray-900">Rp {mbgPriceJava.toLocaleString('id-ID')}</div>
      </div>
      <div class="border-l-4 border-green-500 pl-4">
        <div class="text-sm text-gray-600 mb-1">1 Hari Anggaran MBG (22 hari kerja)</div>
        <div class="text-xl font-bold text-gray-900">Rp {(dailyBudget / 1000000000).toLocaleString('id-ID')} Miliar</div>
      </div>
    </div>

    <!-- Kalkulator Konversi -->
    <div class="border-t pt-6">
      <h3 class="font-semibold text-gray-900 mb-4">Kalkulator Konversi</h3>

      <div class="space-y-6">
        <!-- Rupiah -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Rupiah
          </label>
          <div class="relative">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">Rp</span>
            <input
              type="text"
              value={inputRupiah}
              on:input={handleRupiahInput}
              placeholder="Masukkan jumlah rupiah"
              class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <!-- Porsi -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Porsi
          </label>
          <input
            type="number"
            bind:value={inputPorsi}
            on:input={handlePorsiInput}
            placeholder="Masukkan jumlah porsi"
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Hari -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Hari
          </label>
          <input
            type="number"
            bind:value={inputHari}
            on:input={handleHariInput}
            placeholder="Masukkan jumlah hari"
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>

    <!-- Perbandingan with other items -->
    {#if numericRupiah > 0}
      <div class="border-t pt-6">
        <h3 class="font-semibold text-gray-900 mb-4">
          Dengan Rp {inputRupiah} bisa dapat:
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {#each comparisonResults.slice(0, 12) as item}
            <div class="bg-gray-50 rounded-lg p-3 text-center">
              <div class="text-2xl mb-1">{item.icon}</div>
              <div class="text-xs text-gray-600 truncate">{item.name}</div>
              <div class="font-bold text-gray-900">
                {item.quantity} {parseFloat(item.quantity) >= 1000 ? '+' : ''}
              </div>
            </div>
          {/each}
        </div>
        {#if comparisonResults.length > 12}
          <div class="mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {#each comparisonResults.slice(12) as item}
              <div class="bg-gray-50 rounded-lg p-3 text-center">
                <div class="text-2xl mb-1">{item.icon}</div>
                <div class="text-xs text-gray-600 truncate">{item.name}</div>
                <div class="font-bold text-gray-900">
                  {item.quantity} {parseFloat(item.quantity) >= 1000 ? '+' : ''}
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    {/if}

    <!-- Update Time -->
    <div class="border-t pt-4">
      <div class="text-xs text-gray-500">
        Update: {lastUpdate.toLocaleString('id-ID',{
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })}
      </div>
    </div>
  </div>
</div>
