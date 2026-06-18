import json, re, sys
# Эталон значений = pre-migration снимок (фикстура). Можно переопределить argv[2].
# Использование: python3 validate.py <candidate> [<baseline>]
DEFAULT_BASE="scripts/tokens/baseline.json"
def get(t,p):
    c=t
    for x in p.split("."):
        c=c.get(x) if isinstance(c,dict) else None
        if c is None: return None
    return c
def leaves(d,p=""):
    for k,v in d.items():
        pp=p+"."+k if p else k
        if isinstance(v,dict): yield from leaves(v,pp)
        elif isinstance(v,str): yield pp,v
def mkres(t,mode):
    P=t["primitive"];S=t["semantic"];CS=get(S,"colorScheme.%s"%mode) or {};CL=get(S,"color.%s"%mode) or {}
    def r(val,d=0):
        if not isinstance(val,str) or d>30: return val
        def rp(m):
            ref=m.group(1);root=ref.split(".")[0]
            node=get(CL,ref[6:]) if root=="color" else (get(P,ref) or get(S,ref) or get(CS,ref) or get(t["components"],ref))
            if node is None or isinstance(node,dict): return m.group(0)
            return r(node,d+1)
        return re.sub(r"\{([^}]+)\}",rp,val)
    return r
def main(cand, base_path):
    base=json.load(open(base_path)); new=json.load(open(cand))
    if base_path==cand:
        print("WARN: baseline == candidate — EQUIV-проверка вырождена (сравнение файла с собой)")
    # equivalence
    for mode in ("light","dark"):
        rb=mkres(base,mode); rn=mkres(new,mode)
        ob=dict(leaves(base["components"])); on=dict(leaves(new["components"]))
        same=diff=0
        for path in set(ob)&set(on):
            a=rb(ob[path]).strip().lower(); b=rn(on[path]).strip().lower()
            if "{" in a or "{" in b: continue
            if a==b: same+=1
            elif "0.000" in a and "0.000" in b: same+=1
            else: diff+=1
        print(f"EQUIV {mode}: same={same} diffs={diff}")
        if diff>0: globals()['FAIL']=True
    # dangling + R11
    PRIM=set(new["primitive"].keys()); SEM=set(new["semantic"].keys())
    CL=get(new["semantic"],"color.light") or {}
    CS=get(new["semantic"],"colorScheme.light") or {}
    def resolves(r):
        root=r.split(".")[0]
        if root=="color": return get(CL,r[6:]) is not None
        # любой формат: primitive | semantic top-level | colorScheme.light | color.light | component
        return (get(new["primitive"],r) is not None or get(new["semantic"],r) is not None
                or get(CS,r) is not None or get(CL,r) is not None or get(new["components"],r) is not None)
    refs=[]
    def walk(d):
        for v in d.values():
            if isinstance(v,dict): walk(v)
            elif isinstance(v,str): refs.extend(re.findall(r"\{([^}]+)\}",v))
    walk(new["components"])
    dang=[r for r in refs if not resolves(r)]
    prim_refs=[r for r in refs if r.split(".")[0] in PRIM]
    print(f"DANGLING={len(dang)} {dang[:5]}")
    print(f"R11_PRIMITIVE_REFS={len(prim_refs)} {sorted(set(prim_refs))[:5]}")
    if dang: globals()['FAIL']=True
if __name__=="__main__":
    cand=sys.argv[1]
    base=sys.argv[2] if len(sys.argv)>2 else DEFAULT_BASE
    FAIL=False; main(cand, base)
    sys.exit(1 if FAIL else 0)
