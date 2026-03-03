<script lang="ts">
  import { onMount } from "svelte";
  import { theme } from "$lib/theme";
  import Chart from "chart.js/auto";

  let barCanvas: HTMLCanvasElement;
  let lineCanvas: HTMLCanvasElement;
  let barChart: Chart;
  let lineChart: Chart;

  const budget2025Realization = 52900000000000;
  const budget2025Pagu = 71000000000000;
  const budget2026 = 335000000000000;

  const yearlyData = {
    "2025": {
      pagu: budget2025Pagu,
      realization: budget2025Realization,
      recipients: 50700000,
      sppg: 17555,
      workers: 741985,
    },
    "2026": {
      pagu: budget2026,
      realization: 0,
      recipients: 60000000,
      sppg: 23678,
      workers: 0,
    },
  };

  function getChartColors(isDark: boolean) {
    return {
      bar1: isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)",
      bar2: isDark ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)",
      border: isDark ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)",
      grid: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
      text: isDark ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)",
    };
  }

  function createBarChart() {
    if (barChart) {
      barChart.destroy();
    }

    const ctx = barCanvas.getContext("2d");
    if (!ctx) return;

    const isDark = $theme === "dark";
    const colors = getChartColors(isDark);

    barChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["2025 (Realisasi)", "2026 (Anggaran)"],
        datasets: [
          {
            label: "Anggaran (Rp Triliun)",
            data: [
              budget2025Realization / 1000000000000,
              budget2026 / 1000000000000,
            ],
            backgroundColor: [colors.bar1, colors.bar2],
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: isDark ? "#000" : "#fff",
            titleColor: colors.text,
            bodyColor: colors.text,
            borderColor: colors.border,
            borderWidth: 1,
            callbacks: {
              label: function (context: any) {
                const value = context.parsed.y;
                return "Rp " + (value ?? 0).toFixed(1) + " Triliun";
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value: any) {
                return value + " T";
              },
              color: colors.text,
            },
            grid: {
              color: colors.grid,
            },
            title: {
              display: true,
              text: "Rp Triliun",
              color: colors.text,
            },
          },
          x: {
            ticks: {
              color: colors.text,
            },
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }

  function createLineChart() {
    if (lineChart) {
      lineChart.destroy();
    }

    const ctx = lineCanvas.getContext("2d");
    if (!ctx) return;

    const isDark = $theme === "dark";
    const colors = getChartColors(isDark);

    const labels = ["2025", "2026"];

    const d2025 = yearlyData["2025"];
    const d2026 = yearlyData["2026"];

    lineChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Anggaran (T)",
            data: [d2025.pagu / 1e12, d2026.pagu / 1e12],
            backgroundColor: isDark
              ? "rgba(255,255,255,0.75)"
              : "rgba(0,0,0,0.75)",
            borderColor: isDark ? "#fff" : "#000",
            borderWidth: 1,
            borderRadius: 2,
            yAxisID: "yLeft",
            order: 2,
          },
          {
            label: "Realisasi (T)",
            data: [d2025.realization / 1e12, d2026.realization / 1e12],
            backgroundColor: isDark
              ? "rgba(255,255,255,0.4)"
              : "rgba(0,0,0,0.4)",
            borderColor: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)",
            borderWidth: 1,
            borderRadius: 2,
            yAxisID: "yLeft",
            order: 3,
          },
          {
            type: "line",
            label: "Penerima (Ribu)",
            data: [d2025.recipients / 1000, d2026.recipients / 1000],
            borderColor: isDark
              ? "rgba(180,180,255,0.9)"
              : "rgba(50,50,200,0.8)",
            backgroundColor: isDark
              ? "rgba(180,180,255,0.15)"
              : "rgba(50,50,200,0.1)",
            pointBackgroundColor: isDark ? "#b4b4ff" : "#3232c8",
            pointRadius: 4,
            borderWidth: 2,
            fill: false,
            tension: 0,
            yAxisID: "yRight",
            order: 1,
          },
          {
            type: "line",
            label: "SPPG Aktif",
            data: [d2025.sppg, d2026.sppg],
            borderColor: isDark
              ? "rgba(255,200,140,0.9)"
              : "rgba(180,100,20,0.8)",
            backgroundColor: isDark
              ? "rgba(255,200,140,0.15)"
              : "rgba(180,100,20,0.1)",
            pointBackgroundColor: isDark ? "#ffc88c" : "#b46414",
            pointRadius: 4,
            borderWidth: 2,
            fill: false,
            tension: 0,
            yAxisID: "yRight2",
            order: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: "index",
          intersect: false,
        },
        plugins: {
          legend: {
            display: true,
            position: "bottom",
            labels: {
              color: colors.text,
              font: { size: 10 },
              boxWidth: 12,
              padding: 8,
            },
          },
          tooltip: {
            backgroundColor: isDark ? "#000" : "#fff",
            titleColor: colors.text,
            bodyColor: colors.text,
            borderColor: colors.border,
            borderWidth: 1,
            callbacks: {
              label: function (context: any) {
                const label = context.dataset.label || "";
                const value = context.parsed.y;
                if (label.includes("Anggaran") || label.includes("Realisasi")) {
                  return label + ": Rp " + (value ?? 0).toFixed(1) + " T";
                }
                if (label.includes("Penerima")) {
                  return label + ": " + (value ?? 0).toLocaleString("id-ID");
                }
                return label + ": " + (value ?? 0).toLocaleString("id-ID");
              },
            },
          },
        },
        scales: {
          yLeft: {
            type: "linear",
            position: "left",
            beginAtZero: true,
            title: {
              display: true,
              text: "Rp Triliun",
              color: colors.text,
              font: { size: 10 },
            },
            ticks: {
              callback: function (value: any) {
                return value + " T";
              },
              color: colors.text,
              font: { size: 10 },
            },
            grid: {
              color: colors.grid,
            },
          },
          yRight: {
            type: "linear",
            position: "right",
            beginAtZero: true,
            title: {
              display: true,
              text: "Penerima (Ribu)",
              color: isDark ? "rgba(180,180,255,0.9)" : "rgba(50,50,200,0.8)",
              font: { size: 10 },
            },
            ticks: {
              callback: function (value: any) {
                return (value / 1000).toFixed(0) + " Rb";
              },
              color: isDark ? "rgba(180,180,255,0.9)" : "rgba(50,50,200,0.8)",
              font: { size: 10 },
            },
            grid: {
              display: false,
            },
          },
          yRight2: {
            type: "linear",
            position: "right",
            beginAtZero: true,
            display: false,
            grid: { display: false },
          },
          x: {
            ticks: {
              color: colors.text,
              font: { size: 11 },
            },
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }

  onMount(() => {
    createBarChart();
    createLineChart();
  });

  $: if (barCanvas && $theme) {
    createBarChart();
  }

  $: if (lineCanvas && $theme) {
    createLineChart();
  }
</script>

<div class="border border-gray-300 dark:border-gray-700 p-3 mb-4">
  <div class="mb-3">
    <h2 class="text-sm font-bold uppercase tracking-wide">
      Grafik Anggaran MBG
    </h2>
  </div>

  <div class="relative h-48">
    <canvas bind:this={barCanvas}></canvas>
  </div>
</div>

<div class="border border-gray-300 dark:border-gray-700 p-3 mb-4">
  <div class="mb-3">
    <h2 class="text-sm font-bold uppercase tracking-wide">
      Statistik MBG 2025 vs 2026
    </h2>
  </div>

  <div class="relative h-56">
    <canvas bind:this={lineCanvas}></canvas>
  </div>
</div>
