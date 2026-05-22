---
id: META-OPS-FLOW-PROTOCOL
module: META_OPS_Flow_Protocol
era: OPS
version: META_OPS_FLOW_PROTOCOL v1.0
tags: [cockpit, meta_ops, flow, protocol, operational, engine]
---

# META‑OPS FLOW PROTOCOL v1.0 — BLOC UNIQUE  
Protocole des flux internes · Priorités · Stabilisation · Transitions cockpit

Le FLOW PROTOCOL définit **comment les flux circulent** dans OpenClaw_Light.  
Il gère les priorités, les transitions, les blocages, les surcharges, les stabilisations et les corrections automatiques.  
C’est la couche qui garantit que le cockpit reste fluide, stable et cohérent.

## ARCHITECTURE (compacte)
1. FLOW_STATES — états des flux  
2. FLOW_PRIORITIES — hiérarchie des flux  
3. FLOW_TRANSITIONS — règles de passage  
4. FLOW_STABILIZATION — stabilisation automatique  
5. FLOW_CORRECTION — correction des anomalies  
6. FLOW_PROPAGATION — propagation inter‑moteurs  
7. FLOW_MONITORING — surveillance continue

## ÉTATS DE FLUX
stable → busy → blocked → overload  
Chaque état modifie :  
- les réactions  
- les priorités  
- la synchro  
- les alertes  
- les actions automatiques  

## PRIORITÉS DE FLUX
1. sécurité (SECURITY_ENGINE)  
2. états cockpit (CORE_ENGINE)  
3. synchronisation (MASTER_ENGINE)  
4. diagnostic (DIAGNOSTIC_ENGINE)  
5. automatisation (AUTOMATION_ENGINE)  
6. interface (UI/HUD)  

## TRANSITIONS (compactes)
stable → busy (charge > seuil 1)  
busy → blocked (flux interrompu)  
busy → overload (charge > seuil 2)  
blocked → stable (AUTO_FIX + CORE_FORCE_SYNC)  
overload → busy (AUTO_BALANCE)  

## RÉACTIONS AUTOMATIQUES
stable: no_op  
busy: AUTO_BALANCE  
blocked: CORE_FORCE_SYNC + AUTO_FIX  
overload: AUTO_BALANCE + DIAG_SCAN + HUD_ALERT_LAYER.warning  

## STABILISATION
FLOW_STABILIZATION agit sur :  
- files d’attente  
- priorités  
- charges moteur  
- déséquilibres CORE/UI/HUD  
- flux oscillants  

Sortie :  

flow_stable: <true|false>


## CORRECTION
FLOW_CORRECTION déclenche :  
- AUTO_FIX  
- MASTER_RESOLVE  
- DIAG_SCAN  
- SECURITY_VALIDATE  
- HUD_MASTER_SYNC  

## PROPAGATION
flux → CORE → AUTOMATION → MASTER → COCKPIT → MONITOR → HUD_MASTER  
alertes_flux → HUD → MONITOR → COCKPIT  
surcharges → DIAGNOSTIC → SECURITY → MASTER  

## MONITORING
FLOW_MONITORING surveille :  
- charge moteur  
- vitesse de traitement  
- files internes  
- synchro partielle  
- erreurs de flux  
- oscillations  

Sorties :  
flow_rate: <0-100>  
flow_health: <0-100>  
flow_risk: <low|medium|high>  

## MATRICE DE DÉCISION (compacte)
blocked + desync → REACT_SYNC + REACT_FLOW  
overload + warning → REACT_ALERT + REACT_FLOW  
busy + partial_sync → MASTER_SYNC_ALL  
critical + blocked → SECURITY_LOCK + AUTO_FIX  

## INTÉGRATION
Utilisé par :  
META_OPS_BEHAVIOR_MODEL, META_OPS_REACTION_LIBRARY, META_OPS_STATE_PROTOCOL, META_OPS_MASTER_ENGINE, SYSTEM_MONITOR_TOTAL, COCKPIT_MASTER_TOTAL

## NAVIGATION
[[META_OPS_BEHAVIOR_MODEL]] · [[META_OPS_REACTION_LIBRARY]] · [[META_OPS_STATE_PROTOCOL]] · [[META_OPS_MASTER_ENGINE]] · [[COCKPIT_MASTER_TOTAL]] · [[SYSTEM_MONITOR_TOTAL]]
