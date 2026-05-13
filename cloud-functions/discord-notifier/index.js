const functions = require("@google-cloud/functions-framework");

const WEBHOOK = process.env.DISCORD_WEBHOOK_URL;

async function sendToDiscordWebhook(payload) {
  if (!WEBHOOK) {
    console.error("DISCORD_WEBHOOK_URL tidak di-set");
    return;
  }
  const res = await fetch(WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "NG.LEARN Monitor 🤖", ...payload }),
  });
  if (!res.ok) throw new Error(`Discord error: ${res.status}`);
  console.log("Notifikasi dikirim ke Discord");
}

/**
 * Cloud Function: Menerima notifikasi dari Pub/Sub
 * Menangani 2 jenis event:
 * 1. Cloud Build events (status build)
 * 2. Cloud Monitoring alerts (error 5xx)
 */
functions.cloudEvent("sendToDiscord", async (cloudEvent) => {
  try {
    const pubSubMessage = cloudEvent.data?.message;
    let payload = {};

    if (pubSubMessage?.data) {
      const decoded = Buffer.from(pubSubMessage.data, "base64").toString("utf-8");
      try { payload = JSON.parse(decoded); } catch { payload = { rawMessage: decoded }; }
    }

    // ── Deteksi jenis event ──────────────────────────────
    const isBuildEvent = payload.status !== undefined && payload.id !== undefined;
    const isMonitoringAlert = payload.incident !== undefined;

    if (isBuildEvent) {
      await handleBuildEvent(payload);
    } else if (isMonitoringAlert) {
      await handleMonitoringAlert(payload);
    } else {
      console.log("Event tidak dikenal:", JSON.stringify(payload).slice(0, 200));
    }
  } catch (err) {
    console.error("Error:", err);
    throw err;
  }
});

// ════════════════════════════════════════════════════════
// Handler: Cloud Build Events
// ════════════════════════════════════════════════════════
async function handleBuildEvent(build) {
  const status = build.status;
  const projectId = build.projectId || "juara-495806";
  const buildId = build.id || "-";
  const branch = build.substitutions?.BRANCH_NAME || "main";
  const commitSha = (build.substitutions?.COMMIT_SHA || "-").slice(0, 7);
  const logUrl = `https://console.cloud.google.com/cloud-build/builds/${buildId}?project=${projectId}`;
  const duration = build.finishTime && build.startTime
    ? Math.round((new Date(build.finishTime) - new Date(build.startTime)) / 1000)
    : null;

  // Hanya kirim notifikasi untuk status tertentu
  const relevantStatuses = ["FAILURE", "TIMEOUT", "INTERNAL_ERROR", "SUCCESS"];
  if (!relevantStatuses.includes(status)) return;

  const config = {
    SUCCESS: { title: "✅ Deploy Berhasil!", color: 0x00c851, emoji: "🚀" },
    FAILURE: { title: "❌ Build Gagal!", color: 0xff4444, emoji: "🚨" },
    TIMEOUT: { title: "⏱️ Build Timeout!", color: 0xff8800, emoji: "⚠️" },
    INTERNAL_ERROR: { title: "💥 Build Error Internal!", color: 0xff4444, emoji: "🆘" },
  }[status] || { title: `Build: ${status}`, color: 0x888888, emoji: "ℹ️" };

  const fields = [
    { name: "🌿 Branch", value: `\`${branch}\``, inline: true },
    { name: "📦 Commit", value: `\`${commitSha}\``, inline: true },
    { name: "📊 Status", value: `\`${status}\``, inline: true },
  ];

  if (duration !== null) {
    fields.push({ name: "⏱️ Durasi", value: `${duration} detik`, inline: true });
  }

  fields.push({
    name: "📋 Build Log",
    value: `[Lihat Detail di Cloud Console](${logUrl})`,
    inline: false,
  });

  if (status === "SUCCESS") {
    fields.push({
      name: "🌐 Aplikasi Live",
      value: "[Buka NG.LEARN](https://ng-learn-952620701939.asia-southeast2.run.app)",
      inline: false,
    });
  }

  await sendToDiscordWebhook({
    embeds: [{
      title: `${config.emoji} ${config.title}`,
      description: status === "SUCCESS"
        ? "Aplikasi **NG.LEARN** berhasil diperbarui dan sudah live!"
        : "Build gagal. Segera cek log untuk detail error.",
      color: config.color,
      fields,
      footer: { text: "Google Cloud Build • NG.LEARN" },
      timestamp: new Date().toISOString(),
    }],
  });
}

// ════════════════════════════════════════════════════════
// Handler: Cloud Monitoring Alerts (Error 5xx, dll)
// ════════════════════════════════════════════════════════
async function handleMonitoringAlert(data) {
  const incident = data.incident || {};
  const isOpen = incident.state === "open";

  const fields = [
    {
      name: "🔗 Service",
      value: incident.resource?.labels?.service_name || "ng-learn",
      inline: true,
    },
    {
      name: "📊 Status",
      value: isOpen ? "🔴 AKTIF" : "🟢 SELESAI",
      inline: true,
    },
    {
      name: "📅 Waktu",
      value: new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }),
      inline: false,
    },
  ];

  if (incident.url) {
    fields.push({
      name: "🔍 Detail",
      value: `[Buka Google Cloud Console](${incident.url})`,
      inline: false,
    });
  }

  await sendToDiscordWebhook({
    embeds: [{
      title: isOpen
        ? "🚨 ALERT: Ada Masalah di Server!"
        : "✅ RESOLVED: Server Normal Kembali",
      description: incident.summary ? `> ${incident.summary}` : undefined,
      color: isOpen ? 0xff4444 : 0x00c851,
      fields,
      footer: { text: "Google Cloud Monitoring • NG.LEARN" },
      timestamp: new Date().toISOString(),
    }],
  });
}
