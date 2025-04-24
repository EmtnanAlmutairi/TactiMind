#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
سكريبت لجلب البيانات التاريخية لكرة القدم باستخدام حزمة sportsipy
يستبدل هذا السكريبت البيانات المحلية بالبيانات المستخرجة من الإنترنت
"""

import os
import sys
import pandas as pd
import json
from datetime import datetime
from typing import Dict, List, Any, Optional, Union

try:
    from sportsipy.fb.team import Team
    from sportsipy.fb.schedule import Schedule
    from sportsipy.fb.roster import Roster
except ImportError:
    print("خطأ: لم يتم العثور على حزمة sportsipy. يرجى تثبيتها باستخدام: pip install sportsipy")
    sys.exit(1)

class FootballHistoricalDataFetcher:
    """فئة لجلب البيانات التاريخية لكرة القدم باستخدام حزمة sportsipy"""
    
    def __init__(self, output_dir: str = None):
        """
        تهيئة جالب البيانات التاريخية
        
        المعلمات:
            output_dir: مسار الدليل لحفظ البيانات المستخرجة (اختياري)
        """
        self.output_dir = output_dir
        if output_dir and not os.path.exists(output_dir):
            os.makedirs(output_dir, exist_ok=True)
    
    def fetch_team_data(self, team_id: str, year: int) -> Dict[str, Any]:
        """
        جلب بيانات فريق معين لسنة محددة
        
        المعلمات:
            team_id: معرف الفريق (مثل 'Barcelona', 'Manchester_United')
            year: السنة المطلوبة
            
        العائد:
            قاموس يحتوي على بيانات الفريق
        """
        try:
            team = Team(team_id, year=year)
            
            # استخراج البيانات الأساسية للفريق
            team_data = {
                'team_id': team_id,
                'year': year,
                'name': team.name,
                'matches_played': team.games_played,
                'wins': team.wins,
                'draws': team.draws,
                'losses': team.losses,
                'goals_scored': team.goals_scored,
                'goals_against': team.goals_against,
                'goal_difference': team.goal_difference,
                'points': team.points,
                'position': team.position,
                'expected_goals': getattr(team, 'expected_goals', None),
                'expected_goals_against': getattr(team, 'expected_goals_against', None),
                'expected_goal_difference': getattr(team, 'expected_goal_difference', None),
            }
            
            # استخراج جدول مباريات الفريق
            schedule = Schedule(team_id, year=year)
            matches = []
            
            for game in schedule:
                match_data = {
                    'date': str(game.datetime),
                    'opponent': game.opponent_name,
                    'result': game.result,
                    'goals_scored': game.goals_scored,
                    'goals_allowed': game.goals_allowed,
                    'shootout_scored': getattr(game, 'shootout_scored', None),
                    'shootout_allowed': getattr(game, 'shootout_allowed', None),
                    'expected_goals': getattr(game, 'expected_goals', None),
                    'expected_goals_against': getattr(game, 'expected_goals_against', None),
                    'venue': game.location,
                    'is_home': True if game.location == 'Home' else False,
                }
                matches.append(match_data)
            
            team_data['matches'] = matches
            
            return team_data
            
        except Exception as e:
            print(f"خطأ في جلب بيانات الفريق {team_id} لسنة {year}: {e}")
            return {'error': str(e)}
    
    def fetch_league_data(self, league_teams: List[str], year: int) -> Dict[str, Any]:
        """
        جلب بيانات دوري كامل (مجموعة من الفرق) لسنة محددة
        
        المعلمات:
            league_teams: قائمة بمعرفات الفرق في الدوري
            year: السنة المطلوبة
            
        العائد:
            قاموس يحتوي على بيانات الدوري
        """
        league_data = {
            'year': year,
            'teams': []
        }
        
        for team_id in league_teams:
            team_data = self.fetch_team_data(team_id, year)
            if 'error' not in team_data:
                league_data['teams'].append(team_data)
        
        return league_data
    
    def fetch_player_data(self, team_id: str, year: int) -> Dict[str, List[Dict[str, Any]]]:
        """
        جلب بيانات لاعبي فريق معين لسنة محددة
        
        المعلمات:
            team_id: معرف الفريق
            year: السنة المطلوبة
            
        العائد:
            قاموس يحتوي على بيانات اللاعبين
        """
        try:
            roster = Roster(team_id, year=year)
            players = []
            
            for player in roster.players:
                player_data = {
                    'name': player.name,
                    'nationality': player.nationality,
                    'position': player.position,
                    'age': player.age,
                    'matches_played': player.games_played,
                    'games_started': player.games_starts,
                    'minutes_played': player.minutes_played,
                    'goals': player.goals,
                    'assists': player.assists,
                    'shots': getattr(player, 'shots', None),
                    'shots_on_target': getattr(player, 'shots_on_target', None),
                    'yellow_cards': player.yellow_cards,
                    'red_cards': player.red_cards,
                }
                players.append(player_data)
            
            return {'team_id': team_id, 'year': year, 'players': players}
            
        except Exception as e:
            print(f"خطأ في جلب بيانات لاعبي الفريق {team_id} لسنة {year}: {e}")
            return {'error': str(e)}
    
    def save_to_csv(self, data: Dict[str, Any], filename: str) -> str:
        """
        حفظ البيانات في ملف CSV
        
        المعلمات:
            data: البيانات المراد حفظها
            filename: اسم الملف
            
        العائد:
            مسار الملف المحفوظ
        """
        if not self.output_dir:
            self.output_dir = os.path.join(os.getcwd(), 'data', 'historical_stats')
            os.makedirs(self.output_dir, exist_ok=True)
        
        file_path = os.path.join(self.output_dir, filename)
        
        # تحويل البيانات إلى DataFrame حسب نوعها
        if 'teams' in data:  # بيانات دوري
            teams_data = []
            for team in data['teams']:
                for match in team.get('matches', []):
                    match_data = {
                        'فريق': team['name'],
                        'مباراة': match['opponent'],
                        'تاريخ': match['date'],
                        'استحواذ': None,  # غير متوفر في sportsipy
                        'تمريرات_ناجحة': None,  # غير متوفر في sportsipy
                        'تسديدات': None,  # غير متوفر في sportsipy
                        'تسديدات_على_المرمى': None,  # غير متوفر في sportsipy
                        'أهداف': match['goals_scored'],
                        'ركلات_ركنية': None,  # غير متوفر في sportsipy
                        'تسللات': None,  # غير متوفر في sportsipy
                        'أخطاء': None,  # غير متوفر في sportsipy
                        'بطاقات_صفراء': None,  # غير متوفر في sportsipy
                        'بطاقات_حمراء': None,  # غير متوفر في sportsipy
                        'expected_goals': match.get('expected_goals'),
                        'shootout_scored': match.get('shootout_scored')
                    }
                    teams_data.append(match_data)
            
            df = pd.DataFrame(teams_data)
        
        elif 'players' in data:  # بيانات لاعبين
            df = pd.DataFrame(data['players'])
        
        else:  # بيانات فريق واحد
            matches_data = []
            for match in data.get('matches', []):
                match_data = {
                    'فريق': data['name'],
                    'مباراة': match['opponent'],
                    'تاريخ': match['date'],
                    'استحواذ': None,  # غير متوفر في sportsipy
                    'تمريرات_ناجحة': None,  # غير متوفر في sportsipy
                    'تسديدات': None,  # غير متوفر في sportsipy
                    'تسديدات_على_المرمى': None,  # غير متوفر في sportsipy
                    'أهداف': match['goals_scored'],
                    'ركلات_ركنية': None,  # غير متوفر في sportsipy
                    'تسللات': None,  # غير متوفر في sportsipy
                    'أخطاء': None,  # غير متوفر في sportsipy
                    'بطاقات_صفراء': None,  # غير متوفر في sportsipy
                    'بطاقات_حمراء': None,  # غير متوفر في sportsipy
                    'expected_goals': match.get('expected_goals'),
                    'shootout_scored': match.get('shootout_scored')
                }
                matches_data.append(match_data)
            
            df = pd.DataFrame(matches_data)
        
        # حفظ البيانات في ملف CSV
        df.to_csv(file_path, index=False)
        print(f"تم حفظ البيانات في {file_path}")
        
        return file_path
    
    def save_to_json(self, data: Dict[str, Any], filename: str) -> str:
        """
        حفظ البيانات في ملف JSON
        
        المعلمات:
            data: البيانات المراد حفظها
            filename: اسم الملف
            
        العائد:
            مسار الملف المحفوظ
        """
        if not self.output_dir:
            self.output_dir = os.path.join(os.getcwd(), 'data', 'historical_stats')
            os.makedirs(self.output_dir, exist_ok=True)
        
        file_path = os.path.join(self.output_dir, filename)
        
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        
        print(f"تم حفظ البيانات في {file_path}")
        
        return file_path
    
    def fetch_and_save_multiple_teams(self, teams: List[str], years: List[int], format: str = 'csv') -> List[str]:
        """
        جلب وحفظ بيانات عدة فرق لعدة سنوات
        
        المعلمات:
            teams: قائمة بمعرفات الفرق
            years: قائمة بالسنوات المطلوبة
            format: صيغة الملف ('csv' أو 'json')
            
        العائد:
            قائمة بمسارات الملفات المحفوظة
        """
        saved_files = []
        
        for year in years:
            for team_id in teams:
                team_data = self.fetch_team_data(team_id, year)
                
                if 'error' not in team_data:
                    filename = f"{team_id}_{year}.{format}"
                    
                    if format.lower() == 'csv':
                        file_path = self.save_to_csv(team_data, filename)
                    else:
                        file_path = self.save_to_json(team_data, filename)
                    
                    saved_files.append(file_path)
        
        # إنشاء ملف تجميعي يحتوي على بيانات جميع الفرق
        if saved_files:
            all_teams_data = []
            
            for team_id in teams:
                for year in years:
                    team_data = self.fetch_team_data(team_id, year)
                    if 'error' not in team_data:
                        all_teams_data.append(team_data)
            
            if all_teams_data:
                combined_data = {
                    'teams': all_teams_data,
                    'generated_at': datetime.now().isoformat()
                }
                
                if format.lower() == 'csv':
                    file_path = self.save_to_csv(combined_data, f"historical_stats.{format}")
                else:
                    file_path = self.save_to_json(combined_data, f"historical_stats.{format}")
                
                saved_files.append(file_path)
        
        return saved_files


def main():
    """الدالة الرئيسية"""
    import argparse
    
    parser = argparse.ArgumentParser(description='جلب البيانات التاريخية لكرة القدم باستخدام حزمة sportsipy')
    parser.add_argument('--teams', nargs='+', default=['Barcelona', 'Real_Madrid', 'Manchester_United', 'Liverpool'],
                        help='قائمة بمعرفات الفرق المطلوبة')
    parser.add_argument('--years', nargs='+', type=int, default=[2023, 2024],
                        help='قائمة بالسنوات المطلوبة')
    parser.add_argument('--output_dir', default=None,
                        help='مسار الدليل لحفظ البيانات المستخرجة')
    parser.add_argument('--format', choices=['csv', 'json'], default='csv',
                        help='صيغة الملف المحفوظ')
    
    args = parser.parse_args()
    
    fetcher = FootballHistoricalDataFetcher(args.output_dir)
    saved_files = fetcher.fetch_and_save_multiple_teams(args.teams, args.years, args.format)
    
    print(f"تم حفظ {len(saved_files)} ملف:")
    for file_path in saved_files:
        print(f"  - {file_path}")


if __name__ == "__main__":
    main()
