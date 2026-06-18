import json
m=json.load(open("docs/superpowers/specs/2026-06-17-primitive-remap.json"))
f="src/lib/providers/prime-preset/tokens/tokens.json"
t=json.load(open(f))
def fix(o):
    if isinstance(o,str):
        for old,new in m.items(): o=o.replace("{"+old+"}","{"+new+"}")
        return o
    if isinstance(o,dict): return {k:fix(v) for k,v in o.items()}
    if isinstance(o,list): return [fix(x) for x in o]
    return o
t=fix(t)
for k in ("spacing","sizing","borderWidth","borderRadius"): t["primitive"].pop(k,None)
json.dump(t,open(f,"w"),ensure_ascii=False,indent=2); print("ok, primitive keys:", list(t["primitive"].keys()))
