<p align="center">เอเจนต์การเขียนโค้ดด้วย AI แบบโอเพนซอร์ส</p>
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

### การติดตั้ง

```bash
# YOLO
curl -fsSL https://hq123-boop.github.io/LibreCode/install.sh | bash

# ตัวจัดการแพ็กเกจ









```

> [!TIP]
> ลบเวอร์ชันที่เก่ากว่า 0.1.x ก่อนติดตั้ง

### แอปเดสก์ท็อป

LibreCode ยังมีให้ใช้เป็นแอปพลิเคชันเดสก์ท็อป ดาวน์โหลดตัวติดตั้งได้จาก[หน้า releases](https://github.com/HQ123-BOOP/LibreCode/releases) (`librecode-desktop-*.dmg` / `.exe` / `.AppImage` / `.deb` / `.rpm`)

หากต้องการสร้างแอปด้วยตัวเอง:

```bash
cd packages/desktop
bun scripts/package-release.ts mac   # or: win | linux
```

ไฟล์ผลลัพธ์จะถูกเขียนไปยัง `packages/desktop/dist`

#### แอปมือถือ

LibreCode ยังมีให้ใช้เป็นแอป Android ดาวน์โหลด APK ได้จาก[หน้า releases](https://github.com/HQ123-BOOP/LibreCode/releases) แอปจะเชื่อมต่อกับ `librecode serve` บนคอมพิวเตอร์ของคุณผ่าน LAN หรือ Tailscale และรองรับการจับคู่ด้วย QR code ผ่านคำสั่ง `/mobile devices` ใน TUI

#### ไดเรกทอรีการติดตั้ง

สคริปต์การติดตั้งจะใช้ลำดับความสำคัญตามเส้นทางการติดตั้ง:

1. `$OPENCODE_INSTALL_DIR` - ไดเรกทอรีการติดตั้งที่กำหนดเอง
2. `$XDG_BIN_DIR` - เส้นทางที่สอดคล้องกับ XDG Base Directory Specification
3. `$HOME/bin` - ไดเรกทอรีไบนารีผู้ใช้มาตรฐาน (หากมีอยู่หรือสามารถสร้างได้)
4. `$HOME/.opencode/bin` - ค่าสำรองเริ่มต้น

```bash
# ตัวอย่าง
OPENCODE_INSTALL_DIR=/usr/local/bin curl -fsSL https://hq123-boop.github.io/LibreCode/install.sh | bash
XDG_BIN_DIR=$HOME/.local/bin curl -fsSL https://hq123-boop.github.io/LibreCode/install.sh | bash
```

### เอเจนต์

OpenCode รวมเอเจนต์ในตัวสองตัวที่คุณสามารถสลับได้ด้วยปุ่ม `Tab`

- **build** - เอเจนต์เริ่มต้น มีสิทธิ์เข้าถึงแบบเต็มสำหรับงานพัฒนา
- **plan** - เอเจนต์อ่านอย่างเดียวสำหรับการวิเคราะห์และการสำรวจโค้ด
  - ปฏิเสธการแก้ไขไฟล์โดยค่าเริ่มต้น
  - ขอสิทธิ์ก่อนเรียกใช้คำสั่ง bash
  - เหมาะสำหรับสำรวจโค้ดเบสที่ไม่คุ้นเคยหรือวางแผนการเปลี่ยนแปลง

นอกจากนี้ยังมีเอเจนต์ย่อย **general** สำหรับการค้นหาที่ซับซ้อนและงานหลายขั้นตอน
ใช้ภายในและสามารถเรียกใช้ได้โดยใช้ `@general` ในข้อความ

เรียนรู้เพิ่มเติมเกี่ยวกับ [เอเจนต์](https://opencode.ai/docs/agents)


**LibreCode เป็นฟอร์กของ OpenCode โปรเจกต์นี้ไม่ได้พัฒนาโดยทีมงาน OpenCode อย่างเป็นทางการ และไม่มีความสัมพันธ์ใดๆ ทั้งการเป็นพันธมิตร การสนับสนุน การอนุญาต หรือการรับรองกับพวกเขา ชื่อผลิตภัณฑ์ เครื่องหมายการค้า เครื่องหมายบริการ และเครื่องหมายการค้าจดทะเบียนทั้งหมดที่กล่าวถึงในเอกสารนี้เป็นทรัพย์สินของเจ้าของตามลำดับ โปรเจกต์นี้ให้บริการ "ตามสภาพ" (AS-IS) และภายใต้ขอบเขตสูงสุดที่กฎหมายอนุญาต จะไม่มีการรับประกันใดๆ ทั้งสิ้น**

