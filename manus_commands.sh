#!/bin/bash
# أوامر مانوس لمشروع TactiMind
# هذا الملف يحتوي على أوامر مانوس التي يمكن تنفيذها بعد استبدال المعلومات الافتراضية بالمعلومات الحقيقية

# المعلومات الافتراضية (يجب استبدالها بالمعلومات الحقيقية)
COMPUTE_PROFILE="standard"  # استبدل بملف الحوسبة الخاص بك
GITHUB_REPO="https://github.com/SuhailSaif1/TactiMind.git"  # تم تحديث رابط مستودع GitHub
API_TOKEN="your_api_token_here"  # استبدل برمز API الخاص بك

# المسارات المحلية (يجب استبدالها بالمسارات الحقيقية)
VIDEOS_PATH="/home/ubuntu/TactiMind/data/match_videos"
STATS_PATH="/home/ubuntu/TactiMind/data/historical_stats"
MODELS_PATH="/home/ubuntu/TactiMind/models"

# 1. إنشاء مشروع جديد على Manus
manus project create TactiMind \
  --compute-profile $COMPUTE_PROFILE \
  --github-repo $GITHUB_REPO

# 2. استيراد بيانات المباريات والفيديوهات
manus data import match_videos $VIDEOS_PATH/ \
  --format directory

# 3. استيراد الإحصاءات التاريخية
manus data import historical_stats $STATS_PATH/historical_stats.csv \
  --format csv

# 4. تسجيل نموذج تتبع اللاعبين والكرة (TrackLab)
manus model register track_lab_model \
  --file $MODELS_PATH/track_lab/tracklab.onnx \
  --format onnx \
  --inputs video_frame \
  --outputs player_coords,ball_coords \
  --description "YOLOv8-ByteTrack ONNX model for player & ball tracking"

# 5. تسجيل نموذج كشف الأحداث (Event Detection)
manus model register event_detection_model \
  --file $MODELS_PATH/event_detection/event_model.onnx \
  --format onnx \
  --inputs video_clip \
  --outputs event_labels \
  --description "TSM-based action recognition ONNX model"

# 6. إنشاء خط أنابيب المعالجة (Pipeline)
manus pipeline create TactiMindPipeline \
  --step Tracking=track_lab_model:match_videos:tracking_output \
  --step EventDetection=event_detection_model:match_videos:event_output \
  --step Fusion=/home/ubuntu/TactiMind/scripts/fusion.py:tracking_output,event_output,historical_stats:tactical_output \
  --step Serve=endpoint:/infer:tactical_output \
  --description "Full TactiMind pipeline: tracking → events → fusion → serve"

# 7. نشر خط الأنابيب وإعداد التوسّع الأوتوماتيكي
manus deploy TactiMindPipeline \
  --autoscale \
  --min-instances 1 \
  --max-instances 5 \
  --auth-token $API_TOKEN
