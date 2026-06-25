import subprocess
import random
import os
from datetime import date, timedelta

# ---- CONFIGURATION ----
START_DATE = date(2025, 2, 12)
END_DATE   = date(2026, 6, 24)
# -----------------------

print(f"Starting from {START_DATE} to {END_DATE}...")  # debug line

current = START_DATE

while current <= END_DATE:
    num_commits = random.randint(1, 9)

    for i in range(num_commits):
        hour   = random.randint(0, 22)
        minute = random.randint(0, 59)
        second = random.randint(0, 59)

        date_str = f"{current.year}-{current.month:02d}-{current.day:02d}T{hour:02d}:{minute:02d}:{second:02d}"

        with open("contributions.txt", "a") as f:
            f.write(f"update {date_str} - commit {i+1}\n")

        full_env = os.environ.copy()
        full_env.update({
            "GIT_AUTHOR_DATE": date_str,
            "GIT_COMMITTER_DATE": date_str,
        })

        r1 = subprocess.run(["git", "add", "contributions.txt"], capture_output=True, text=True)
        r2 = subprocess.run(
            ["git", "commit", "-m", f"update: {date_str} ({i+1})"],
            env=full_env, capture_output=True, text=True
        )

        # Show any errors
        if r2.returncode != 0:
            print(f"❌ Commit failed: {r2.stderr.strip()}")
            break

    print(f"✅ {current} — {num_commits} commits")
    current += timedelta(days=1)

print("\n✅ All done! Now run: git push origin main")