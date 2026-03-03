<script lang="ts">
  const totalBudget = 335000000000000;
  const programBudget = 254600000000000;
  const supportBudget = 80000000000000;
  const workingDaysPerMonth = 22;
  const monthlyBudget = totalBudget / 12;
  const dailyBudget = monthlyBudget / workingDaysPerMonth;
  
  $: formattedTotalBudget = (totalBudget / 1000000000000).toFixed(0);
  $: formattedProgramBudget = (programBudget / 1000000000000).toFixed(1);
  $: formattedSupportBudget = (supportBudget / 1000000000000).toFixed(0);
  $: formattedDailyBudget = (dailyBudget / 1000000000).toFixed(0);
</script>

<div class="border border-gray-300 dark:border-gray-700 p-3">
  <div class="flex items-center justify-between mb-3">
    <h2 class="text-sm font-bold uppercase tracking-wide">
      Anggaran MBG Nasional
    </h2>
    <span class="border border-gray-300 dark:border-gray-700 px-1.5 py-0.5 text-xs">2026</span>
  </div>
  
  <div class="space-y-3">
    <div class="border-l-2 border-black dark:border-white pl-3">
      <div class="flex justify-between items-center">
        <span class="text-sm">Total Anggaran 2026</span>
        <span class="font-bold">Rp {formattedTotalBudget} T</span>
      </div>
      <div class="text-xs text-gray-600 dark:text-gray-500">APBN 2026</div>
    </div>
    
    <div class="grid grid-cols-2 gap-2">
      <div class="border border-gray-300 dark:border-gray-700 p-2">
        <div class="text-xs text-gray-600 dark:text-gray-500 mb-1">Program Langsung</div>
        <div class="font-bold text-sm">Rp {formattedProgramBudget} T</div>
      </div>
      <div class="border border-gray-300 dark:border-gray-700 p-2">
        <div class="text-xs text-gray-600 dark:text-gray-500 mb-1">Dukungan Operasional</div>
        <div class="font-bold text-sm">Rp {formattedSupportBudget} T</div>
      </div>
    </div>
    
    <div class="border-t border-gray-300 dark:border-gray-700 pt-3">
      <h3 class="font-bold text-xs mb-2 uppercase">Estimasi Harian (22 hari kerja/bulan)</h3>
      <div class="border border-gray-300 dark:border-gray-700 p-2">
        <div class="flex justify-between items-center text-sm">
          <span>Per Hari</span>
          <span class="font-bold">Rp {formattedDailyBudget} Miliar</span>
        </div>
      </div>
    </div>
  </div>
</div>
