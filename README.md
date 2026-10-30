# TakaGuchhi Web

PC ও ফোন দুটোতেই চলে, Google দিয়ে সাইন ইন করলে হিসাব দুই জায়গায় নিজে থেকে সিঙ্ক হয়।

## GitHub Pages-এ চালু করার ধাপ
1. GitHub-এ নতুন repository বানান (যেমন `takaguchhi-web`), **Public** রাখুন।
2. এই zip খুলে ভেতরের **সব ফাইল** repository-র মূল পাতায় আপলোড করুন (Add file → Upload files)। ফোল্ডারে ঢুকিয়ে নয়, সরাসরি `index.html` যেন মূল পাতায় থাকে।
3. Settings → Pages → Source: **Deploy from a branch** → Branch: `main` / `(root)` → Save।
4. ১-২ মিনিট পর লিংক আসবে: `https://আপনার-ইউজারনেম.github.io/takaguchhi-web/`
5. Firebase Console → Authentication → Settings → **Authorized domains** → Add domain → `আপনার-ইউজারনেম.github.io`।
6. লিংক খুলে ⚙️ সেটিংস → Google দিয়ে সাইন ইন করুন।

ফোনে: ব্রাউজারের মেনু → "Add to Home screen" দিলে অ্যাপের মতো খুলবে।
