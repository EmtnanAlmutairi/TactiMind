#!/bin/bash
# سكريبت لتثبيت المتطلبات اللازمة لمشروع TactiMind المحدث

# تثبيت حزمة sportsipy لجلب البيانات التاريخية
echo "تثبيت حزمة sportsipy..."
pip install sportsipy

# تثبيت متطلبات نموذج dude.k
echo "تثبيت متطلبات نموذج dude.k..."
pip install numpy pandas opencv-python torch torchvision

echo "تم تثبيت جميع المتطلبات بنجاح!"
