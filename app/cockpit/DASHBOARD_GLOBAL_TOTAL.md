---
id: DASHBOARD-GLOBAL-TOTAL
module: Dashboard_Global_Total
era: COCKPIT
version: DASHBOARD_GLOBAL_TOTAL v1.0
tags: [cockpit, dashboard, global, total, ops, hud, monitor]
---

# DASHBOARD GLOBAL TOTAL v1.0 — BLOC UNIQUE  
Vue unifiée · Synthèse cockpit · Monitoring total · Rendu HUD complet

DASHBOARD_GLOBAL_TOTAL est la **vue centrale** du cockpit OpenClaw_Light.  
Il fusionne les sorties de :  
- COCKPIT_MASTER_TOTAL  
- SYSTEM_MONITOR_TOTAL  
- HUD_MASTER_TOTAL  
- META_OPS_MASTER_TOTAL_STACK  

Il fournit :  
- état global  
- flux globaux  
- synchro globale  
- alertes globales  
- risque global  
- stabilité globale  
- contrôle global  
- synthèse totale  
- widgets globaux

---

# 1. SOURCES
- hud_state  
- hud_flow_state  
- hud_flow_integrity  
- hud_flow_risk  
- hud_sync  
- hud_alerts_count  
- hud_alerts_level  
- hud_risk_level  
- hud_risk_score  
- hud_control_action  
- hud_stable  
- monitor_state  
- monitor_flow_state  
- monitor_sync  
- monitor_alerts  
- monitor_risk  
- monitor_stable  
- cockpit_state  
- cockpit_flow_state  
- cockpit_sync  
- cockpit_alerts  
- cockpit_risk  
- cockpit_stable  

---

# 2. ÉTAT GLOBAL
Entrées : hud_state, monitor_state, cockpit_state  
Sortie :  
dashboard_state: <origin|stable|elevated|structured|optimized|harmonized|absolute|critical>

---

# 3. FLUX GLOBAUX
Entrées :  
hud_flow_state  
hud_flow_integrity  
hud_flow_risk  
monitor_flow_state  
cockpit_flow_state  

Sorties :  
dashboard_flow_state  
dashboard_flow_integrity  
dashboard_flow_risk

---

# 4. SYNCHRO GLOBALE
Entrées :  
hud_sync  
monitor_sync  
cockpit_sync  

Sortie :  
dashboard_sync: <ok|partial|desync|forced>

---

# 5. ALERTES GLOBALES
Entrées :  
hud_alerts_count  
hud_alerts_level  
monitor_alerts_count  
monitor_alerts_level  
cockpit_alerts_count  
cockpit_alerts_level  

Sorties :  
dashboard_alerts_count  
dashboard_alerts_level

---

# 6. RISQUE GLOBAL
Entrées :  
hud_risk_level  
hud_risk_score  
monitor_risk_level  
monitor_risk_score  
cockpit_risk_level  
cockpit_risk_score  

Sorties :  
dashboard_risk_level  
dashboard_risk_score

---

# 7. CONTRÔLE GLOBAL
Entrée : hud_control_action  
Sortie :  
dashboard_control_action: <resolved|blocked|delegated>

---

# 8. STABILITÉ GLOBALE
Entrées :  
hud_stable  
monitor_stable  
cockpit_stable  

Sortie :  
dashboard_stable: <true|false>

---

# 9. SYNTHÈSE GLOBALE
Entrée : hud_summary  
Sortie :  
dashboard_summary

---

# 10. WIDGETS GLOBAUX (compact)
- DASHBOARD_STATE_WIDGET  
- DASHBOARD_FLOW_WIDGET  
- DASHBOARD_SYNC_WIDGET  
- DASHBOARD_ALERTS_WIDGET  
- DASHBOARD_RISK_WIDGET  
- DASHBOARD_CONTROL_WIDGET  
- DASHBOARD_STABILITY_WIDGET  
- DASHBOARD_SUMMARY_WIDGET  

Tous basés sur les sorties dashboard_*.

---

# MATRICE DASHBOARD (compacte)
stable + optimized → harmonized  
harmonized + omega → absolute  
warning + busy → dashboard_flow + dashboard_risk  
error + blocked → dashboard_control_action  
critical + desync → SECURITY_LOCK  

---

# SORTIES GLOBALES
dashboard_state  
dashboard_flow_state  
dashboard_flow_integrity  
dashboard_flow_risk  
dashboard_sync  
dashboard_alerts_count  
dashboard_alerts_level  
dashboard_risk_level  
dashboard_risk_score  
dashboard_control_action  
dashboard_stable  
dashboard_summary

---

## INTÉGRATION
Utilisé par :  
COCKPIT_GLOBAL  
PACK_UI_PRO  
SYSTEM_GLOBAL  

## NAVIGATION
[[HUD_MASTER_TOTAL]] · [[SYSTEM_MONITOR_TOTAL]] · [[COCKPIT_MASTER_TOTAL]] · [[META_OPS_MASTER_TOTAL_STACK]]
