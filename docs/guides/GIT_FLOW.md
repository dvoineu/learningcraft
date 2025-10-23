# Git Flow Strategy

## 🌳 Branch Structure

### Main Branches

#### `main`
- **Purpose**: Production-ready code
- **Protected**: Yes
- **Deployment**: Automatically deploys to production (Vercel)
- **Merges from**: `release/*` branches only
- **Tags**: All releases are tagged here (v1.0.0, v1.1.0, etc.)

#### `develop`
- **Purpose**: Integration branch for features
- **Protected**: Yes
- **Deployment**: Automatically deploys to staging/preview
- **Merges from**: `feature/*`, `bugfix/*` branches
- **Merges to**: `release/*` branches

### Supporting Branches

#### `feature/*`
- **Purpose**: New features development
- **Naming**: `feature/feature-name` (e.g., `feature/user-dashboard`)
- **Branches from**: `develop`
- **Merges to**: `develop`
- **Lifetime**: Temporary (deleted after merge)

#### `bugfix/*`
- **Purpose**: Bug fixes for develop
- **Naming**: `bugfix/bug-description` (e.g., `bugfix/fix-pdf-parsing`)
- **Branches from**: `develop`
- **Merges to**: `develop`
- **Lifetime**: Temporary (deleted after merge)

#### `hotfix/*`
- **Purpose**: Critical production fixes
- **Naming**: `hotfix/issue-description` (e.g., `hotfix/fix-auth-error`)
- **Branches from**: `main`
- **Merges to**: `main` AND `develop`
- **Lifetime**: Temporary (deleted after merge)
- **Tags**: Creates a new patch version (e.g., v1.0.1)

#### `release/*`
- **Purpose**: Prepare for production release
- **Naming**: `release/v1.1.0`
- **Branches from**: `develop`
- **Merges to**: `main` AND `develop`
- **Lifetime**: Temporary (deleted after merge)
- **Tags**: Creates a new version tag

## 📋 Workflow Examples

### 1. Developing a New Feature

```bash
# Start from develop
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/user-dashboard

# Work on feature...
git add .
git commit -m "feat: add user dashboard"

# Push to remote
git push -u origin feature/user-dashboard

# Create Pull Request to develop
# After review and approval, merge to develop
# Delete feature branch
```

### 2. Creating a Release

```bash
# Start from develop
git checkout develop
git pull origin develop

# Create release branch
git checkout -b release/v1.1.0

# Update version numbers, changelog, etc.
git add .
git commit -m "chore: prepare release v1.1.0"

# Push release branch
git push -u origin release/v1.1.0

# Merge to main
git checkout main
git merge --no-ff release/v1.1.0

# Tag the release
git tag -a v1.1.0 -m "Release v1.1.0"
git push origin main
git push origin v1.1.0

# Merge back to develop
git checkout develop
git merge --no-ff release/v1.1.0
git push origin develop

# Delete release branch
git branch -d release/v1.1.0
git push origin --delete release/v1.1.0
```

### 3. Hotfix for Production

```bash
# Start from main
git checkout main
git pull origin main

# Create hotfix branch
git checkout -b hotfix/fix-critical-bug

# Fix the bug
git add .
git commit -m "fix: resolve critical authentication bug"

# Merge to main
git checkout main
git merge --no-ff hotfix/fix-critical-bug

# Tag the hotfix
git tag -a v1.0.1 -m "Hotfix v1.0.1"
git push origin main
git push origin v1.0.1

# Merge to develop
git checkout develop
git merge --no-ff hotfix/fix-critical-bug
git push origin develop

# Delete hotfix branch
git branch -d hotfix/fix-critical-bug
git push origin --delete hotfix/fix-critical-bug
```

## 🏷️ Version Tagging

### Semantic Versioning (SemVer)

Format: `vMAJOR.MINOR.PATCH`

- **MAJOR** (v2.0.0): Breaking changes
- **MINOR** (v1.1.0): New features (backward compatible)
- **PATCH** (v1.0.1): Bug fixes (backward compatible)

### Current Tags

- **v1.0.0** - Initial MVP Release
  - PDF upload and quiz configuration
  - AI quiz generation
  - Interactive quiz taking
  - Results with detailed breakdown
  - Bilingual support (ru/be)

### Upcoming Releases

- **v1.1.0** - User Dashboard (planned)
  - Quiz history
  - Performance analytics
  - Progress tracking

- **v1.2.0** - Social Features (planned)
  - Quiz sharing
  - Leaderboards
  - Study groups

- **v2.0.0** - Major Overhaul (planned)
  - Complete redesign
  - Mobile app
  - Advanced analytics

## 📝 Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

### Types:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks
- `ci:` - CI/CD changes

### Examples:
```bash
feat: add user dashboard with quiz history
fix: resolve PDF parsing error for large files
docs: update README with deployment instructions
refactor: simplify quiz generation logic
perf: optimize database queries for results page
test: add unit tests for quiz validation
chore: update dependencies to latest versions
ci: add GitHub Actions workflow for testing
```

## 🔒 Branch Protection Rules

### `main` branch:
- ✅ Require pull request reviews (1 approval)
- ✅ Require status checks to pass
- ✅ Require branches to be up to date
- ✅ Include administrators
- ❌ Allow force pushes
- ❌ Allow deletions

### `develop` branch:
- ✅ Require pull request reviews (1 approval)
- ✅ Require status checks to pass
- ❌ Allow force pushes
- ❌ Allow deletions

## 🚀 Deployment Strategy

### Environments:

1. **Production** (`main` branch)
   - URL: https://learningcraft.vercel.app
   - Auto-deploy on push to `main`
   - Requires manual approval for releases

2. **Staging** (`develop` branch)
   - URL: https://learningcraft-staging.vercel.app
   - Auto-deploy on push to `develop`
   - For testing before release

3. **Preview** (feature branches)
   - URL: Auto-generated by Vercel
   - Deploy on PR creation
   - For feature review

## 📊 Release Checklist

Before creating a release:

- [ ] All features merged to `develop`
- [ ] All tests passing
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] Version numbers updated in package.json
- [ ] Database migrations tested
- [ ] Environment variables documented
- [ ] Performance tested
- [ ] Security audit passed
- [ ] Accessibility checked

## 🔗 Useful Commands

```bash
# View all branches
git branch -a

# View all tags
git tag -l

# View commit history
git log --oneline --graph --all

# Delete local branch
git branch -d branch-name

# Delete remote branch
git push origin --delete branch-name

# Sync with remote
git fetch --all --prune

# View current branch
git branch --show-current
```

## 📚 Resources

- [Git Flow Cheatsheet](https://danielkummer.github.io/git-flow-cheatsheet/)
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
