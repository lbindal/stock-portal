# ✅ Check Current Remote
git remote -v
# Lists the current remote URL used for fetching and pushing

# ✅ Remove Incorrect Remote (Optional Cleanup)
git remote remove origin
# Removes the incorrect remote reference

# ✅ Add Correct Remote
git remote add origin https://github.com/lbindal/stock-portal.git
# Adds the correct GitHub repository as the remote origin

# ✅ Verify Remote is Correct
git remote -v
# Confirms the remote is now correctly set to your GitHub repository

# ✅ Push to GitHub
git push -u origin main
# Pushes your code to the `main` branch on GitHub and sets it as the upstream branch for future pushes
