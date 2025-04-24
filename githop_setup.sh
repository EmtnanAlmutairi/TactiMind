#!/bin/bash
# أوامر لتهيئة مستودع GitHop لمشروع TactiMind المحدث

# المتغيرات
GITHUB_REPO="https://github.com/SuhailSaif1/TactiMind.git"
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

# 2. نسخ الملفات المحدثة إلى المستودع المحلي
echo "نسخ ملفات المشروع المحدثة إلى المستودع المحلي..."

# نسخ الملفات الأساسية
cp -r ./data ./scripts ./manus_commands.sh ./ui_integration.sh ./README.md $LOCAL_REPO_DIR/

# نسخ ملفات نموذج تتبع اللاعبين dude.k
mkdir -p $LOCAL_REPO_DIR/models/track_lab/dude_k
cp -r ./models/track_lab/dude_k $LOCAL_REPO_DIR/models/track_lab/
cp ./models/track_lab/dude_k_integration.py $LOCAL_REPO_DIR/models/track_lab/

# 3. الانتقال إلى المستودع وإضافة الملفات
cd $LOCAL_REPO_DIR
echo "إضافة الملفات إلى Git..."
git add .

# 4. إنشاء commit
echo "إنشاء commit..."
git commit -m "تحديث مشروع TactiMind: إضافة نموذج تتبع اللاعبين dude.k وسكريبت البيانات التاريخية"

# 5. دفع التغييرات إلى GitHub
echo "دفع التغييرات إلى GitHub..."
git push

echo "تم ربط مشروع TactiMind المحدث بمستودع GitHop بنجاح!"
echo "رابط المستودع: $GITHUB_REPO"
