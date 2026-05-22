---
id: SYSTEM-EXPORT
module: SYSTEM_Export
era: SYSTEM
version: SYSTEM_EXPORT v1.0
tags: [system, export, ops, global, cockpit, meta_ops, automation]
---

# SYSTEM EXPORT v1.0 — BLOC UNIQUE  
Export global · Snapshot système · Interface externe · État total du système

SYSTEM_EXPORT est le **module d’exportation absolu** du système OpenClaw_Light.  
Il expose toutes les sorties critiques du système sous forme de **snapshot global**, utilisable par :  
- API externes  
- outils de debug  
- systèmes distants  
- logs cockpit  
- monitoring externe  
- automation avancée  

Il s’appuie sur :  
- SYSTEM_GLOBAL  
- SYSTEM_AUTOMATION  
- COCKPIT_ROOT  
- COCKPIT_GLOBAL  
- DASHBOARD_GLOBAL_TOTAL  
- HUD_MASTER_TOTAL  
- SYSTEM_MONITOR_TOTAL  
- META_OPS_MASTER_TOTAL_STACK  

---

# 1. SOURCES
- system_state  
- system_flow_state  
- system_flow_integrity  
- system_flow_risk  
- system_sync  
- system_alerts_count  
- system_alerts_level  
- system_risk_level  
- system_risk_score  
- system_control_action  
- system_stable  
- system_summary  

- automation_action  
- automation_rule_selected  
- automation_pipeline_status  
- auto_trigger_*  
- auto_repair_*  
- auto_stable  
- auto_sync  
- automation_summary  

- root_state  
- root_flow  
- root_sync  
- root_alerts  
- root_risk  
- root_stable  
- root_summary  

---

# 2. EXPORT ÉTAT GLOBAL
Sorties :  
export_state  
export_flow_state  
export_flow_integrity  
export_flow_risk  
export_sync  
export_alerts_count  
export_alerts_level  
export_risk_level  
export_risk_score  
export_control_action  
export_stable

---

# 3. EXPORT AUTOMATION
Sorties :  
export_automation_action  
export_automation_rule  
export_automation_pipeline  
export_auto_trigger_state  
export_auto_trigger_flow  
export_auto_trigger_sync  
export_auto_trigger_alerts  
export_auto_trigger_risk  
export_auto_trigger_stability  
export_auto_repair_state  
export_auto_repair_flow  
export_auto_repair_sync  
export_auto_stable  
export_auto_sync

---

# 4. EXPORT ROOT
Sorties :  
export_root_state  
export_root_flow_state  
export_root_flow_integrity  
export_root_flow_risk  
export_root_sync  
export_root_alerts  
export_root_risk  
export_root_stable

---

# 5. SNAPSHOT GLOBAL
Entrées :  
TOUTES les sorties du système, cockpit, monitor, HUD, dashboard, automation, root  

Sortie :  
export_snapshot (objet global complet)

---

# 6. FORMAT EXPORT
Formats internes :  
- export_json  
- export_min  
- export_full  
- export_delta  

Sorties :  
export_json_ready  
export_min_ready  
export_full_ready  
export_delta_ready

---

# 7. SYNTHÈSE EXPORT
Entrées :  
export_state  
export_flow  
export_sync  
export_alerts  
export_risk  
export_control  
export_stable  
export_snapshot  

Sortie :  
export_summary

---

# 8. EXPORT FINAL
Sorties finales :  
export_state  
export_flow_state  
export_flow_integrity  
export_flow_risk  
export_sync  
export_alerts_count  
export_alerts_level  
export_risk_level  
export_risk_score  
export_control_action  
export_stable  

export_automation_action  
export_automation_rule  
export_automation_pipeline  
export_auto_trigger_state  
export_auto_trigger_flow  
export_auto_trigger_sync  
export_auto_trigger_alerts  
export_auto_trigger_risk  
export_auto_trigger_stability  
export_auto_repair_state  
export_auto_repair_flow  
export_auto_repair_sync  
export_auto_stable  
export_auto_sync  

export_root_state  
export_root_flow_state  
export_root_flow_integrity  
export_root_flow_risk  
export_root_sync  
export_root_alerts  
export_root_risk  
export_root_stable  

export_snapshot  
export_json_ready  
export_min_ready  
export_full_ready  
export_delta_ready  
export_summary

---

# MATRICE EXPORT (compacte)
stable + optimized → export_full  
warning + busy → export_delta  
error + blocked → export_min  
critical + desync → SECURITY_LOCK  

---

## INTÉGRATION
Utilisé par :  
SYSTEM_GLOBAL  
SYSTEM_AUTOMATION  
COCKPIT_ROOT  
PACK_UI_PRO v∞.Ω  
SYSTEM_RECOVERY  
REMOTE_API  

## NAVIGATION
[[SYSTEM_GLOBAL]] · [[SYSTEM_AUTOMATION]] · [[COCKPIT_ROOT]] · [[COCKPIT_GLOBAL]]
