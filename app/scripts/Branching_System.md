<%*
const action = await tp.system.prompt("Action (branch / commit / merge)");
const branchFile = "Branches/branches.json";

let branches = {};
try {
  branches = JSON.parse(await app.vault.read(app.vault.getAbstractFileByPath(branchFile)));
} catch(e) {
  branches = { main: [] };
}

if (action == "branch") {
  const name = await tp.system.prompt("Nom de la branche");
  branches[name] = [];
  tR += `✔️ Branche créée : ${name}`;
}

if (action == "commit") {
  const branch = await tp.system.prompt("Branche");
  const msg = await tp.system.prompt("Message de commit");
  const file = tp.file.path;

  branches[branch].push({
    file,
    msg,
    time: tp.date.now("YYYY-MM-DD HH:mm")
  });

  tR += `✔️ Commit ajouté à ${branch}`;
}

if (action == "merge") {
  const from = await tp.system.prompt("Depuis la branche");
  const to = await tp.system.prompt("Vers la branche");

  branches[to] = branches[to].concat(branches[from]);
  tR += `✔️ Merge ${from} → ${to}`;
}

await app.vault.modify(
  await app.vault.getAbstractFileByPath(branchFile),
  JSON.stringify(branches, null, 2)
);
%>
