const typeFilter = document.getElementById("typeFilter");
const bankFilter = document.getElementById("bankFilter");
const sortFilter = document.getElementById("sortFilter");
const campaignGrid = document.getElementById("campaignGrid");
const campaignTemplate = document.getElementById("campaignTemplate");

const typeMap = {
  ihtiyac: "İhtiyaç Kredisi",
  konut: "Konut Kredisi",
  tasit: "Taşıt Kredisi"
};

const formatDate = (value) =>
  new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(new Date(value));

const formatNumber = (value) =>
  new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);

const sortCampaigns = (campaigns, mode) => {
  const copy = [...campaigns];

  if (mode === "rateAsc") {
    return copy.sort((a, b) => a.rate - b.rate);
  }

  if (mode === "rateDesc") {
    return copy.sort((a, b) => b.rate - a.rate);
  }

  return copy.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
};

const renderCampaigns = (campaigns) => {
  campaignGrid.innerHTML = "";

  if (!campaigns.length) {
    campaignGrid.innerHTML = `<p class="muted">Seçilen kriterlere uygun kampanya bulunamadı.</p>`;
    return;
  }

  campaigns.forEach((campaign) => {
    const node = campaignTemplate.content.cloneNode(true);

    node.querySelector(".bank").textContent = campaign.bank;
    node.querySelector(".type").textContent = typeMap[campaign.type] || campaign.type;
    node.querySelector(".name").textContent = campaign.name;
    node.querySelector(".rate").textContent = `%${formatNumber(campaign.rate)}`;
    node.querySelector(".maturity").textContent = campaign.maturity;
    node.querySelector(".amount").textContent = campaign.maxAmount;
    node.querySelector(".updated").textContent = formatDate(campaign.updatedAt);
    node.querySelector(".note").textContent = campaign.note;

    const link = node.querySelector(".detail-link");
    link.href = campaign.url;

    campaignGrid.appendChild(node);
  });
};

const populateBanks = (campaigns) => {
  const banks = [...new Set(campaigns.map((item) => item.bank))].sort((a, b) => a.localeCompare(b, "tr"));

  banks.forEach((bank) => {
    const option = document.createElement("option");
    option.value = bank;
    option.textContent = bank;
    bankFilter.appendChild(option);
  });
};

const applyFilters = (campaigns) => {
  const selectedType = typeFilter.value;
  const selectedBank = bankFilter.value;
  const selectedSort = sortFilter.value;

  const filtered = campaigns.filter((item) => {
    const typeMatch = selectedType === "all" || item.type === selectedType;
    const bankMatch = selectedBank === "all" || item.bank === selectedBank;

    return typeMatch && bankMatch;
  });

  renderCampaigns(sortCampaigns(filtered, selectedSort));
};

const init = async () => {
  const response = await fetch("./data/campaigns.json");
  const campaigns = await response.json();

  populateBanks(campaigns);
  applyFilters(campaigns);

  [typeFilter, bankFilter, sortFilter].forEach((el) =>
    el.addEventListener("change", () => applyFilters(campaigns))
  );

  const year = document.getElementById("year");
  year.textContent = new Date().getFullYear().toString();
};

init();
