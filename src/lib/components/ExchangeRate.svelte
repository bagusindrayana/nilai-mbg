<script lang="ts">
  let lastUpdate = new Date();
  let inputRupiah = '15000';
  let inputPorsi = '1';
  let inputHari = '0';

  const mbgPriceJava = 10000;
  const dailyBudget = 918000000000;

  function handleRupiahInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    if (value && value !== '') {
      inputPorsi = (parseFloat(value) / mbgPriceJava).toFixed(2);
      inputHari = (parseFloat(value) / dailyBudget).toFixed(6);
    } else {
      inputPorsi = '0';
      inputHari = '0';
    }

    inputRupiah = value;
  }

  function handlePorsiInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    if (value && value !== '') {
      inputRupiah = (parseFloat(value) * mbgPriceJava).toFixed(0);
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
      inputRupiah = (parseFloat(value) * dailyBudget).toFixed(0);
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
        <div class="text-sm text-gray-600 mb-1">1 Hari Anggaran MBG</div>
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
          <input
            type="number"
            bind:value={inputRupiah}
            on:input={handleRupiahInput}
            placeholder="Masukkan jumlah rupiah"
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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

    <!-- Update Time -->
    <div class="border-t pt-4">
      <div class="text-xs text-gray-500">
        Update: {lastUpdate.toLocaleString('id-ID')}
      </div>
    </div>
  </div>
</div>
