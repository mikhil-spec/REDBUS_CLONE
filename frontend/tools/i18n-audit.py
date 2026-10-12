"""
i18n audit for the RedBus Angular frontend.

Run from the frontend folder:   python tools/i18n-audit.py

1. Lists every translation key used in templates/components and reports any key
   that is missing in en, hi, te or ta (a missing key shows the raw key on screen).
2. Lists templates that still contain English text, ranked by how much is left.
Requires Node.js (used to evaluate the translation dictionary).
"""
import json, os, re, subprocess, sys, tempfile

SRC = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "src", "app")
SRC = os.path.normpath(SRC)
LANGS = ["en", "hi", "te", "ta"]

def load_dictionary():
    ts = open(os.path.join(SRC, "i18n", "translations.ts"), encoding="utf-8").read()
    ts = re.sub(r"export interface[\s\S]*?\n}\n", "", ts)
    ts = ts.replace("export const TRANSLATION_DICTIONARY", "const TRANSLATION_DICTIONARY")
    ts = ts.replace(": Record<string,AppTranslations>", "")
    ts += "\nconsole.log(JSON.stringify(TRANSLATION_DICTIONARY));"
    with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False, encoding="utf-8") as f:
        f.write(ts)
        path = f.name
    out = subprocess.run(["node", path], capture_output=True, text=True)
    os.unlink(path)
    if out.returncode != 0:
        sys.exit("Could not evaluate translations.ts: " + out.stderr[:500])
    return json.loads(out.stdout)

def has(d, lang, key):
    cur = d.get(lang, {})
    for part in key.split("."):
        if not isinstance(cur, dict) or part not in cur:
            return False
        cur = cur[part]
    return isinstance(cur, str) and cur != ""

def walk(exts):
    for root, _, files in os.walk(SRC):
        for f in files:
            if f.endswith(exts):
                yield os.path.join(root, f)

def key_report(d):
    used = set()
    pat = re.compile(r"['\"]((?:COMMON|COMMUNITY|REVIEWS|LANDING|DASHBOARD|ACCOUNT|PROFILE|TRIPS|PLANNER|NAV|NOTIFICATIONS|VALIDATION)\.[A-Z0-9_]+)['\"]")
    for p in walk((".html", ".ts")):
        if p.endswith(os.path.join("i18n", "translations.ts")):
            continue
        used.update(pat.findall(open(p, encoding="utf-8").read()))
    missing = [(l, k) for k in sorted(used) for l in LANGS if not has(d, l, k)]
    print(f"Translation keys used: {len(used)}")
    print(f"Missing (language, key) pairs: {len(missing)}")
    for lang, key in missing:
        print(f"  MISSING {lang}: {key}")
    return not missing

def english_inventory():
    print("\nTemplates still containing English text (approximate, highest first):")
    rows = []
    for p in walk((".html",)):
        s = open(p, encoding="utf-8").read()
        pipes = len(re.findall(r"\|\s*translate", s))
        body = re.sub(r"<!--.*?-->|<script.*?</script>|<style.*?</style>", "", s, flags=re.S)
        body = re.sub(r"\{\{.*?\}\}", "", body, flags=re.S)
        body = re.sub(r"<[^>]+>", " ", body)
        body = re.sub(r"\s+", " ", body)
        runs = re.findall(r"[A-Za-z][A-Za-z'&-]{2,}(?:\s+[A-Za-z][A-Za-z'&-]{2,}){1,}", body)
        if runs:
            rows.append((len(runs), pipes, os.path.relpath(p, SRC)))
    for n, pipes, rel in sorted(rows, reverse=True):
        print(f"  {n:>4} English runs | {pipes:>3} translate pipes | {rel}")
    print("(Counts are heuristic; a 1-2 run result is often a CSS class or a brand word.)")

if __name__ == "__main__":
    d = load_dictionary()
    ok = key_report(d)
    english_inventory()
    sys.exit(0 if ok else 1)
