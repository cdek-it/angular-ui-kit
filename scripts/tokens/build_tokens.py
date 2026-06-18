import json, re, copy
orig=json.load(open("src/lib/providers/prime-preset/tokens/tokens.json"))
canon=json.load(open("docs/superpowers/specs/prebuild-tokens.json"))
def strip_color(o):
    if isinstance(o,str): return re.sub(r"\{color\.([^}]+)\}", r"{\1}", o)
    if isinstance(o,dict): return {k:strip_color(v) for k,v in o.items()}
    if isinstance(o,list): return [strip_color(x) for x in o]
    return o
def merge(a,b):
    out=copy.deepcopy(a)
    for k,v in b.items():
        out[k]=merge(out[k],v) if (k in out and isinstance(out[k],dict) and isinstance(v,dict)) else copy.deepcopy(v)
    return out
prim=copy.deepcopy(orig["primitive"]); prim["size"]=copy.deepcopy(canon["primitive"]["size"])
sem=copy.deepcopy(orig["semantic"])  # сохраняем старый colorScheme + бакеты = backward-compat для Aura/CSS
sem["dimension"]=strip_color(canon["semantic"]["dimension"])
sem["typography"]=strip_color(canon["semantic"]["typography"])
sem["shadow"]=strip_color(canon["semantic"]["shadow"])
sem["colorScheme"]["light"]=merge(sem["colorScheme"]["light"], strip_color(canon["semantic"]["color"]["light"]))
sem["colorScheme"]["dark"]=merge(sem["colorScheme"]["dark"], strip_color(canon["semantic"]["color"]["dark"]))
out={"primitive":prim,"semantic":sem,"components":strip_color(canon["components"])}
json.dump(out, open("src/lib/providers/prime-preset/tokens/tokens.migrated.json","w"), ensure_ascii=False, indent=2)
print("ok")
