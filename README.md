<div align="center">
    <a href="#-download">
        Download
    </a>
    <span>&nbsp;✦&nbsp;</span>
    <a href="#-getting-started">
        Getting Started
    </a>
    <span>&nbsp;✦&nbsp;</span>
    <a href="#-whats-inside">
        What's inside?
    </a>
    <span>&nbsp;✦&nbsp;</span>
    <a href="https://github.com/pheralb/typethings/tree/main/packages">
        Packages
    </a>
    <span>&nbsp;✦&nbsp;</span>
    <a href="#" target="_blank">
        Website (soon)
    </a>
    <span>&nbsp;✦&nbsp;</span>
    <a href="#-license">
        License
    </a>
</div>

</p>

<div align="center">

![Tauri](https://img.shields.io/badge/Tauri-FFC131?style=flat&logo=Tauri&logoColor=white)
[![GitHub actions](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fpheralb%2Ftypethings%2Fbadge%3Fref%3Dmain&style=flat)](https://actions-badge.atrox.dev/pheralb/typethings/goto?ref=main)
![GitHub stars](https://img.shields.io/github/stars/pheralb/typethings)
![GitHub issues](https://img.shields.io/github/issues/pheralb/typethings)
![GitHub forks](https://img.shields.io/github/forks/pheralb/typethings)
![GitHub license](https://img.shields.io/github/license/pheralb/typethings)
![tailwindcss](https://img.shields.io/badge/tailwindcss%20-0F172A?logo=tailwindcss&style=flat&labelColor=38bdf8&logoColor=ffffff)

</div>

> [!IMPORTANT]
> This is a work-in-progress and not the finished product.
> Typethings will be constantly updated and is not yet ready for its first release.

## <img src="app/public/images/logo.svg" alt="Typethings logo" height="18" />&nbsp;&nbsp;Introduction

[**Typethings**](https://typethings.vercel.app/) is an open source markdown editor built with [Tauri](https://tauri.app) and [React](https://react.dev). It is designed to be a simple, fast and beautiful for everyone.

- [x] Create, read, delete markdown files.
- [x] Create and delete workspaces.
- [x] Open markdown files from a specific directory.
- [x] Show files from workspace.
- [x] CMD + K to search app settings & files.
- [x] Light and dark mode.

## 📦 Download

**Download the latest release for your platform:**

- [Windows](#) - Soon.
- [MacOS](#) - Soon.

## 🚀 Getting Started

To get a local copy up and running, please follow these simple steps.

**Prerequisites:**

- [Node.js +18 (LTS recommended)](https://nodejs.org/). Then run `node --version` in your terminal to check if it's installed correctly.
- [pnpm (we are using +8.8.0)](https://pnpm.io/). Install with npm: ``npm i pnpm -g``. Then run `pnpm --version` in your terminal to check if it's installed correctly.
- [Visual Studio Code](https://code.visualstudio.com/) (recommended) or [Lapce](https://lapce.dev/).
- Only for Windows: [Microsoft C++ Build Tools](https://visualstudio.microsoft.com/es/visual-cpp-build-tools/).
- Rust. For Windows x64: [click here](https://static.rust-lang.org/rustup/dist/x86_64-pc-windows-msvc/rustup-init.exe). For Linux: [click here](https://forge.rust-lang.org/infra/other-installation-methods.html#other-ways-to-install-rustup). Then, run `rustc --version` in your terminal to check if it's installed correctly.

**Setup:**

1. Clone or [fork](https://github.com/pheralb/typethings/fork) this repository:

```bash
git clone git@github.com:pheralb/typethings.git
```

2. Install dependencies:

```bash
# Access the project folder:
cd typethings

# Install dependencies:
pnpm install
```

3. Run the app:

```bash
# Run all monorepo apps, websites and packages:
pnpm dev

# Run only website dev server:
pnpm dev:web
```

## 🤔 What's inside?

### Desktop App:

Built with:

- [Tauri](https://tauri.studio/en/) - Build smaller, faster, and more secure desktop applications with a web frontend.
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) - For state management in React.
- [React Router v6](https://reactrouter.com/) - For routing in React.

### Website:

Built with:

- [Next.js](https://nextjs.org/) - The React Framework for Production.
- [@typethings/ui](https://github.com/pheralb/typethings/tree/main/packages/ui) - A set of accessible UI components.

### Packages:

For all websites & apps:

| Package | Description |
| --- | --- |
| [`@typethings/functions`](https://github.com/pheralb/typethings/tree/main/packages/functions) | A set of files/folders functions using Tauri API. |
| [`@typethings/editor`](https://github.com/pheralb/typethings/tree/main/packages/editor) | A wrapper around [Tiptap](https://tiptap.dev/) editor. |
| [`@typethings/ui`](https://github.com/pheralb/typethings/tree/main/packages/ui) | A set of accessible UI components. Built with [React](https://react.dev), [shadcn/ui](https://ui.shadcn.com/) and [Tailwind CSS](https://tailwindcss.com/).|
| [`@typethings/tailwind-config`](https://github.com/pheralb/typethings/tree/main/packages/ui) | [Tailwind CSS](https://tailwindcss.com/) configuration for Typethings App.|

## 📝 License

- [Apache License 2.0](https://github.com/pheralb/typethings/blob/main/LICENSE).
