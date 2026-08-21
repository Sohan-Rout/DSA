const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ---------------------------------------------------------------------------
// lastmod, derived from git rather than the clock.
//
// Stamping `new Date()` on every URL told Google all 78 pages changed on every
// deploy. Once that is demonstrably untrue, Google stops trusting lastmod at
// all — so the signal is unavailable when a page genuinely does change.
//
// One `git log` pass builds a file -> last-commit-date map; a route's date is
// the newest date among the files in its own directory.
// ---------------------------------------------------------------------------
const BUILD_TIME = new Date().toISOString();

function buildGitDateMap() {
    const raw = execSync(
        'git log --format=@%aI --name-only --no-renames -- app',
        { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 }
    );

    const dates = new Map();
    let current = null;

    for (const line of raw.split('\n')) {
        if (line.startsWith('@')) {
            current = line.slice(1);
        } else if (line.trim() && current && !dates.has(line)) {
            // git log is newest-first, so the first sighting of a path is its
            // most recent change.
            dates.set(line, current);
        }
    }
    return dates;
}

let GIT_DATES;
try {
    GIT_DATES = buildGitDateMap();
    if (GIT_DATES.size === 0) throw new Error('no git history for app/');
    console.log(`[sitemap] lastmod from git — ${GIT_DATES.size} tracked files`);
} catch (err) {
    GIT_DATES = null;
    console.warn(
        `[sitemap] git history unavailable (${err.message}); ` +
        'falling back to build time. On shallow clones (Vercel) run ' +
        '`next-sitemap` locally and commit public/sitemap-*.xml instead.'
    );
}

function lastModFor(route) {
    if (!GIT_DATES) return BUILD_TIME;

    // "/" is app/page.jsx itself, not everything under app/.
    const dir = route === '/' ? 'app' : path.posix.join('app', route);

    let newest = null;
    for (const [file, date] of GIT_DATES) {
        const inDir = path.posix.dirname(file) === dir;
        if (!inDir) continue;
        if (!newest || date > newest) newest = date;
    }
    return newest || BUILD_TIME;
}

// Scan app/ folder recursively, include only folders with page.jsx
function getAllPages(dir = 'app', prefix = '') {
    const routes = [];
    const items = fs.readdirSync(dir);

    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            if (item === 'api' || item.startsWith('_')) continue; // skip API and special folders

            const pageFile = fs.readdirSync(fullPath).find(f => f === 'page.jsx' || f === 'page.tsx');
            if (pageFile) {
                routes.push(`${prefix}/${item}`);
            }

            // Recurse into subfolders
            routes.push(...getAllPages(fullPath, `${prefix}/${item}`));
        }
    }

    return routes;
}

// Routes that are noindex in their metadata. Listed here too so they never
// reach the sitemap — submitting a URL you also tell Google not to index is a
// contradictory signal, and it wastes crawl budget.
const EXCLUDED = ['/login', '/dashboard'];

/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: 'https://www.dsavisualizer.in',
    generateRobotsTxt: true,
    sitemapSize: 5000,
    exclude: EXCLUDED,
    transform: async (config, route) => {
        // `exclude` does not filter additionalPaths, so drop them here as well.
        if (EXCLUDED.includes(route)) return null;
        return {
            loc: route,
            lastmod: lastModFor(route),
        };
    },
    additionalPaths: async (config) => {
        const allRoutes = getAllPages(); // recursively get all module pages
        return allRoutes
            .filter(route => !EXCLUDED.includes(route))
            .map(route => ({
                loc: route,
                lastmod: lastModFor(route),
            }));
    },
};

module.exports = config;