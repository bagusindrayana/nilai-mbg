<script lang="ts">
  const totalBudget = 335000000000000; // Rp 335 Trilliun (2026)
  const programBudget = 254600000000000; // Rp 254,6 Trilliun (direct program)
  const supportBudget = 80000000000000; // Rp 80 Trilliun (dukungan operasional)
  const workingDaysPerMonth = 22;
  const monthlyBudget = totalBudget / 12;
  const dailyBudget = monthlyBudget / workingDaysPerMonth; // Per hari (22 hari kerja/bulan)
  
  $: formattedTotalBudget = (totalBudget / 1000000000000).toFixed(0);
  $: formattedProgramBudget = (programBudget / 1000000000000).toFixed(1);
  $: formattedSupportBudget = (supportBudget / 1000000000000).toFixed(0);
  $: formattedDailyBudget = (dailyBudget / 1000000000).toFixed(0);
</script>

<div class="bg-white border border-gray-200 rounded-lg p-6">
  <div class="flex items-center justify-between mb-6">
    <h2 class="text-xl font-semibold text-gray-900">
      Anggaran MBG Nasional
    </h2>
    <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">2026</span>
  </div>
  
  <div class="space-y-6">
    <div class="border-l-4 border-blue-500 pl-4">
      <div class="flex justify-between items-center">
        <span class="text-gray-700 font-medium">Total Anggaran 2026</span>
        <span class="text-xl font-bold text-gray-900">Rp {formattedTotalBudget} T</span>
      </div>
      <div class="text-sm text-gray-500">APBN 2026</div>
    </div>
    
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-gray-50 p-4 rounded">
        <div class="text-sm text-gray-600 mb-1">Program Langsung</div>
        <div class="font-bold text-gray-900">Rp {formattedProgramBudget} T</div>
      </div>
      <div class="bg-gray-50 p-4 rounded">
        <div class="text-sm text-gray-600 mb-1">Dukungan Operasional</div>
        <div class="font-bold text-gray-900">Rp {formattedSupportBudget} T</div>
      </div>
    </div>
    
    <div class="border-t pt-6">
      <h3 class="font-semibold text-gray-900 mb-4">Estimasi Harian (22 hari kerja/bulan)</h3>
      <div class="bg-gray-50 p-4 rounded">
        <div class="flex justify-between items-center mb-2">
          <span class="text-gray-700">Per Hari</span>
          <span class="font-bold text-gray-900">Rp {formattedDailyBudget} Miliar</span>
        </div>
      </div>
    </div>
  </div>
</div>
