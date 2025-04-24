#!/bin/bash
# أوامر لتهيئة مستودع GitHub لمشروع TactiMind

# المتغيرات
GITHUB_REPO="https://github.com/EmtnanAlmutairi/TactiMind.git"
LOCAL_REPO_DIR="./TactiMind_repo"

# 1. استنساخ المستودع (إذا لم يكن موجوداً بالفعل)
if [ ! -d "$LOCAL_REPO_DIR" ]; then
  echo "استنساخ المستودع من GitHub..."
  git clone $GITHUB_REPO $LOCAL_REPO_DIR
else
  echo "المستودع موجود بالفعل، جاري التحديث..."
  cd $LOCAL_REPO_DIR
  git pull
  cd ..
fi

# 2. نسخ الملفات إلى المستودع المحلي
echo "نسخ ملفات المشروع إلى المستودع المحلي..."
cp -r ./data ./models ./scripts ./manus_commands.sh ./ui_integration.sh ./README.md $LOCAL_REPO_DIR/

# 3. الانتقال إلى المستودع وإضافة الملفات
cd $LOCAL_REPO_DIR
echo "إضافة الملفات إلى Git..."
git add .

# 4. إنشاء commit
echo "إنشاء commit..."
git commit -m "إضافة ملفات مشروع TactiMind مع تكامل واجهة المستخدم React/WebGL"

# 5. دفع التغييرات إلى GitHub
echo "دفع التغييرات إلى GitHub..."
git push

echo "تم ربط مشروع TactiMind بمستودع GitHub بنجاح!"
echo "رابط المستودع: $GITHUB_REPO"
