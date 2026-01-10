import os, time, sys
import requests

MAX_ID = 1025
OUT_DIR = "pokemon_images"
BASE = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork"

os.makedirs(OUT_DIR, exist_ok=True)

session = requests.Session()
ok = 0
fail = 0

for i in range(1, MAX_ID + 1):
    url = f"{BASE}/{i}.png"
    path = os.path.join(OUT_DIR, f"{i}.png")

    if os.path.exists(path) and os.path.getsize(path) > 0:
        ok += 1
        continue

    try:
        r = session.get(url, timeout=30)
        if r.status_code == 200 and r.content:
            with open(path, "wb") as f:
                f.write(r.content)
            ok += 1
        else:
            fail += 1
            print(f"Failed {i}: HTTP {r.status_code}")
    except Exception as e:
        fail += 1
        print(f"Failed {i}: {e}")

    if i % 50 == 0:
        print(f"Downloaded {ok} / {i} (fail {fail})")

    time.sleep(0.05)

print(f"Done. OK={ok}, FAIL={fail}")
if fail:
    sys.exit(1)
