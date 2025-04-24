#!/bin/bash
# دليل تفصيلي لرفع مشروع TactiMind إلى GitHub

# المتغيرات - قم بتعديلها حسب حسابك على GitHub
GITHUB_USERNAME="EmtnanAlmutairi"  # استبدل بإسم المستخدم الخاص بك على GitHub
GITHUB_REPO_NAME="TactiMind"     # اسم المستودع الذي تريد إنشاءه
GITHUB_REPO="https://github.com/$GITHUB_USERNAME/$GITHUB_REPO_NAME.git"

echo "=== دليل رفع مشروع TactiMind إلى GitHub ==="
echo "سيساعدك هذا السكريبت في رفع المشروع إلى حساب GitHub الخاص بك"
echo "الرابط المستهدف: $GITHUB_REPO"
echo ""

# التحقق من تثبيت Git
if ! command -v git &> /dev/null; then
    echo "خطأ: Git غير مثبت على جهازك."
    echo "يرجى تثبيت Git أولاً من خلال:"
    echo "  - على Ubuntu/Debian: sudo apt-get install git"
    echo "  - على macOS: brew install git"
    echo "  - على Windows: تحميل وتثبيت Git من https://git-scm.com/download/win"
    exit 1
fi

echo "✓ Git مثبت على جهازك"

# التحقق من إعدادات Git
if [ -z "$(git config --global user.name)" ] || [ -z "$(git config --global user.email)" ]; then
    echo "يجب إعداد اسم المستخدم والبريد الإلكتروني في Git:"
    echo "git config --global user.name \"اسمك\""
    echo "git config --global user.email \"بريدك الإلكتروني\""
    
    read -p "هل تريد إعدادهم الآن؟ (y/n): " setup_git
    if [ "$setup_git" = "y" ]; then
        read -p "أدخل اسمك: " git_name
        read -p "أدخل بريدك الإلكتروني: " git_email
        
        git config --global user.name "$git_name"
        git config --global user.email "$git_email"
        echo "✓ تم إعداد Git بنجاح"
    else
        echo "يرجى إعداد Git قبل المتابعة"
        exit 1
    fi
else
    echo "✓ إعدادات Git موجودة بالفعل"
    echo "  اسم المستخدم: $(git config --global user.name)"
    echo "  البريد الإلكتروني: $(git config --global user.email)"
fi

# التحقق من وجود المجلد الحالي
if [ ! -d "./TactiMind_package" ] && [ ! -f "./manus_commands.sh" ]; then
    echo "خطأ: يجب تنفيذ هذا السكريبت من المجلد الذي يحتوي على مشروع TactiMind"
    echo "تأكد من فك ضغط الملف TactiMind_project.tar.gz أولاً:"
    echo "  tar -xzvf TactiMind_project.tar.gz"
    echo "  cd TactiMind_package"
    exit 1
fi

echo "✓ مجلد المشروع موجود"

# إنشاء مستودع Git محلي
echo "إنشاء مستودع Git محلي..."
git init
if [ $? -ne 0 ]; then
    echo "خطأ: فشل إنشاء مستودع Git المحلي"
    exit 1
fi
echo "✓ تم إنشاء مستودع Git المحلي"

# إضافة الملفات إلى Git
echo "إضافة ملفات المشروع إلى Git..."
git add .
if [ $? -ne 0 ]; then
    echo "خطأ: فشل إضافة الملفات إلى Git"
    exit 1
fi
echo "✓ تم إضافة الملفات إلى Git"

# إنشاء commit
echo "إنشاء commit..."
git commit -m "إضافة مشروع TactiMind الكامل"
if [ $? -ne 0 ]; then
    echo "خطأ: فشل إنشاء commit"
    exit 1
fi
echo "✓ تم إنشاء commit"

# إضافة المستودع البعيد
echo ""
echo "الخطوة التالية هي إضافة المستودع البعيد على GitHub."
echo "قبل المتابعة، يجب عليك إنشاء مستودع فارغ على GitHub:"
echo "1. اذهب إلى https://github.com/new"
echo "2. أدخل اسم المستودع: $GITHUB_REPO_NAME"
echo "3. اختر ما إذا كان المستودع عاماً أو خاصاً"
echo "4. انقر على 'Create repository' بدون إضافة أي ملفات"
echo ""

read -p "هل أنشأت المستودع على GitHub؟ (y/n): " created_repo
if [ "$created_repo" != "y" ]; then
    echo "يرجى إنشاء المستودع على GitHub قبل المتابعة"
    exit 1
fi

echo "إضافة المستودع البعيد..."
git remote add origin $GITHUB_REPO
if [ $? -ne 0 ]; then
    echo "خطأ: فشل إضافة المستودع البعيد"
    echo "تأكد من أن الرابط صحيح: $GITHUB_REPO"
    exit 1
fi
echo "✓ تم إضافة المستودع البعيد"

# دفع التغييرات إلى GitHub
echo ""
echo "الخطوة الأخيرة هي دفع التغييرات إلى GitHub."
echo "ستحتاج إلى المصادقة مع GitHub. يمكنك استخدام:"
echo "- اسم المستخدم وكلمة المرور (إذا كان مفعلاً)"
echo "- رمز الوصول الشخصي (Personal Access Token)"
echo "- مفتاح SSH (إذا كان مُعداً)"
echo ""

read -p "هل أنت مستعد للمصادقة ودفع التغييرات؟ (y/n): " ready_push
if [ "$ready_push" != "y" ]; then
    echo "يمكنك دفع التغييرات لاحقاً باستخدام:"
    echo "git push -u origin master"
    exit 0
fi

echo "دفع التغييرات إلى GitHub..."
git push -u origin master
if [ $? -ne 0 ]; then
    echo "خطأ: فشل دفع التغييرات إلى GitHub"
    echo "قد تحتاج إلى إعداد المصادقة مع GitHub:"
    echo "- إنشاء رمز وصول شخصي: https://github.com/settings/tokens"
    echo "- إعداد مفتاح SSH: https://docs.github.com/en/authentication/connecting-to-github-with-ssh"
    exit 1
fi

echo "✓ تم دفع التغييرات إلى GitHub بنجاح!"
echo ""
echo "=== تم رفع مشروع TactiMind إلى GitHub بنجاح! ==="
echo "يمكنك الآن الوصول إلى المشروع على:"
echo "$GITHUB_REPO"
echo ""
echo "لتحديث المشروع في المستقبل، استخدم:"
echo "git add ."
echo "git commit -m \"وصف التحديثات\""
echo "git push"
