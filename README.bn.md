<p align="center">ওপেন সোর্স এআই কোডিং এজেন্ট।</p>
<p align="center">
  <a href="https://github.com/HQ123-BOOP/LibreCode/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/HQ123-BOOP/LibreCode?style=flat-square" /></a>
  <a href="https://github.com/HQ123-BOOP/LibreCode/releases"><img alt="Releases" src="https://img.shields.io/github/v/release/HQ123-BOOP/LibreCode?style=flat-square" /></a>
  <a href="https://github.com/HQ123-BOOP/LibreCode/actions/workflows/release.yml"><img alt="Build status" src="https://img.shields.io/github/actions/workflow/status/HQ123-BOOP/LibreCode/release.yml?style=flat-square&branch=dev" /></a>
</p>

<p align="center">
  <a href="README.md">English</a> |
  <a href="README.zh.md">简体中文</a> |
  <a href="README.zht.md">繁體中文</a> |
  <a href="README.ko.md">한국어</a> |
  <a href="README.de.md">Deutsch</a> |
  <a href="README.es.md">Español</a> |
  <a href="README.fr.md">Français</a> |
  <a href="README.it.md">Italiano</a> |
  <a href="README.da.md">Dansk</a> |
  <a href="README.ja.md">日本語</a> |
  <a href="README.pl.md">Polski</a> |
  <a href="README.ru.md">Русский</a> |
  <a href="README.bs.md">Bosanski</a> |
  <a href="README.ar.md">العربية</a> |
  <a href="README.no.md">Norsk</a> |
  <a href="README.br.md">Português (Brasil)</a> |
  <a href="README.th.md">ไทย</a> |
  <a href="README.tr.md">Türkçe</a> |
  <a href="README.uk.md">Українська</a> |
  <a href="README.bn.md">বাংলা</a> |
  <a href="README.gr.md">Ελληνικά</a> |
  <a href="README.vi.md">Tiếng Việt</a>
</p>

[![LibreCode Terminal UI](packages/web/src/assets/lander/screenshot.png)](https://github.com/HQ123-BOOP/LibreCode)

---

### ইনস্টলেশন (Installation)

```bash
# YOLO
curl -fsSL https://hq123-boop.github.io/LibreCode/install.sh | bash

# Package managers









```

> [!TIP]
> ইনস্টল করার আগে ০.১.x এর চেয়ে পুরোনো ভার্সনগুলো মুছে ফেলুন।

### ডেস্কটপ অ্যাপ

LibreCode একটি ডেস্কটপ অ্যাপ্লিকেশন হিসাবেও উপলব্ধ। [রিলিজ পৃষ্ঠা](https://github.com/HQ123-BOOP/LibreCode/releases) থেকে ইনস্টলার ডাউনলোড করুন (`librecode-desktop-*.dmg` / `.exe` / `.AppImage` / `.deb` / `.rpm`)।

নিজে অ্যাপটি বিল্ড করতে:

```bash
cd packages/desktop
bun scripts/package-release.ts mac   # or: win | linux
```

আর্টিফ্যাক্টগুলো `packages/desktop/dist`-এ লেখা হয়।

#### মোবাইল অ্যাপ

LibreCode একটি Android অ্যাপ হিসাবেও উপলব্ধ। [রিলিজ পৃষ্ঠা](https://github.com/HQ123-BOOP/LibreCode/releases) থেকে APK ডাউনলোড করুন। অ্যাপটি LAN বা Tailscale-এর মাধ্যমে আপনার কম্পিউটারে `librecode serve`-এর সাথে সংযুক্ত হয় এবং TUI-তে `/mobile devices` কমান্ডের মাধ্যমে QR কোড পেয়ারিং সমর্থন করে।

#### ইনস্টলেশন ডিরেক্টরি (Installation Directory)

ইনস্টল স্ক্রিপ্টটি ইনস্টলেশন পাতের জন্য নিম্নলিখিত অগ্রাধিকার ক্রম মেনে চলে:

1. `$OPENCODE_INSTALL_DIR` - কাস্টম ইনস্টলেশন ডিরেক্টরি
2. `$XDG_BIN_DIR` - XDG বেস ডিরেক্টরি স্পেসিফিকেশন সমর্থিত পাথ
3. `$HOME/bin` - সাধারণ ব্যবহারকারী বাইনারি ডিরেক্টরি (যদি বিদ্যমান থাকে বা তৈরি করা যায়)
4. `$HOME/.opencode/bin` - ডিফল্ট ফলব্যাক

```bash
# উদাহরণ
OPENCODE_INSTALL_DIR=/usr/local/bin curl -fsSL https://hq123-boop.github.io/LibreCode/install.sh | bash
XDG_BIN_DIR=$HOME/.local/bin curl -fsSL https://hq123-boop.github.io/LibreCode/install.sh | bash
```

### এজেন্টস (Agents)

OpenCode এ দুটি বিল্ট-ইন এজেন্ট রয়েছে যা আপনি `Tab` কি(key) দিয়ে পরিবর্তন করতে পারবেন।

- **build** - ডিফল্ট, ডেভেলপমেন্টের কাজের জন্য সম্পূর্ণ অ্যাক্সেসযুক্ত এজেন্ট
- **plan** - বিশ্লেষণ এবং কোড এক্সপ্লোরেশনের জন্য রিড-ওনলি এজেন্ট
  - ডিফল্টভাবে ফাইল এডিট করতে দেয় না
  - ব্যাশ কমান্ড চালানোর আগে অনুমতি চায়
  - অপরিচিত কোডবেস এক্সপ্লোর করা বা পরিবর্তনের পরিকল্পনা করার জন্য আদর্শ

এছাড়াও জটিল অনুসন্ধান এবং মাল্টিস্টেপ টাস্কের জন্য একটি **general** সাবএজেন্ট অন্তর্ভুক্ত রয়েছে।
এটি অভ্যন্তরীণভাবে ব্যবহৃত হয় এবং মেসেজে `@general` লিখে ব্যবহার করা যেতে পারে।

এজেন্টদের সম্পর্কে আরও জানুন: [docs](https://opencode.ai/docs/agents)।


**LibreCode হল OpenCode-এর একটি ফর্ক। এই প্রকল্পটি OpenCode-এর অফিসিয়াল টিম দ্বারা তৈরি নয়, এবং তাদের সাথে কোনো সম্পর্ক, পৃষ্ঠপোষকতা, অনুমোদন বা সমর্থনের সম্পর্ক নেই। এখানে উল্লিখিত সমস্ত পণ্যের নাম, ট্রেডমার্ক, সার্ভিস মার্ক এবং নিবন্ধিত ট্রেডমার্ক তাদের নিজ নিজ মালিকদের সম্পত্তি। প্রকল্পটি "যেমন আছে" (AS-IS) ভিত্তিতে সরবরাহ করা হয় এবং আইন দ্বারা অনুমোদিত সর্বোচ্চ পরিমাণে, কোনো ধরনের ওয়ারেন্টি দেওয়া হয় না।**

