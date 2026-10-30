import { readFileSync } from "node:fs";
import { defineConfig } from "vitepress";

const apiSidebar = JSON.parse(
  readFileSync(
    new URL("../sdk/api/typedoc-sidebar.json", import.meta.url),
    "utf-8",
  ),
);
apiSidebar[0].text = "@loktin/sdk";

export default defineConfig({
  title: "Loktin Docs",
  description:
    "Plan. Lock In. Save. Documentation for the Loktin savings platform.",
  cleanUrls: true,
  lang: "en-US",
  lastUpdated: true,

  transformPageData(pageData) {
    if (pageData.relativePath.startsWith("sdk/api/")) {
      pageData.frontmatter.editLink = false;
    }
  },

  head: [
    ["link", { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    ["meta", { property: "og:title", content: "Loktin Docs" }],
    ["meta", { property: "og:description", content: "Plan. Lock In. Save." }],
    ["meta", { name: "theme-color", content: "#0B1E1E" }],
  ],

  themeConfig: {
    logo: undefined,
    siteTitle: "LOKTIN",

    nav: [
      { text: "Home", link: "/" },
      { text: "Get Started", link: "/getting-started" },
      { text: "Primitives", link: "/primitives/plans" },
      { text: "SDK", link: "/sdk/" },
      // { text: "Architecture", link: "/architecture/overview" },
      { text: "App", link: "https://loktin.xyz" },
    ],

    sidebar: {
      "/sdk/": [
        {
          text: "SDK",
          items: [{ text: "Overview", link: "/sdk/" }],
        },
        {
          text: "API reference",
          items: apiSidebar,
        },
      ],
      "/": [
        {
          text: "Overview",
          items: [
            { text: "Introduction", link: "/introduction" },
            { text: "Getting Started", link: "/getting-started" },
          ],
        },
        {
          text: "Savings Primitives",
          collapsed: false,
          items: [
            { text: "Bill Plans", link: "/primitives/plans" },
            { text: "Target Savings", link: "/primitives/target-savings" },
            { text: "Locked In", link: "/primitives/locked-in" },
            { text: "Spend & Save", link: "/primitives/spend-save" },
          ],
        },
        {
          text: "Coming Soon",
          collapsed: false,
          items: [
            { text: "Earn via Blend", link: "/coming-soon/blend-yield" },
            { text: "ZK Privacy Layer", link: "/coming-soon/zk-privacy" },
          ],
        },
        // {
        //   text: "Architecture",
        //   collapsed: true,
        //   items: [
        //     { text: "Overview",            link: "/architecture/overview" },
        //     { text: "Smart Contracts",     link: "/architecture/smart-contracts" },
        //     { text: "Keeper Service",      link: "/architecture/keeper-service" },
        //     { text: "Frontend",            link: "/architecture/frontend" },
        //     { text: "Authorization Model", link: "/architecture/authorization" },
        //   ],
        // },
        {
          text: "How To",
          collapsed: true,
          items: [
            { text: "Create a Plan", link: "/how-to/create-plan" },
            { text: "Set Up Target Savings", link: "/how-to/target-savings" },
            { text: "Lock In USDC", link: "/how-to/lock-in" },
            { text: "Enroll in Spend & Save", link: "/how-to/spend-save" },
            { text: "Withdraw Funds", link: "/how-to/withdraw" },
          ],
        },
        {
          text: "Reference",
          collapsed: true,
          items: [
            // { text: "Contract IDs", link: "/reference/contract-ids" },
            { text: "FAQ", link: "/reference/faq" },
            { text: "Glossary", link: "/reference/glossary" },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/Mackenzie-OO7/loktin" },
    ],

    footer: {
      message: "Built on Stellar",
      copyright: "© 2026 Loktin",
    },

    search: {
      provider: "local",
    },

    outline: { level: [2, 3], label: "On this page" },
    editLink: {
      pattern: "https://github.com/Lokt-In/loktin-docs/edit/main/:path",
      text: "Edit on GitHub",
    },
  },
});
