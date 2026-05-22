---
id: SYSTEM-HEALTH-REPORT-TEMPLATE
module: System_Health_Report_Template
era: META_OPS
version: SYSTEM_HEALTH_REPORT_TEMPLATE ∞∞
tags:
  - cockpit
  - report
  - health
  - diagnostic
  - monitoring
  - ops
  - meta_ops
---

# 🜁 SYSTEM HEALTH REPORT — TEMPLATE  
### Rapport d’état cockpit‑grade · OPS + CORE + HUD + META‑OPS · Version exportable

---

# 1. INFORMATIONS GÉNÉRALES  
- **Date :** {{date}}  
- **Heure :** {{time}}  
- **Opérateur :** {{operator}}  
- **Version cockpit :** OpenClaw_Light v∞.Ω  
- **Source du rapport :** SYSTEM_MONITOR / DIAGNOSTIC_ENGINE / MANUEL  

---

# 2. SYNTHÈSE GLOBALE  
**État global cockpit :**  
`{{GLOBAL_STATE}}`  
(OK / WARN / CRIT)

**Résumé :**  
{{GLOBAL_SUMMARY}}

---

# 3. ÉTATS PAR COUCHE  

## 3.1. OPS ENGINE  
- État : `{{OPS_STATE}}`  
- Notes : {{OPS_NOTES}}  

## 3.2. CORE ENGINE TOTAL  
- État : `{{CORE_STATE}}`  
- Notes : {{CORE_NOTES}}  

## 3.3. HUD MASTER TOTAL  
- État : `{{HUD_STATE}}`  
- Notes : {{HUD_NOTES}}  

## 3.4. PACK UI PRO v∞.Ω  
- État : `{{UI_STATE}}`  
- Notes : {{UI_NOTES}}  

## 3.5. META‑OPS  
- État : `{{META_STATE}}`  
- Notes : {{META_NOTES}}  

## 3.6. ORGANISME GLOBAL  
- État : `{{GLOBAL_ORGANISM_STATE}}`  
- Notes : {{GLOBAL_ORGANISM_NOTES}}  

---

# 4. MÉTRIQUES TEMPS RÉEL  

## 4.1. Charge  
- Charge cockpit : {{LOAD_GLOBAL}}%  
- Charge CORE : {{LOAD_CORE}}%  
- Charge HUD : {{LOAD_HUD}}%  
- Charge META‑OPS : {{LOAD_META}}%  

## 4.2. Cohérence  
- Cohérence OPS : {{COH_OPS}}%  
- Cohérence CORE : {{COH_CORE}}%  
- Cohérence HUD : {{COH_HUD}}%  
- Cohérence UI : {{COH_UI}}%  
- Cohérence META‑OPS : {{COH_META}}%  
- Cohérence globale : {{COH_GLOBAL}}%  

## 4.3. Stabilité  
- Stabilité CORE : {{STAB_CORE}}%  
- Stabilité HUD : {{STAB_HUD}}%  
- Stabilité META‑OPS : {{STAB_META}}%  
- Stabilité globale : {{STAB_GLOBAL}}%  

---

# 5. ANOMALIES DÉTECTÉES  
Liste générée par SYSTEM_MONITOR ou DIAGNOSTIC_ENGINE :

{{ANOMALIES_LIST}}


---

# 6. ACTIONS RECOMMANDÉES  
- Maintenance : {{MAINTENANCE_RECOMMENDATIONS}}  
- Réalignement : {{REALIGN_RECOMMENDATIONS}}  
- Vérifications : {{CHECK_RECOMMENDATIONS}}  
- Risques potentiels : {{RISK_NOTES}}  

---

# 7. ACTIONS AUTOMATIQUES EFFECTUÉES  
(Si SYSTEM_MONITOR ou MAINTENANCE_ENGINE a corrigé quelque chose)

{{AUTO_ACTIONS}}


---

# 8. CONCLUSION  
**État final cockpit :** `{{FINAL_STATE}}`  
(OK / WARN / CRIT)

**Commentaire opérateur :**  
{{OPERATOR_COMMENT}}

---

# 9. NAVIGATION  
- [[SYSTEM_MONITOR_TOTAL]]  
- [[DIAGNOSTIC_ENGINE_TOTAL]]  
- [[MAINTENANCE_ENGINE_TOTAL]]  
- [[EMERGENCY_SEQUENCE_TOTAL]]  
- [[STARTUP_SEQUENCE_TOTAL]]  
- [[SHUTDOWN_SEQUENCE_TOTAL]]  
- [[COCKPIT_MASTER_TOTAL]]  
- [[INDEX_COCKPIT]]  
