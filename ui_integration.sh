#!/bin/bash
# أوامر ربط واجهة المستخدم React/WebGL مع خط أنابيب TactiMind

# المعلومات الافتراضية (يجب استبدالها بالمعلومات الحقيقية)
PIPELINE_NAME="TactiMindPipeline"
REACT_APP_DIR="./react-app"  # استبدل بالمسار الحقيقي لتطبيق React الخاص بك

# 1. (اختياري) إنشاء مفتاح API للقراءة فقط لواجهة المستخدم
manus api-key create ui_read_key \
  --role read \
  --description "Key for front-end to call TactiMind inference endpoint" \
  --output json | jq -r .key > manus_ui.key

# 2. استخراج عنوان الاستدلال العام لخطوة 'Serve'
INFER_URL=$(manus pipeline get $PIPELINE_NAME Serve --url)
echo "Inference URL: $INFER_URL"

# 3. تخزين نقطة النهاية والمفتاح في ملف البيئة لتطبيق React
mkdir -p $REACT_APP_DIR
cat > $REACT_APP_DIR/.env.development <<EOL
REACT_APP_INFER_URL=$INFER_URL
REACT_APP_MANUS_API_KEY=$(<manus_ui.key)
EOL

# 4. (اختياري) اختبار نقطة النهاية باستخدام curl
echo "اختبار نقطة النهاية باستخدام curl..."
curl -X POST "$INFER_URL" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $(<manus_ui.key)" \
  -d '{
        "video_frame": "BASE64_FRAME_PLACEHOLDER",
        "player_coords": [{"id": 1, "x": 10, "y": 20}, {"id": 2, "x": 30, "y": 40}],
        "ball_coords": {"x": 50, "y": 60},
        "event_labels": ["pass", "shot"],
        "historical_stats": { "team_xG": 1.2, "possession": 60 }
      }'

# 5. إنشاء ملف API لتطبيق React
mkdir -p $REACT_APP_DIR/src/utils
cat > $REACT_APP_DIR/src/utils/api.js <<'JS'
export async function fetchTacticAnalysis(payload) {
  const res = await fetch(process.env.REACT_APP_INFER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.REACT_APP_MANUS_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });
  return res.json();
}
JS

echo "تم إنشاء ملفات تكامل واجهة المستخدم بنجاح!"
echo "لتثبيت وتشغيل واجهة المستخدم، قم بتنفيذ الأوامر التالية:"
echo "cd $REACT_APP_DIR"
echo "npm install"
echo "npm start"
